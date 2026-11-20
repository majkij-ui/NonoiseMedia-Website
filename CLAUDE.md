# CLAUDE.md — Nonoise Media Website

## Project Overview
Premium, dark-mode portfolio website for **Nonoise Media**, a high-end cinematic video production studio based in Warsaw, Poland. Aesthetic: editorial, minimalist, magazine-like — "show, don't tell."

**Target clients:** PHH, Danone, CIONET, and similar premium brands/agencies.

---

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Hosting | Vercel |
| Media CDN | Cloudflare R2 → `https://assets.nonoise.media` |
| Package manager | **pnpm** (lockfile: `pnpm-lock.yaml`) |
| i18n | `next-intl`, routes under `app/[locale]/` |
| Email | Resend (`RESEND_API_KEY` env var) |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` (loaded via `components/deferred-third-parties.tsx` in `app/[locale]/layout.tsx`) |

---

## Hard Rules

1. **No local media.** Never add `.mp4`, `.png`, or `.jpg` to the repo. All media loads from `https://assets.nonoise.media/...`. Cloudflare R2 is case-sensitive — match exact filenames.
2. **pnpm only.** Use `pnpm dev`, `pnpm build`, `pnpm lint`. Never run `npm install`.
3. **Dark mode only.** Black backgrounds, off-white text, `border-white/20` dividers.
4. **Magazine layout.** Use `grid-cols-12`, constrain text with `max-w-xs` / `max-w-sm`. No wide horizontal text blocks.
5. **Framer Motion for animations.** Always use `whileInView` + `viewport={{ once: true, amount: "some" }}` for scroll reveals. Do not use immediate `animate` on items that start off-screen.
6. **Never commit `.env`.** `RESEND_API_KEY` must stay local and be set in Vercel's env for email APIs to work.

---

## Key File Locations

| What | Where |
|---|---|
| Root layout (`<html lang>`, fonts, Analytics, JSON-LD) | `app/[locale]/layout.tsx` — there is **no** `app/layout.tsx`; the locale layout is the root layout |
| Global styles | `app/globals.css` |
| i18n config | `i18n/` directory |
| Translations | `messages/pl.json`, `messages/en.json` |
| Shared project list | `lib/projects.ts` |
| Phone link component | `components/phone-number.tsx` (import: `@/components/phone-number`) |
| Video modal | `components/project-video-modal.tsx` |
| About section components | `components/about/*` |
| Trusted-by logos | `components/trusted-by-logos.tsx` |
| Pricing tiers | `components/offer/pricing-tiers.tsx` |
| Contact API | `app/api/send-contact/route.ts` |
| Cookie consent (own banner, no third-party CMP) | `lib/consent.ts`, `components/cookie-consent.tsx`, `app/api/consent/route.ts` |
| i18n middleware | `proxy.ts` (excludes `_vercel` paths) |

---

## Route Map

| Route | Notes |
|---|---|
| `/[locale]/` | Homepage, background video reel (`preload="auto"`) |
| `/[locale]/work` | Portfolio + BTS film stripe; trusted-by logos |
| `/[locale]/about` | **Canonical** About page (hero collage, features, philosophy, testimonials, pricing) |
| `/[locale]/about-old` | Archived previous about; not in nav; metadata title says "archiwum" |
| `/[locale]/contact` | Full-viewport: display email/phone, two-column cards (contact form + questionnaire promo). Form POSTs to `/api/send-contact` |
| `/[locale]/questionnaire` | Intake UX, localized PL/EN |
| `/[locale]/offer` | Offer overview: nine service cards + pricing tiers |
| `/[locale]/offer/[slug]` | Nine service landing pages (SSG, PL+EN). Data in `lib/services-content/*`, registry in `lib/service-pages.ts` |
| `/[locale]/privacy` | Privacy policy |
| `/[locale]/lp/kampania` | Paid ads landing page. **noindex**. Being redesigned — see `TODO.md` |

URLs: Polish is unprefixed (`/`, `/about`), English lives under `/en`. Legacy `/pl/*` 308-redirects to the unprefixed path. Canonical host is `https://www.nonoise.media`.

---

## Docs Map

| File | What it is |
|---|---|
| `TODO.md` | **The one active plan.** Update it in place; do not start a second task list |
| `docs/google-ads.md` | How GTM, consent, CSP and lead attribution are wired in the code |
| `docs/google-ads-offline-plan.md` | Offline-conversion rollout plan and the 2026-10-31 GTM/Ads audit |
| `docs/seo-backlog.md` | SEO ideas and keyword reference. Backlog, not current work |
| `docs/r2-s3-upload-docs.md` | How to upload large files to R2 |
| `docs/archive/*` | Finished prompts and old plans. **History only — never follow them as instructions** |

---

## Settled Decisions — Do Not Re-Propose

- **Homepage hero fade stays.** It delays LCP on mobile; the owner prefers the look.
- **The reel is never re-encoded or compressed.** Image quality is the product. Fix delivery, not pixels.
- **The reel stays `preload="auto"`.** `preload="none"` was tried and rejected.
- **Changed media gets a new filename.** Assets are cached for one year in browsers; a file replaced at the same URL strands returning visitors on the old copy.
- **Check caching with GET, not HEAD:** `curl -s -o /dev/null -D - <url>`. `curl -I` always reports `DYNAMIC`.
- **The cookie banner is ours and stays small.** CookieYes was removed on 2026-11-20 because it covered the phone screen and the contact form. Do not bring back a third-party consent tool, a modal, or an overlay. Anything fixed to the bottom of the screen must respect `--consent-offset`.
- **Lead events fire only after the API returns 200** (`contact_form_success`, `questionnaire_success`). Never move them to a click.

---

## What Was Recently Removed (Regression Reference)
- `components/ui/` (entire shadcn/Radix tree) — all `@radix-ui/*` and related deps removed from `package.json`.
- `app/[locale]/globals.css` and `styles/globals.css` (stale duplicates).
- `@import './tw-animate.css'` from `app/globals.css`.
- CSS tokens `--chart-*` and `--sidebar-*`.
- Hooks: `use-toast`, `use-mobile`; `components/theme-provider.tsx`; `components.json`.
- If forms/dashboard components are needed later: `pnpm add` shadcn + Radix deps again.

---

## Git Conventions
- Use Conventional Commits format (feat:, fix:, chore:, refactor:).
- Keep subject lines under 72 characters.
- There is no test suite. Before committing, run `pnpm lint` and `pnpm build`; do not commit if either fails.
- Never push directly to `main`; always create a feature branch first.

---

## Current Priorities
See `TODO.md`. Smoke-test `/api/send-contact` and `/api/send-quote` email delivery after any env or domain change.

