# About Page — Agent Onboarding (formerly “about-alt”)

## Current status (production routing)

This document describes the **design and implementation** of the rich About experience that originally lived at **`/about-alt`**. That route was **promoted to the canonical About page**:

| Route | Files | Notes |
|-------|--------|--------|
| **`/[locale]/about`** | `app/[locale]/about/layout.tsx`, `app/[locale]/about/page.tsx` | **Live** — navigation “O nas” / About points here. |
| **`/[locale]/about-old`** | `app/[locale]/about-old/layout.tsx`, `app/[locale]/about-old/page.tsx` | **Archive** — previous simpler About (editorial grid + testimonials). Not linked in nav. |

The experimental **`/about-alt` route no longer exists**; keep this file for **context, section map, and design-system translation** when editing `app/[locale]/about/page.tsx`.

For hosting and media rules, see **`ARCHITECTURE.md`**.

---

## Purpose (historical)

The page was created by adapting a generic SaaS-style landing template (`nonoise-new-ref/`) into the main site's brutalist, editorial design language. The goal was to explore richer section types (interactive feature cards, sticky process steps, pricing tiers) while preserving the brand's dark-mode, type-driven, sharp-cornered aesthetic.

---

## Route & files (where to edit now)

| File | Role |
|------|------|
| `app/[locale]/about/layout.tsx` | Metadata (title **“O Nas”**, description). No wrapper markup. |
| `app/[locale]/about/page.tsx` | Single `"use client"` component containing all sections (large file). |

Accessible at **`/pl/about`** and **`/en/about`**. i18n routing uses `next-intl` in `app/[locale]/layout.tsx` and `proxy.ts`.

Content is still **mostly hardcoded in Polish** in the page file. English localization can be extracted to `messages/pl.json` and `messages/en.json` when prioritized.

---

## Origin: Reference Template

The source material lives in `nonoise-new-ref/` (gitignored). It is a single-page Next.js 16 landing built with:
- **GSAP** + ScrollTrigger for animations
- **Space Grotesk / DM Serif Display / Space Mono** fonts
- Light cream backgrounds (`#F5F3EE`), red accent (`#E63B2E`), rounded corners (`rounded-[2rem]`)
- Sections: Hero, Features (3 animated cards), Philosophy (word reveal), Protocol (sticky stacking), Pricing (3 tiers), Footer CTA

None of the template code was copied verbatim. Every section was **rewritten from scratch** in TypeScript with Framer Motion, using the main site's design tokens.

---

## Design System Translation

The template's visual language was systematically remapped:

| Template | Main Site |
|----------|-----------|
| `bg-offwhite` / `bg-paper` (cream) | `bg-background` (near-black, `oklch(0.08 0 0)`) |
| `bg-dark` (for inverted sections) | `bg-card` (`oklch(0.12 0 0)`) or `bg-secondary` |
| `text-signal` (red `#E63B2E`) | `text-foreground` (white) with opacity/weight for emphasis |
| `rounded-[2rem]` / `rounded-full` | Sharp edges (`--radius: 0rem`) |
| `font-heading` (Space Grotesk) | `font-sans` (Geist) |
| `font-drama` (DM Serif italic) | `font-[family-name:var(--font-display)]` (Bebas Neue) |
| `font-data` (Space Mono) | `font-mono` (Geist Mono) |
| GSAP animations | Framer Motion: `whileInView`, `useScroll`/`useTransform`, spring physics |
| Pill buttons (`btn-magnetic`) | Sweep-reveal CTAs with `mix-blend-difference` (same as home page) |
| `border-dark/8` | `border-foreground/10` or `border-white/20` |

---

## Sections (top to bottom)

### 1. Navigation
Uses `<Navigation fixed />` from `components/navigation.tsx`. Same as all other pages. The template's floating pill navbar was discarded.

### 2. Hero
Two-column layout on desktop (12-col grid, `items-start`):
- **Left (7 cols lg):** Monospace eyebrow ("Produkcja Filmowa i Wideo"), Bebas Neue headline "WYBIJ SIE / PONAD SZUM" (matching the main about page), body paragraph in Geist (`text-sm md:text-base, text-foreground/70`), and two CTAs in a **checkerboard diagonal** layout (same pattern as the home page: first button `absolute bottom-full right-full`, second in flow).
- **Right (5 cols lg):** 5x6 photo grid (30 images from `assets.nonoise.media/about/collage1-30.png`) with row-staggered Framer Motion reveal and the grayscale-to-saturated hover effect (`grayscale opacity-70`, slow 2000ms ease-out transition, instant 50ms snap-back on hover).
- Both columns are top-aligned.
- Top padding: `pt-40 md:pt-48` for breathing room below the fixed navigation.

### 3. Features — "Trzy filary precyzyjnych mediow"
Three interactive cards in `md:grid-cols-3` with scroll-triggered stagger reveal:
- **Card 1 — DiagnosticShuffler:** Auto-cycling stack of three service cards (Filmy wizerunkowe, Spoty reklamowe, Styl dokumentalny) with spring-bounce transitions. Cards use `bg-secondary` with `border-foreground/10`.
- **Card 2 — TelemetryTypewriter:** Terminal-style typewriter feed showing production pipeline messages in Polish. Dark inner terminal (`bg-background`), monospace font, blinking cursor, auto-scrolling. Messages type character-by-character with random timing jitter.
- **Card 3 — CursorScheduler:** Animated SVG cursor that autonomously clicks through a 7-day grid (Polish day labels: N, Pn, Wt, Sr, Cz, Pt, So), activating days and pressing "Publikuj harmonogram". Loops infinitely.

All cards: sharp borders, `bg-card`, Bebas Neue titles, Geist body, monospace labels.

### 4. Philosophy — "Poruszaniu ludzi"
Full-width dark section with:
- Parallax background image (Unsplash, `opacity-[0.06]`) driven by `useScroll`/`useTransform`.
- Word-by-word staggered reveal (custom `WordRevealBlock` component using `whileInView` + `staggerChildren`).
- Copy hierarchy: muted lead-in ("Wiekszosc mediow skupia sie na: ladnym wygladzie."), bright statement ("My skupiamy sie na:"), massive Bebas Neue display text ("PORUSZANIU LUDZI."), and muted subtext.

### 5. Protocol — "Zbudowany na protokole"
Three fullscreen sticky cards that stack on scroll:
- Each card is `sticky top-0 h-[100dvh]` with incrementing `z-index`.
- Alternating backgrounds: `bg-background` / `bg-card`.
- Steps: ODKRYWAMY, PRODUKUJEMY, DOSTARCZAMY with Polish descriptions.
- SVG decorative elements on the right side: ConcentricCircles (slow-rotate), LaserGrid (dot matrix), EKGWaveform (stroke-dashoffset animation via `@keyframes ekgDash` in `app/globals.css`).

**Known limitation:** The stacking cards lack the scale-down/blur effect from the original template (which used GSAP ScrollTrigger scrub). The current version relies on pure CSS sticky stacking. This is marked as a future improvement.

### 6. Testimonials — "Referencje"
12-column grid layout (matching the main about page's testimonials section):
- Left column (3 cols): Bebas Neue label "REFERENCJE".
- Right columns (9 cols, split into 3): Three Polish testimonials with `border-t border-white/20`, Quote icon, blockquote text, author credit.
- Framer Motion stagger reveal (`staggerChildren: 0.14`).
- Testimonial data may overlap with **`about-old`**; consider a shared `data/testimonials.ts` if you dedupe.

**Placed above Pricing** (social proof before the investment ask).

### 7. Pricing — "Wybierz forme wspolpracy"
Three-tier pricing cards centered (`max-w-5xl`):
- **Essential:** Od 10 000 PLN, single project
- **Performance:** Od 25 000 PLN/mies., monthly retainer (highlighted: `bg-foreground text-background`, `md:scale-105`)
- **Enterprise:** Wycena indywidualna, custom partnership
- Check-mark feature lists in Geist, Bebas Neue tier names and prices.
- CTA buttons with sharp borders and hover invert (`hover:bg-foreground hover:text-background`).

### 8. Footer
Right-aligned copyright: `© 2026 NONOISE MEDIA`. Same pattern as all other pages.

---

## Key Components Defined In-File

These are **not** extracted to `components/` — they live inside `about/page.tsx` for self-containment:

| Component | Purpose |
|-----------|---------|
| `Hero` | Two-column hero with photo grid |
| `SweepButton` | Animated CTA with letter-flicker entrance + sweep reveal + hover wipe. Supports `entranceDelay`, `entranceFrom`, and `variant` (filled/outline) props. |
| `DiagnosticShuffler` | Auto-cycling card stack |
| `TelemetryTypewriter` | Terminal typewriter feed |
| `CursorScheduler` | Animated cursor + grid interaction |
| `Philosophy` | Parallax + word-by-word reveal |
| `WordRevealBlock` | Reusable word-stagger reveal |
| `Protocol` | Sticky stacking process cards |
| `ConcentricCircles` / `LaserGrid` / `EKGWaveform` | SVG decorative elements for Protocol |
| `Pricing` | Three-tier pricing grid |
| `TestimonialCards` (or equivalent) | 12-col testimonial grid |

---

## Global CSS Dependency

One keyframe was added to `app/globals.css` for this page:

```css
@keyframes ekgDash {
  to {
    stroke-dashoffset: 0;
  }
}
```

Used by the `EKGWaveform` SVG in the Protocol section. The `spin` keyframe (for `ConcentricCircles`) is a Tailwind built-in.

---

## What's NOT Here

- Full `next-intl` coverage for all strings (much is still hardcoded Polish)
- No GSAP dependency (everything is Framer Motion)
- No local media files (all images from CDN or Unsplash; production should prefer **`https://assets.nonoise.media`** per `ARCHITECTURE.md`)

---

## Known Issues & Future Work

1. **Protocol stacking cards** may feel sparse. Consider richer imagery or video thumbnails.
2. **Protocol scroll effect** lacks GSAP-style scale-down + blur on previous cards; could use Framer Motion `useScroll`/`useTransform` with careful offsets.
3. **Pricing** may be illustrative — validate before treating as final.
4. **Testimonials** — dedupe with `about-old` or centralize in `data/testimonials.ts`.
5. **Unsplash image** in Philosophy should be replaced with a CDN asset from `assets.nonoise.media` when possible.
6. **English copy** — extract to `messages/*` when localizing.

---

## How to Preview

With the dev server running (`pnpm dev`):

- Polish: `http://localhost:3000/pl/about`
- English: `http://localhost:3000/en/about` (content may still be Polish in places)

The reference template (if present) can be previewed separately:

```bash
cd nonoise-new-ref && npx next dev -p 3001
```

Then visit `http://localhost:3001`.

---

## Archived simpler About

The previous single-page About (editorial grid + testimonials only) lives at **`/about-old`** — see `app/[locale]/about-old/page.tsx`. Useful for diffing copy or layout when iterating on `/about`.
