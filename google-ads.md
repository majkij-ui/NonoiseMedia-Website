# Google Ads, Tag Manager, and site performance

This document describes how Nonoise Media’s Next.js site is wired for **paid campaigns** (Meta / Google Ads), **Google Tag Manager (GTM)**, **conversions**, and related **performance / SEO** choices. Use it when debugging tags, CSP errors, or PageSpeed.

---

## Google Tag Manager (GTM)

### How it loads

- **Package:** `@next/third-parties` — `GoogleTagManager` from `@next/third-parties/google`.
- **Root layout:** `app/[locale]/layout.tsx` renders [`components/deferred-third-parties.tsx`](components/deferred-third-parties.tsx), which **lazy-loads** GTM (and Vercel Analytics / Speed Insights) with `next/dynamic` and `ssr: false` so those scripts are **not** on the critical path for first paint.
- **Container ID:** `NEXT_PUBLIC_GTM_ID` (e.g. `GTM-XXXXXXX`). Set it in Vercel **Environment Variables** for Production (and Preview if you want tags there). If unset, GTM does not render.

### dataLayer and custom events

- Helper: [`lib/gtm.ts`](lib/gtm.ts) — `sendGTMEvent(eventName, params?)` pushes `{ event, ...params }` to `window.dataLayer` and initializes `dataLayer` if needed (safe before GTM finishes loading).
- **Kampania landing page** [`app/[locale]/lp/kampania/page.tsx`](app/[locale]/lp/kampania/page.tsx) and [`components/lp/lp-lead-strip.tsx`](components/lp/lp-lead-strip.tsx) fire events such as `lp_portfolio_click`, `lp_quote_click`, `lp_contact_click`. Configure **triggers and tags** for these event names inside the GTM UI (and map them to Google Ads conversion actions as needed).

### Google Analytics vs Vercel Analytics

- **Vercel Web Analytics** and **Speed Insights** are separate from GA; they load in the same deferred client bundle as GTM.
- This project does **not** embed the legacy `gtag.js` snippet by hand — **GA4 (and Ads remarketing/conversions)** are normally configured **inside GTM** (tags + triggers), not as a second global script, unless you add them explicitly.

---

## Offline lead attribution (gclid → mail → Google Ads)

Why: Google treats the classic gclid file import as legacy and points to
**enhanced conversions for leads** with import through **Data Manager**. The
site's job is therefore to (a) remember which ad click a visitor arrived on,
and (b) put that, plus a stable lead id and a normalized contact, into the
lead email — so leads can later be graded by hand and only the real ones sent
back to Google. Full rollout plan, including the GTM / Google Ads steps:
[`google-ads-offline-plan.md`](google-ads-offline-plan.md).

### The flow

1. Visitor lands on any route with `gclid` / `gbraid` / `wbraid` / `utm_*`.
   `AttributionCapture` (mounted in `app/[locale]/layout.tsx`) stores those
   plus `clickedAt` and the landing path.
2. Visitor submits the contact form or the questionnaire. The client mints a
   `leadId` and posts it with the stored attribution and the current consent
   state.
3. The API route appends a **„Źródło"** block to the Resend email and prefixes
   the subject with `[Ads]` when a click id is present.
4. On HTTP 200 the client pushes the conversion event with `transaction_id`
   (the same `leadId`) and `user_data` for enhanced conversions.
5. You grade the lead in the lead app and export the real ones to Google Ads
   via Data Manager, using `leadId` as Order ID so nothing is counted twice.

### Modules

| File | Role |
|---|---|
| `lib/attribution.ts` | Capture / read attribution, `newLeadId()`, `normalizeEmail()`, `normalizePhoneE164()`. |
| `lib/consent.ts` | `getAdStorageConsent()` → `granted` / `denied` / `unknown`. |
| `lib/lead-source.ts` | Server-side sanitizer, „Źródło" renderer, subject builder. |
| `lib/html.ts` | Shared `escapeHtml` for email HTML. |
| `components/attribution-capture.tsx` | Mounts the capture in the locale layout. |

Two details that are easy to undo by accident:

- Attribution is read from **`window.location.search`**, not
  `useSearchParams()`. The hook would force a Suspense boundary or dynamic
  rendering on these prerendered routes — `pnpm build` should keep showing
  every page as `●` (SSG).
- Storage is `localStorage` with a **90-day** expiry, unless `ad_storage`
  is explicitly `denied`, in which case it is `sessionStorage` for the session
  only. Key: `nnm_attr_v1`. Every read and write is wrapped in `try/catch`
  (private mode, blocked storage).

### dataLayer contract

```js
dataLayer.push({
  event: "contact_form_success",     // or "questionnaire_success"
  transaction_id: "K7Q2M9XA",        // leadId
  user_data: { email: "anna@firma.pl" },         // contact form
  // user_data: { phone_number: "+48600100200" }, // questionnaire, phone
})
```

Both events still fire **only after the API confirms the send** (HTTP 200), so
GTM counts delivered leads, not submit attempts. `phone_click` is unchanged
and carries no lead id.

**Required GTM configuration** (manual, in the container):
1. In the questionnaire and contact conversion tags, enable **user-provided
   data** from the dataLayer variable `user_data`. Google hashes it; the site
   sends the plain value.
2. Set **Transaction ID** to the dataLayer variable `transaction_id`.
3. Publish the container.

### „Źródło" field contract

What the lead app reads out of each email and what each field is for:

| Field | Purpose |
|---|---|
| Lead ID | Order ID in the export, duplicate guard |
| Z reklamy | export filter (`tak` whenever a click id is present) |
| gclid / gbraid / wbraid | match to the ad click |
| E-mail / Telefon | normalized (lowercase / E.164 `+48…`) — matching without a click id |
| Kliknięcie | click time |
| Wysłano | Conversion Time, `Europe/Warsaw`, with seconds |
| utm_source / medium / campaign / term | reporting |
| Strona wejścia | which page pulls ad leads |
| Zgoda ad_storage | consent columns in the export |

Rows with no value are omitted. Everything is clamped and escaped in
`lib/lead-source.ts` before it reaches the email — the whole block arrives in
the request body, so it is untrusted input.

### Consent, before and after the cookie banner

There is no CMP yet, so `getAdStorageConsent()` returns **`unknown`**: tags
load unblocked and Google receives no consent signals. `unknown` is written to
the email as-is — it must not be exported as `Granted`, because nobody granted
anything. Rows carrying a gclid match on the click anyway; the consent columns
matter for rows matched on a hashed email or phone.

Once a CMP is wired into GTM, the same function starts returning
`granted` / `denied` with no changes anywhere else — but **its domains have to
be added to the CSP** in `next.config.mjs` (`script-src`, `connect-src`,
`frame-src`), or the banner is silently blocked. See the CSP section below.

### Not in this repo

Grading leads, the CSV/Sheets export, SHA-256 hashing of contacts, and the
upload through Data Manager all live in the separate lead app. Phone calls and
emails sent straight from the address on the site carry no gclid and no lead
id — those get marked as ad leads by hand and matched on contact details only.

---

## Content Security Policy (CSP)

### Where it lives

- **File:** [`next.config.mjs`](next.config.mjs) — a single `Content-Security-Policy` header is sent for `/:path*` via `headers()`.

There was **no** CSP in the repo initially; it was added so browser security rules and **third-party scripts** (GTM, GA, Google Ads pixels) align with what the page actually loads.

### Why Google / GTM can “break” without CSP (or with a wrong CSP)

If the policy is too strict, the browser **blocks** scripts, XHR/fetch, or frames. Symptoms:

- **DevTools → Console:** `Refused to load the script … because it violates the following Content Security Policy directive` (often `script-src` or `connect-src`).
- **DevTools → Network:** requests to `googletagmanager.com`, `google-analytics.com`, or `googleadservices.com` may show as **blocked** or **(failed)**.
- **Tag Assistant / Google Tag Manager preview:** tags show as not firing or **permission denied**-style failures when the underlying request is CSP-blocked (this is a **client-side** block, not necessarily an HTTP 4xx/5xx from Google’s servers).

So the “error” from Google’s tools is often a **CSP violation** (browser security), not a bad response from Google’s HTTP API. Fix by **adjusting CSP** (or removing a **duplicate** stricter policy — see below).

### What we allow (high level)

[`next.config.mjs`](next.config.mjs) centralizes a shared **`GOOGLE_HTTPS`** host list for **`script-src`** and **`worker-src`** so tag workers stay aligned with script loads.

- **`script-src`:** `'self'`, `'unsafe-inline'`, `'unsafe-eval'`, shared Google hosts, Vercel analytics hosts, and **`blob:`** (some GTM/tag flows inject scripts via blob URLs — without it, DevTools often reports **`script-src` blocked** even when HTTPS hosts are listed).
- **`worker-src`:** `'self'`, **`blob:`**, same Google + Vercel hosts as scripts. Dedicated workers do **not** always fall back cleanly for **`blob:`** workers; omitting this is a common source of “blocked” after fixing `script-src` alone ([CSP directive fallbacks](https://web.dev/articles/csp) — `worker-src` is separate from `script-src` in modern browsers).
- **`style-src`:** `'unsafe-inline'` plus **Google / Fonts** (`fonts.googleapis.com`, `*.gstatic.com`, etc.) for widgets that inject stylesheets (e.g. reCAPTCHA).
- **`font-src`:** `fonts.gstatic.com`, `*.gstatic.com` in addition to `'self'` / `data:`.
- **`connect-src`:** same-origin, `assets.nonoise.media`, Google Analytics / GTM / **Ads / DoubleClick / googlesyndication**-style hosts (including `*.doubleclick.net`), Vercel — so **fetch/XHR/beacons** complete.
- **`frame-src`:** GTM, DoubleClick, `*.google.com`, `gstatic` — preview / conversion / reCAPTCHA iframes.
- **`frame-ancestors`:** `'self'` and `https://vercel.live` — explicitly **not** `'none'`, so the site can be framed same-origin and in **Vercel preview / toolbar** contexts. `object-src 'none'` is unrelated (it blocks `<object>` plugins, not top-level framing).

If you add **new** tag vendors (e.g. Meta, LinkedIn), add their **exact script/connect/frame/img** origins — Google-only lists will not cover them.

### If something is still blocked

1. Read the **full** console line: it names the **blocked URL** (scheme + host + path). Add **that host** (or `scheme:`) to the matching directive — not every failure is `script-src` (e.g. **`connect-src`** for XHR, **`worker-src`** for workers).
2. **`Content-Security-Policy-Report-Only`:** Per [web.dev CSP guidance](https://web.dev/articles/csp), you can send a **report-only** policy (and optionally `report-to` / `report-uri`) to log violations **without** blocking, tune the allowlist, then merge into the enforced header.
3. **Regional Google domains** (e.g. `google.pl`) are **not** covered by `*.google.com`; add `https:` in `connect-src` only if you truly need every HTTPS endpoint (very broad), or add specific hosts as violations appear.
4. **Duplicate CSP** (Vercel dashboard + `next.config`) still applies — the stricter policy wins (see below).

### Duplicate CSP (Vercel / hosting)

If CSP is set **both** in `next.config.mjs` **and** in the Vercel project (**Security → Headers**) or another edge layer, browsers apply **both** — the stricter rule wins and tags can still fail. Keep a **single source of truth** or merge policies carefully.

---

## SEO and indexing (Kampania LP)

- **File:** [`app/[locale]/lp/kampania/layout.tsx`](app/[locale]/lp/kampania/layout.tsx)
- **`robots` metadata** (Next.js Metadata API): **`noindex, nofollow`** on all environments (production, preview, local). This page is for **paid campaigns** only; we intentionally keep it **out of organic search** so PageSpeed / Lighthouse “SEO” scores for this URL are expected to be poor (e.g. no indexing signals)—that is by design.
- **Google Ads:** Final URLs for ads **do not** require `index`; `noindex` applies to **organic** crawlers. The destination must still load with a normal HTTP 200 for users and for Ads policy checks.

---

## Performance work relevant to ads landing quality

These reduce main-thread and network contention; they help **Core Web Vitals** and **Landing page experience**, which feed into Google Ads quality signals indirectly.

| Area | What we did |
|------|----------------|
| **Third-party scripts** | GTM, Vercel Analytics, Speed Insights loaded via [`DeferredThirdParties`](components/deferred-third-parties.tsx) (`dynamic`, `ssr: false`). |
| **Homepage** | Footer and “reel playing” UI split into dynamic imports where appropriate ([`HomeClient`](app/[locale]/HomeClient.tsx)). |
| **Navigation** | Full-screen menu overlay loaded on demand ([`navigation-menu-overlay.tsx`](components/navigation-menu-overlay.tsx)). |
| **Images** | `next/image` + `images.formats` (AVIF/WebP) in [`next.config.mjs`](next.config.mjs); remote asset host `assets.nonoise.media`. |
| **Fonts** | `next/font/google` in `app/[locale]/layout.tsx` with `display: 'swap'`, CSS variables, **preload only** on primary Geist sans. |

### CSS bundle slimming (if PageSpeed or UI regress — check this)

A dedicated pass reduced **first-party CSS** weight (fewer render-blocking bytes) by removing unused global CSS and dead dependencies. **GTM, deferred analytics, and CSP were not removed**—if tags break, debug CSP/GTM first (sections above), not this list.

| Change | What to suspect if something breaks |
|--------|-------------------------------------|
| Removed **`app/tw-animate.css`** import from [`app/globals.css`](app/globals.css) | Missing **enter/exit** animations only if you reintroduce **shadcn/Radix-style** `animate-in`, `fade-in-*`, `slide-in-from-*` classes. The current marketing pages do not use those utilities. |
| Dropped **`--chart-*` / `--sidebar-*`** tokens | Styling that referenced **`chart-*`** or **`sidebar-*`** Tailwind/theme tokens (e.g. a future chart or app shell). The shipped site did not use them. |
| Deleted **`components/ui/`** (entire shadcn scaffold) | Any future import from `@/components/ui/...` will fail until you run **shadcn** again and restore components. **`PhoneNumber`** is now [`components/phone-number.tsx`](components/phone-number.tsx). |
| Removed Radix / **`recharts`** / etc. from `package.json` | Build errors if new code imports those packages without adding them back. |

**Revert strategy:** Use git history for the commit that introduced the slimming; restoring `components/ui` and previous `globals.css` + `package.json` brings back the old CSS/JS surface (at the cost of larger bundles and PageSpeed warnings).

---

## Checklist when something fails

1. **Confirm `NEXT_PUBLIC_GTM_ID`** in the environment that matches the URL you’re testing.
2. **Open DevTools → Console** and filter for **CSP** or **Refused**.
3. **Compare** `Content-Security-Policy` response headers — only one policy, and directives include the host your tag needs.
4. **GTM Preview mode** — verify container loads, then triggers for custom events from [`lib/gtm.ts`](lib/gtm.ts).
5. **Kampania robots** — expect **`noindex, nofollow`** on the LP; ignore organic SEO scores for that URL in PageSpeed / PageSpeed Insights.

---

## Related files (quick reference)

| Topic | File |
|--------|------|
| CSP header | [`next.config.mjs`](next.config.mjs) |
| GTM + deferred analytics | [`components/deferred-third-parties.tsx`](components/deferred-third-parties.tsx), `app/[locale]/layout.tsx` |
| dataLayer helper | [`lib/gtm.ts`](lib/gtm.ts) |
| gclid / utm capture | [`lib/attribution.ts`](lib/attribution.ts), [`components/attribution-capture.tsx`](components/attribution-capture.tsx) |
| Consent signal | [`lib/consent.ts`](lib/consent.ts) |
| „Źródło" block in lead emails | [`lib/lead-source.ts`](lib/lead-source.ts), [`lib/html.ts`](lib/html.ts) |
| Lead APIs | [`app/api/send-contact/route.ts`](app/api/send-contact/route.ts), [`app/api/send-quote/route.ts`](app/api/send-quote/route.ts) |
| Offline lead rollout plan | [`google-ads-offline-plan.md`](google-ads-offline-plan.md) |
| LP events | [`app/[locale]/lp/kampania/page.tsx`](app/[locale]/lp/kampania/page.tsx), [`components/lp/lp-lead-strip.tsx`](components/lp/lp-lead-strip.tsx) |
| Kampania SEO / robots | [`app/[locale]/lp/kampania/layout.tsx`](app/[locale]/lp/kampania/layout.tsx) |

This file is documentation only; it is not imported by the application.
