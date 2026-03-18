# Progress Log

## Recently Completed
- Updated all primary media and logo URLs to the dedicated CDN host `https://assets.nonoise.media`.
- Synced `next.config.mjs` remote image hostname with the CDN migration.
- Refined global brand assets in navigation and metadata icon config to use remote logo sources.
- Redesigned the `/contact` page into a premium two-column layout with:
  - stronger Polish copy and hierarchy,
  - direct email and phone CTAs,
  - improved CTA button micro-interaction,
  - map block linked to Google Maps.
- Standardized footer treatment across pages to the simplified right-aligned format:
  - `© 2026 NONOISE MEDIA`.

## Current Working Set (Unreleased in this file's timeline)
- Homepage hero CTA iteration:
  - added a dedicated `WYCEŃ PROJEKT` button beside `PLAY REEL`,
  - migrated to a shared `AnimatedHomeButton` pattern for both primary CTAs,
  - added staged letter-flicker + sweep reveal timing for hero button entrances.
- Navigation CTA behavior:
  - added a contextual header CTA on `/about` and `/work`,
  - CTA now renders only after initial scroll and uses a tighter reveal timing.
  - evolved header CTA animation with:
    - letter-by-letter flicker-in text treatment,
    - staged white-underlay reveal and black hover wipe for stronger contrast.
- `/work` trusted-by expansion:
  - added additional brand logos (`Core`, `GKA`, `Naish`),
  - introduced per-logo sizing tweaks for balanced visual rhythm.
- Route metadata refactor:
  - moved route-level metadata out of client pages into dedicated route layouts:
    - `app/about/layout.tsx`
    - `app/contact/layout.tsx`
    - `app/work/layout.tsx`
- Video behavior polish:
  - homepage background reel now uses `preload="auto"`,
  - portfolio modal video uses `preload="metadata"` and `controlsList="nodownload"`.
- `/contact` accessibility/content refinement:
  - replaced visible form labels with `aria-label` attributes,
  - map image now loads from CDN (`assets.nonoise.media`) with local fallback.
- Reusable phone-link component:
  - introduced `components/ui/phone-number.tsx` for consistent tel-link formatting,
  - reused on homepage footer and contact hero to centralize phone rendering.
- `/work` page iteration in progress:
  - switched project and BTS media references back to local `/public` paths for a local-asset validation pass,
  - adjusted card hover/play-overlay behavior and simplified section reveal wrappers,
  - temporarily restored classic footer variant (`© 2024`, `WARSAW, POLAND`) for visual comparison.
- Homepage footer/content pass:
  - removed phone-link rendering from footer in favor of simplified location/brand footer copy.

## Planning / Documentation Added
- Added `about_plan.md` covering a premium testimonials section for `/about`:
  - design direction,
  - layout options and recommended placement,
  - animation approach,
  - content/data checklist.

## Risks / Notes
- Keep `.env` local-only and never commit.
- Keep media references consistent on `assets.nonoise.media` to avoid mixed-host regressions.

## Next Priorities
- Validate and refine testimonial copy (language consistency, quote punctuation, legal approval).
- Consider moving testimonials data into a dedicated data module for easier content maintenance.
- Finalize and optimize map asset format/size for best Lighthouse performance.
- Add explicit OG image asset(s) and route-specific social preview tuning.
- Evaluate sticky CTA behavior on mobile breakpoints and tune animation timing.
- Verify readability/contrast of the new letter animation across dark and bright backgrounds.
- Decide final strategy for `/work` media sourcing (CDN vs local) and lock one path before release.
