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
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` (both in root `app/layout.tsx`) |

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
| Root layout (Analytics, SpeedInsights) | `app/layout.tsx` |
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
| `/[locale]/lp/kampania` | Paid ads landing page. **noindex**. No per-tier CTA buttons; single bottom CTA to `/contact` |
| `about-alt.md` | Agent onboarding doc only — not a route |

---

## What Was Recently Removed (Regression Reference)
- `components/ui/` (entire shadcn/Radix tree) — all `@radix-ui/*` and related deps removed from `package.json`.
- `app/[locale]/globals.css` and `styles/globals.css` (stale duplicates).
- `@import './tw-animate.css'` from `app/globals.css`.
- CSS tokens `--chart-*` and `--sidebar-*`.
- Hooks: `use-toast`, `use-mobile`; `components/theme-provider.tsx`; `components.json`.
- If forms/dashboard components are needed later: `pnpm add` shadcn + Radix deps again.

---

## Open Next Priorities
- Validate testimonial copy (language, punctuation, legal approval).
- Move testimonials data into a dedicated data module.
- Smoke-test `/api/send-contact` and `/api/send-quote` email delivery after any env/domain change.
- Add OG images and route-specific social preview tuning.
- Evaluate sticky CTA on mobile + tune animation timing.
- Finalize `/work` media sourcing strategy before release.
