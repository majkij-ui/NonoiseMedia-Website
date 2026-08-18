# To-Do — July 2026

Working list from the code audit (2026-07-07) and PageSpeed/Lighthouse analysis.
Live scores at time of audit: Desktop 81 / Mobile 62 performance; mobile LCP 9.8s.

---

## ⏸ Deferred — do AFTER paid campaign stops

- [ ] **Switch `localePrefix` to `'as-needed'`** in `i18n/routing.ts` so Polish serves at
  `/`, `/about`, `/work` (no `/pl` prefix) and the `/` → `/pl` redirect disappears
  (~150–450 ms saved on entry).
  **Why deferred:** Google Ads currently points at `/pl/...` URLs — changing now would
  put a redirect on every paid click, the exact thing we're trying to remove. No organic
  traffic yet, so migration cost is near zero once ads stop.
  **When doing it:** update sitemap paths, hreflang alternates, and re-point ad final URLs
  to the new prefix-less URLs.

---

## ✅ Done locally — NEEDS DEPLOY

Everything below is committed-ready in the working tree but not yet on production:

- Audit fixes: `/about-old` noindexed, robots.txt `/lp/` disallow removed, `lang`
  attribute server-rendered per locale (root layout merged into `app/[locale]/layout.tsx`),
  API input validation/length caps, type-checking re-enabled (`ignoreBuildErrors` removed),
  dead `lib/media.ts` and `drafts/` deleted, sitemap `lastModified` dropped.

- [ ] **Deploy to production** (feature branch → PR → main per repo convention)
- [ ] Re-run PageSpeed after deploy

> **Decision (2026-07-07): hero LCP fix REVERTED.** Making the hero visible at first
> paint (no opacity fade) was implemented, but Michał preferred the original fade-in
> look and accepts the LCP cost on slow connections. Do not re-propose removing the
> hero entrance fade; mobile LCP will stay high by design. Remaining LCP levers are
> the reel loading strategy, preconnects, and redirect fixes below.

---

## 🖥 Dashboard tasks (Michał, ~10 min)

- [ ] **Vercel → Domains**: make `nonoise.media` → `www.nonoise.media` redirect
  **permanent (308)** — currently 307 temporary, bad canonical signal.
  Note: the apex is NOT attached to any project (verified 2026-07-07 across all 10
  team projects) — the 307 is Vercel's implicit fallback for an unassigned apex whose
  www sibling exists. Fix: in `nonoise-media-website` → Domains → **Add Existing** →
  `nonoise.media` → "Redirect to Another Domain" → `www.nonoise.media` → **308**.
  Verify after: `curl -sI https://nonoise.media/` → expect `HTTP/2 308`.
- [ ] **Cloudflare → Caching**: add cache rule for `assets.nonoise.media` with
  `max-age=31536000` (1 year). Currently 4h — returning visitors re-download the
  17 MB reel.
- [ ] **Cloudflare → decide on "Content Signals"**: Cloudflare injects a managed block
  into robots.txt (flags Lighthouse "invalid robots.txt", blocks GPTBot/ClaudeBot/CCBot
  etc.). Decide: keep AI-bot blocking or disable the managed robots.txt injection.

---

## 🎯 Conversion tracking fix (Google Ads undercount: 11 conversions vs 18 emails)

**Diagnosis (2026-07-08):** the code never pushes a dataLayer event on *successful* form
send — the only GTM events in the codebase are LP clicks (`lp_contact_click`,
`lp_reel_click`). Whatever the Ads conversion trigger is (submit-button click, GTM form
listener, element visibility), it counts a proxy, not confirmed sends. Additional gap
sources: (a) mailbox count mixes contact form + questionnaire ("Projekt:" subjects —
questionnaire has zero tracking), (b) organic/direct leads are correctly not counted
by Ads, (c) ad blockers / iOS block GTM but not the server-side email, (d) possible
Consent Mode defaults, (e) "One per click" counting setting.

### Code (Claude)
- [ ] Push `contact_form_success` via `sendGTMEvent` in the contact form success branch
  (`app/[locale]/contact/page.tsx`, after `res.ok` → `setStatus("sent")`).
- [ ] Push `questionnaire_success` in the questionnaire success branch
  (`components/questionnaire/questionnaire-form.tsx`, after `response.ok`).
- [ ] Add `phone_click` event in `components/phone-number.tsx` (matches existing
  `data-gaw-contact="phone-hero"` intent).
- Safe to deploy before GTM changes — unused events are inert.

### GTM (Michał, ~5 min, after code deploy)
- [ ] Create Custom Event trigger `contact_form_success`; point the existing Google Ads
  conversion tag at it; **remove the old click/form-submission trigger** (stop counting
  attempts).
- [ ] Optional: second conversion action for `questionnaire_success` (it's a stronger
  lead — consider higher value).
- [ ] Check Admin → Consent Overview: if Consent Mode defaults are "denied" with no
  consent banner on the site, conversions are being dropped/modeled — decide banner vs
  defaults.
- [ ] Verify in GTM Preview against the real form (submit a test message).

### Google Ads (Michał, checklist)
- [ ] Conversion action counting: set to **"Every"** (lead forms) if email-parity matters.
- [ ] Check attribution window on the conversion action.
- [ ] Enable **Enhanced Conversions** (form collects email → recovers ad-blocker/consent
  losses via signed-in matching). Needs a small GTM/user-data variable addition — ping
  Claude when enabling.
- Expectation: Ads will never equal mailbox count (organic leads + blockers are
  structural); goal is every ad-driven, trackable send counted exactly once.

## 🔜 Code — performance (approved direction, not yet done)

- [ ] **Reel loading strategy**: `preload="none"` + poster frame (WebP on R2) + start
  video load after hydration. Removes 17 MB from the critical loading window.
  Update CLAUDE.md hard rule about `preload="auto"` when done.
- [ ] **Compress `my-reel.mp4`** — 17 MB is heavy even lazy-loaded; well-encoded 1080p
  background loop should land at 5–8 MB. (Re-export/ffmpeg, upload to R2.)
- [ ] **Preconnect hints** for `assets.nonoise.media` + `www.googletagmanager.com`
  (~350 ms estimated LCP savings).
- [ ] **Canonical domain alignment**: site serves on `www.nonoise.media` but
  `metadataBase`, OG URLs, sitemap, robots sitemap ref and JSON-LD all say apex
  `nonoise.media`. Standardize on **www** everywhere in code.

## 🔜 Code — SEO / i18n

- [ ] **hreflang alternates** (`alternates.languages` + canonical) on all pages —
  two locales published with no relation signals.
- [ ] **Localize `/en/work`**: hardcoded Polish strings in `app/[locale]/work/page.tsx`,
  Polish-only metadata in `work/layout.tsx`, Polish-only copy in `lib/projects.ts`
  and `components/service-landing/service-landing-client.tsx`. Or decide to drop EN.

## 🔜 Code — hardening & quality

- [ ] **Rate limiting / honeypot** on `/api/send-contact` and `/api/send-quote`
  (spam + Resend quota abuse; currently unlimited anonymous POSTs).
- [ ] Throttle the home reel RAF loop (re-renders page 60×/s while reel plays).
- [ ] Replace raw `<img>` in `components/lp/lp-services-grid.tsx` (last ESLint warning).
- [ ] Nav logo `alt="Nonoise Media"` is redundant next to visible text (a11y flag) —
  use empty `alt=""`.
- [ ] Move planning `.md` files (about_plan, contact_plan, google-ads, guidelines-*, etc.)
  into `docs/`.

---

## Pre-existing backlog (from CLAUDE.md, unchanged)

- Validate testimonial copy (language, punctuation, legal approval).
- Move testimonials data into a dedicated data module.
- Smoke-test both email APIs after any env/domain change.
- OG images + route-specific social previews.
- Evaluate sticky CTA on mobile; tune animation timing.
- Finalize `/work` media sourcing before release.
