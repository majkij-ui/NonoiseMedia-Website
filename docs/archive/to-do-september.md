# Nonoise Media — working task list

Started from the 2026-07-07 code audit; rolled forward 2026-09-19.
All code work is handled by Claude in the Claude Code chat (single agent — no
parallel agents on this repo).

---

## Current state (verified live 2026-09-19)

| Area | Status |
|---|---|
| URLs | PL unprefixed (`/`, `/about`), EN under `/en`; `/pl/*` → 308 → unprefixed; apex → 308 → `www` |
| Canonical domain | `https://www.nonoise.media` everywhere (metadata, sitemap, robots, JSON-LD) |
| hreflang | `pl` / `en` / `x-default` on all indexable routes |
| Structured data | Organization+LocalBusiness (`sameAs` IG/YT), Service + FAQPage + BreadcrumbList on 9 service pages, BreadcrumbList + 6 VideoObject on /work |
| Social cards | `og:image` 1200×630 JPEG on R2 + `summary_large_image` |
| Assets CDN | 1-year edge + browser cache on `assets.nonoise.media` |
| Crawlers | robots.txt app-controlled; AI crawlers allowed |
| Lead events | `contact_form_success`, `questionnaire_success` (fire only on API 200), `phone_click` |
| GTM | Container `GTM-PQ7D5LSC` republished — custom-event triggers live |
| Build health | `tsc` clean, 1 known ESLint warning, 40/40 pages |

---

## ✅ Shipped

- **Deploy 1** (PR #2, 08-18) — audit fixes: per-locale `<html lang>` (root layout merged
  into `app/[locale]/layout.tsx`), `/about-old` noindex, robots cleanup, API input
  validation + length caps, type-checking re-enabled, dead code removed.
- **Deploy 2** (PR #3, 08-18) — `localePrefix: 'as-needed'` + `localeDetection: false`,
  308 redirects for legacy `/pl/*`, canonical www, hreflang, the three lead events.
- **Deploy 3** (PR #4, 08-18) — structured data (`lib/structured-data.ts`,
  `components/json-ld.tsx`).
- **Deploy 4** (PR #5, 09-19) — social share card + 5 of 6 `VideoObject` publication
  dates; restored `og:site_name`/`og:type` on pages defining their own `openGraph`
  (Next replaces rather than merges that object).
- **Dashboard** — Vercel apex→www 308; Cloudflare 1-year asset cache rule; Cloudflare
  AI-bot blocking off + managed robots.txt injection disabled.
- **GTM (09-19)** — conversion tags moved off click triggers onto the
  `contact_form_success` / `questionnaire_success` custom events; the old
  "any submit button" and "questionnaire opened" triggers removed. Verified: both event
  names present in the published container.

---

## 🔒 Settled decisions — do not re-propose

- **Hero entrance fade stays** (07-07). The homepage hero is the LCP element and its
  opacity fade delays LCP, especially on mobile. A fix was built and reverted — Michał
  prefers the look. Mobile LCP stays high by design.
- **Reel will not be compressed** (08-18). 53 MB (`content-length: 55713433`). Image
  quality is the product. Mitigated by the 1-year cache rule (repeat visitors download
  once). Address weight through delivery only, never re-encoding.
- **`preload="none"` rejected** (08-18). Tried; Michał disliked the resulting load.
  Reel stays `preload="auto"`.
- **Media versioning is mandatory.** With a 1-year browser TTL, replacing a file at the
  same URL strands returning visitors on the old copy for up to a year (Cloudflare purge
  does not clear browser caches). Always upload changed media under a **new filename**.
- **Verify caching with GET, not HEAD.** `curl -I` always reports `DYNAMIC` and hides
  `cache-control`. Use `curl -s -o /dev/null -D - <url>`.

---

## ⏳ Open — Michał

- [ ] **Google Ads final URLs**: `/pl/lp/kampania` → `https://www.nonoise.media/lp/kampania`.
  Campaigns → Ads (clear the status filter to see paused ads) → pencil → Final URL.
  Also check Assets (sitelinks) and campaign URL options. Google Ads Editor is faster in
  bulk. Editing a Final URL replaces the ad and resets its stats — cheapest while paused.
- [ ] **Google Ads conversions**: rename to "Lead: contact form" / "Lead: questionnaire";
  keep both + "Click on Phone" Primary; set "Email Link Click" to **Secondary** (people
  click the address just to copy it).
- [ ] **Google Ads**: counting = "Every"; check attribution window; consider Enhanced
  Conversions (needs a GTM user-data variable — ask Claude).
- [ ] **Search Console**: resubmit sitemap.
- [ ] **CIONET publication date** — described as "ongoing partnership 2021–present",
  which is a relationship, not a release date. `uploadDate` omitted for project id 4
  rather than invented. Provide a month if the film has one.
- [ ] Delete the labelled TEST leads in contact@nonoise.media.

---

## ⚖️ DECISION PENDING — cookie consent banner + Consent Mode v2

**The gap is real:** no banner, no Consent Mode. GTM loads GA4 (`G-JHHX635GZP`) and
Google Ads (`AW-18054795269`) for every visitor without consent. Under GDPR + Polish
ePrivacy these are not strictly-necessary cookies. Google's EU User Consent Policy also
expects Consent Mode v2 signals for EEA traffic.

**The cost is also real:** a banner strictly *reduces* measurement. Visitors who reject
get no ad cookies, so their leads go unattributed — the Ads-vs-inbox gap widens rather
than closes. Consent Mode modeling recovers some, but needs traffic volume this site may
not reach. There is **no measurement upside** to adding a banner.

Michał is weighing enforcement risk (low for a micro-site with little traffic) against
data loss. Decision recorded here once made.

**Claude's recommendation — split the two things:**
- **Privacy policy: do it regardless.** Separate obligation (GDPR Art. 13 information
  duty), triggered by collecting names/emails/messages through the forms — nothing to do
  with cookies. Costs **zero** measurement data. Currently there is no privacy policy page
  at all, which is the more basic gap and the one a corporate client's vendor check would
  notice. ⚠️ Data controller must be the correct legal entity (company + NIP if billing
  now runs through the company), not a personal name. Have a qualified person review it.
- **Banner: defensible to defer**, as a documented business-risk decision rather than an
  oversight. Revisit if traffic grows, if a corporate client asks, or on any complaint.

---

## ⏳ Open — code (Claude)

**Hardening**
- [ ] **Rate limiting / honeypot** on `/api/send-contact` + `/api/send-quote` — still
  unlimited anonymous POSTs (Resend quota burn + inbox spam). Highest-value open item,
  more so once ads drive traffic.

**SEO / i18n**
- [ ] Per-route social images (per-service, per-project) — default card is done.
- [ ] Localize `/en/work`: hardcoded Polish in `app/[locale]/work/page.tsx`, Polish-only
  metadata in `work/layout.tsx`, Polish copy in `lib/projects.ts` and
  `components/service-landing/service-landing-client.tsx`. Or decide to drop EN.

**Performance** (hero/reel decisions above cap what's achievable)
- [ ] Preconnect hints for `assets.nonoise.media` + `www.googletagmanager.com` (~350 ms).
- [ ] Throttle the home reel RAF loop (re-renders 60×/s while the reel plays).

**Quality**
- [ ] Replace raw `<img>` in `components/lp/lp-services-grid.tsx` (last ESLint warning).
- [ ] Nav logo `alt="Nonoise Media"` is redundant beside visible text — use `alt=""`.
- [ ] Move planning `.md` files (about_plan, contact_plan, google-ads, guidelines-*) into
  `docs/`.

---

## Pre-existing backlog (from CLAUDE.md)

- Validate testimonial copy (language, punctuation, legal approval).
- Move testimonials data into a dedicated data module.
- Smoke-test both email APIs after any env/domain change.
- Evaluate sticky CTA on mobile; tune animation timing.
- Finalize `/work` media sourcing before release.
