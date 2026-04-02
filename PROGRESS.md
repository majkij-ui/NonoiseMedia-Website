# Progress Log

## Recently Completed
- **Bundle / CSS slimming and tooling (regression reference):** If something styling- or build-related breaks after a given deploy, check this first—these changes intentionally removed unused surface area.
  - **`app/globals.css`:** Removed **`@import './tw-animate.css'`** (vendored tw-animate-css utilities used only by the old shadcn/Radix layer). Removed unused design tokens **`--chart-*`** and **`--sidebar-*`** from `:root`, `.dark`, and `@theme inline`. Core semantic tokens (`--background`, `--foreground`, `--muted`, `--border`, etc.) are unchanged for the marketing UI.
  - **Removed the entire `components/ui/` tree** (shadcn/Radix scaffold). It was not imported by live routes except **`PhoneNumber`**, which now lives at **`components/phone-number.tsx`** (import: `@/components/phone-number`). **`hooks/use-toast`**, **`hooks/use-mobile`**, and **`components/theme-provider.tsx`** were removed as unused. **`components.json`** (shadcn CLI) was removed.
  - **Dependencies removed from `package.json`:** all `@radix-ui/*`, `class-variance-authority`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `@hookform/resolvers`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `zod` (only referenced by deleted UI). Re-adding a dashboard or forms later would require **`pnpm add`** / shadcn again.
  - **Stale duplicate CSS files removed:** `app/[locale]/globals.css` and `styles/globals.css` (unused imports, not wired by `app/layout.tsx`).
  - **ESLint:** `eslint` + `eslint-config-next` (flat config in **`eslint.config.mjs`**), `pnpm lint` runs **`eslint .`**. Ignored paths include **`nonoise-new-ref/**`**, **`drafts/**`**, build output. Navigation scroll-CTA logic refactored to avoid `react-hooks/set-state-in-effect`; BTS stripe shuffle keeps a targeted eslint-disable for hydration-safe randomization.
- **Paid traffic landing page (`/[locale]/lp/kampania`):** Dedicated **noindex** route for paid ads (`app/[locale]/lp/kampania/` — `robots: { index: false, follow: false }` in layout metadata). Page assembly: About-style hero (parity with `/about`, hero CTAs as compact bordered buttons; smooth scroll to `#portfolio` / `#lead`), thumbnail grid + shared video modal, About features, testimonials with optional Work-style **trusted logos** under “ZAUFALI NAM”, philosophy, **pricing tiers without per-tier buttons** (single bottom CTA), then lead strip to `/contact`. Strings under **`lp.kampania`** in `messages/pl.json` and `messages/en.json`. Spec notes: **`guidlines-landing.md`** (filename spelling kept for discoverability).
- **LP hero extraction (`components/lp/lp-hero.tsx`):**
  - moved the kampania hero/reel block out of `app/[locale]/lp/kampania/page.tsx` into a dedicated reusable component,
  - kept the same branded copy + CTA behavior while centralizing reel progress/mute/close logic and GTM `lp_reel_click` event wiring,
  - `app/[locale]/lp/kampania/page.tsx` now acts as a cleaner section assembler (`Navigation`, `LpHero`, features/grid/testimonials/philosophy/pricing/lead).
- **Supporting refactors for LP + `/work`:** **`lib/projects.ts`** (shared project list + `logoSizeClass`), **`components/project-video-modal.tsx`**, **`components/about/*`** extracted from the old monolithic about page, **`components/animated-home-button.tsx`** (from homepage), **`components/trusted-by-logos.tsx`**, **`components/offer/pricing-tiers.tsx`** (from `/offer`; LP uses **`showCta={false}`**, **`tightFooter`**, lead CTA aligned to **middle column width**; no border line between pricing and lead).
- **Agent onboarding doc:** added **`CLAUDE.md`** with a compact map of stack/rules/routes and regression references for faster context handoff.
- **About page migration:** Promoted the former **`/about-alt`** experience to the canonical **`/[locale]/about`** (navigation, metadata). Archived the previous `/about` implementation at **`/[locale]/about-old`** (not linked in nav). Removed the `about-alt` route; **`about-alt.md`** is restored as an agent onboarding guide (section map, template translation, preview URLs → `/about`). See **`ARCHITECTURE.md`** (About routes + CDN + pnpm).
- Wired **Vercel Web Analytics** in-app: `@vercel/analytics` + root `app/layout.tsx` `<Analytics />`; confirmed `proxy.ts` matcher leaves `_vercel` paths untouched. **Enable Web Analytics in the Vercel project dashboard** after deploy for data to populate.
- Updated all primary media and logo URLs to the dedicated CDN host `https://assets.nonoise.media` (Cloudflare R2).
- Synced `next.config.mjs` remote image hostname with the CDN migration.
- Refined global brand assets in navigation and metadata icon config to use remote logo sources.
- Redesigned the locale **`/contact`** page over several iterations: brutalist hero (large display email + phone), bordered two-card grid (form + questionnaire promo), and **server-side submission** via **`POST /api/send-contact`** (Resend, same env pattern as the quote flow) with client-side sending / success / error states—no longer `mailto:`-only.
- Standardized footer treatment across pages to the simplified right-aligned format:
  - `© 2026 NONOISE MEDIA`.

## Current Working Set (Unreleased in this file's timeline)
- **Repo hygiene:**
  - `.env` and `tsconfig.tsbuildinfo` are listed in `.gitignore` and removed from version control (files stay local only).
  - local reference clone `nonoise-new-ref/` is gitignored (nested project with its own `node_modules`; not part of this site).
- **`/contact` (locale route) — current behavior:**
  - full-viewport (`h-dvh`, `overflow-hidden`) layout: hero block with display-scale **email** and **phone**, **MapPin** address line to Google Maps,
  - two-column cards: **contact form** posting JSON to **`/api/send-contact`** (validation + Polish error copy; success clears fields; `AnimatePresence` for feedback) and **questionnaire** card with sweep CTA to `/questionnaire`,
  - decorative **Mail** icon on the form card; no large map image in the grid (address via link only).
- **Contact API:**
  - `app/api/send-contact/route.ts` — Resend HTML email to `contact@nonoise.media`, **`replyTo`** set to the visitor’s address; requires **`RESEND_API_KEY`** at runtime (Vercel + local `.env`).
- **Global styles:**
  - added `@keyframes ekgDash` in `app/globals.css` for SVG stroke-dashoffset animation (e.g. EKG-style line treatments).
- **i18n migration (PL/EN):**
  - restructured app routes under `app/[locale]/` for locale-based routing,
  - added `next-intl` with `i18n/` config (routing, request, navigation),
  - introduced `messages/pl.json` and `messages/en.json` for translations,
  - added `LanguageSwitcher` and `SetDocumentLang` components,
  - integrated locale-aware routing and middleware.
- `/questionnaire` intake UX (localized PL/EN):
  - added localized questionnaire hero with a prominent START CTA,
  - redesigned section intro + choice cards with animated option expansion for extra details,
  - updated dictionaries to include the hero CTA text and section content.
- Homepage hero CTA iteration:
  - added a dedicated `WYCEŃ PROJEKT` button beside `PLAY REEL`,
  - migrated to a shared `AnimatedHomeButton` pattern for both primary CTAs,
  - added staged letter-flicker + sweep reveal timing for hero button entrances.
- Navigation CTA behavior:
  - contextual header CTA on **`/about`** and **`/work`** (after scroll),
  - evolved header CTA animation with letter-by-letter flicker-in, staged white-underlay reveal and black hover wipe.
- `/work` trusted-by expansion:
  - added additional brand logos (`Core`, `GKA`, `Naish`),
  - introduced per-logo sizing tweaks for balanced visual rhythm.
- Route metadata refactor:
  - moved route-level metadata out of client pages into dedicated route layouts under `app/[locale]/` (e.g. `contact/layout.tsx`, `work/layout.tsx`, about routes).
- Video behavior polish:
  - homepage background reel now uses `preload="auto"`,
  - portfolio modal video uses `preload="metadata"` and `controlsList="nodownload"`.
- `/contact` accessibility:
  - form fields use `aria-label` where labels are not shown as visible text (see current `app/[locale]/contact/page.tsx`).
- Reusable phone-link component:
  - lives at **`components/phone-number.tsx`** (consistent tel-link / copy-on-desktop behavior); contact imports `@/components/phone-number`.
- `/work` page iteration in progress:
  - switched project and BTS media references to `assets.nonoise.media` BTS stills folders (e.g. `.../bts/phh/phh-stills-*`),
  - updated `BtsFilmStripe` to randomize visible frames after mount (avoids server/client hydration mismatches),
  - previously kept a local `/public` validation pass note while tuning hover and reveal wrappers.
- Homepage footer/content pass:
  - removed phone-link rendering from footer in favor of simplified location/brand footer copy.

## Planning / Documentation Added
- Added `about_plan.md` covering a premium testimonials section for `/about`:
  - design direction,
  - layout options and recommended placement,
  - animation approach,
  - content/data checklist.

## Risks / Notes
- Keep `.env` local-only and never commit. **`RESEND_API_KEY`** must be set in production for **`/api/send-contact`** and **`/api/send-quote`** to deliver mail.
- Keep media references consistent on `assets.nonoise.media` to avoid mixed-host regressions.

## Next Priorities
- Validate and refine testimonial copy (language consistency, quote punctuation, legal approval).
- Consider moving testimonials data into a dedicated data module for easier content maintenance.
- Smoke-test **contact** and **quote** email delivery on Vercel after each env or domain change.
- Finalize and optimize map asset format/size for best Lighthouse performance (if a static map returns to the UI).
- Add explicit OG image asset(s) and route-specific social preview tuning.
- Evaluate sticky CTA behavior on mobile breakpoints and tune animation timing.
- Verify readability/contrast of the new letter animation across dark and bright backgrounds.
- Decide final strategy for `/work` media sourcing (CDN vs local) and lock one path before release.
