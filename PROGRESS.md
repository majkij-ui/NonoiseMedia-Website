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
- `/contact` page visual polish pass:
  - adjusted typography scale for hero contact lines,
  - map asset now prefers `/warsaw-map.png` with `/warsaw-map.jpg` fallback,
  - eased map block spacing and border treatment.
- `/about` and `/work` footer alignment updated to the 2026 single-line brand format.

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
- Implement the testimonials section from `about_plan.md` (recommended Option A).
- Replace placeholder testimonial content with approved client quotes and attributions.
- Finalize and optimize map asset format/size for best Lighthouse performance.
- Extend metadata/OG coverage for social previews across key routes.
