# Google Ads, Tag Manager, and site performance

This document describes how Nonoise Media’s Next.js site is wired for **paid campaigns** (Meta / Google Ads), **Google Tag Manager (GTM)**, **conversions**, and related **performance / SEO** choices. Use it when debugging tags, CSP errors, or PageSpeed.

---

## Google Tag Manager (GTM)

### How it loads

- **Package:** `@next/third-parties` — `GoogleTagManager` from `@next/third-parties/google`.
- **Root layout:** [`app/layout.tsx`](app/layout.tsx) renders [`components/deferred-third-parties.tsx`](components/deferred-third-parties.tsx), which **lazy-loads** GTM (and Vercel Analytics / Speed Insights) with `next/dynamic` and `ssr: false` so those scripts are **not** on the critical path for first paint.
- **Container ID:** `NEXT_PUBLIC_GTM_ID` (e.g. `GTM-XXXXXXX`). Set it in Vercel **Environment Variables** for Production (and Preview if you want tags there). If unset, GTM does not render.

### dataLayer and custom events

- Helper: [`lib/gtm.ts`](lib/gtm.ts) — `sendGTMEvent(eventName, params?)` pushes `{ event, ...params }` to `window.dataLayer` and initializes `dataLayer` if needed (safe before GTM finishes loading).
- **Kampania landing page** [`app/[locale]/lp/kampania/page.tsx`](app/[locale]/lp/kampania/page.tsx) and [`components/lp/lp-lead-strip.tsx`](components/lp/lp-lead-strip.tsx) fire events such as `lp_portfolio_click`, `lp_quote_click`, `lp_contact_click`. Configure **triggers and tags** for these event names inside the GTM UI (and map them to Google Ads conversion actions as needed).

### Google Analytics vs Vercel Analytics

- **Vercel Web Analytics** and **Speed Insights** are separate from GA; they load in the same deferred client bundle as GTM.
- This project does **not** embed the legacy `gtag.js` snippet by hand — **GA4 (and Ads remarketing/conversions)** are normally configured **inside GTM** (tags + triggers), not as a second global script, unless you add them explicitly.

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

The policy includes (among others):

- **`script-src`:** `'self'`, `'unsafe-inline'`, `'unsafe-eval'`, `https://www.googletagmanager.com`, `tagmanager.google.com`, Google Analytics hosts, `va.vercel-scripts.com`, `vercel.live`, etc.  
  - **`unsafe-eval`** was added because **GTM and some tags** rely on dynamic script behavior that browsers classify under eval-like rules in strict CSP environments.
- **`connect-src`:** same-origin, `assets.nonoise.media`, Google Analytics / GTM-related hosts, Vercel analytics hosts — so **beacons and tag requests** can complete.
- **`frame-src`:** GTM preview / certain embeds use iframes from Google hosts.
- **`frame-ancestors`:** `'self'` and `https://vercel.live` — explicitly **not** `'none'`, so the site can be framed same-origin and in **Vercel preview / toolbar** contexts. To allow another tool’s iframe (e.g. an internal dashboard), add that **parent origin** here. `object-src 'none'` is unrelated (it blocks `<object>` plugins, not top-level framing).

If you add **new** tag vendors (e.g. another pixel), you may need to extend `connect-src` / `script-src` / `img-src` and redeploy.

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
| **Fonts** | `next/font/google` in [`app/layout.tsx`](app/layout.tsx) with `display: 'swap'`, CSS variables, **preload only** on primary Geist sans. |

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
| GTM + deferred analytics | [`components/deferred-third-parties.tsx`](components/deferred-third-parties.tsx), [`app/layout.tsx`](app/layout.tsx) |
| dataLayer helper | [`lib/gtm.ts`](lib/gtm.ts) |
| LP events | [`app/[locale]/lp/kampania/page.tsx`](app/[locale]/lp/kampania/page.tsx), [`components/lp/lp-lead-strip.tsx`](components/lp/lp-lead-strip.tsx) |
| Kampania SEO / robots | [`app/[locale]/lp/kampania/layout.tsx`](app/[locale]/lp/kampania/layout.tsx) |

This file is documentation only; it is not imported by the application.
