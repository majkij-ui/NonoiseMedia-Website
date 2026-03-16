# About Page: Testimonials Section Plan

## Overview
Add a high-end, editorial Testimonials/Quotes section to the `/about` page, per TODO.md. The section must align with the existing premium, magazine-like aesthetic: dark mode, strict typography, narrow columns, and "show, don't tell" confidence.

---

## 1. Design Direction

**Vibe:** Editorial quotes, not generic review cards. Think magazine pull-quotes—short, punchy, authoritative. No star ratings, no avatars unless they're B&W and minimal.

**Reference clients (from PROJECT_CONTEXT):** PHH, Danone, CIONET. Testimonials from these or similar premium brands carry the most weight.

**Layout principles (from ARCHITECTURE.md):**
- 12-column CSS grid (`grid-cols-12`)
- Narrow text widths (`max-w-xs`, `max-w-sm`)
- `border-white/20` for dividers
- Framer Motion `whileInView` with `viewport={{ once: true, amount: "some" }}`

---

## 2. Content Structure

**Per testimonial:**
- **Quote:** 1–3 sentences. Polish or English, depending on client.
- **Attribution:** Name, role, company (e.g., *Jan Kowalski, CMO, Danone*).
- **Optional:** Small logo (from R2) for brand recognition—grayscale by default, full color on hover (consistent with existing image grid treatment).

**Recommended count:** 3–5 testimonials. Quality over quantity.

---

## 3. Placement Options

**Option A: After the editorial grid, before footer**
- New section: `{/* Testimonials Section */}`
- Full-width container, content in 12-col grid
- Natural reading flow: Hero → Story + Images → Social Proof → Footer

**Option B: Interleaved with paragraphs**
- Insert 1–2 quotes between existing paragraphs in the editorial grid
- More magazine-like; quotes break up text blocks
- Risk: disrupts current asymmetrical balance

**Option C: Dedicated full-section block**
- Large, scroll-triggered block with staggered quote reveals
- Each quote in its own narrow column, stacked or side-by-side on desktop

**Recommendation:** Option A—clean separation, easier to maintain, doesn't disturb the existing grid.

---

## 4. Layout Proposal (12-column grid)

```
┌─────────────────────────────────────────────────────────────────┐
│  [Existing: Hero + Editorial Grid + 30-image collage]           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ZAUFALI NAM — CO MÓWIĄ O NAS   (section label, uppercase)       │
│                                                                  │
│  ┌─────────────────────┐  ┌─────────────────────┐                │
│  │ "Quote 1..."        │  │ "Quote 2..."        │  (2–3 cols ea) │
│  │ — Name, Role, Co.   │  │ — Name, Role, Co.   │                │
│  └─────────────────────┘  └─────────────────────┘                │
│                                                                  │
│  ┌─────────────────────┐  ┌─────────────────────┐                │
│  │ "Quote 3..."        │  │ [Optional: logo]    │                │
│  │ — Name, Role, Co.   │  │                     │                │
│  └─────────────────────┘  └─────────────────────┘                │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Footer]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:** Stack quotes vertically. One per row, `max-w-sm` for readability.

---

## 5. Typography & Styling

- **Quote:** `font-[family-name:var(--font-display)]` or serif for editorial feel. Slightly larger than body (`text-lg` or `text-xl`). `text-foreground/90`.
- **Attribution:** `text-xs uppercase tracking-[0.2em] text-muted-foreground`. Tight leading.
- **Section label:** `text-xs uppercase tracking-[0.3em] text-muted-foreground` (match existing labels like "co możemy dla Ciebie stworzyć?").
- **Optional quote marks:** Use `"` or a subtle decorative element—avoid heavy blockquote styling.

---

## 6. Animation (Framer Motion)

- Each testimonial card: `whileInView` with `viewport={{ once: true, amount: 0.2 }}`
- Stagger: `transition={{ delay: index * 0.15 }}` for sequential reveal
- Subtle entrance: `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`
- Use `cinematicEase` if defined: `[0.25, 0.1, 0.25, 1]`

---

## 7. Data Structure

**Option 1: Inline in page**
```ts
const testimonials = [
  {
    quote: "Nonoise Media delivered beyond our expectations...",
    name: "Jan Kowalski",
    role: "CMO",
    company: "Danone",
    logo?: "https://nonoise.media/testimonials/danone-logo.png",
  },
  // ...
]
```

**Option 2: Separate data file** (e.g. `data/testimonials.ts`) for easier content updates.

---

## 8. Assets

| Asset | Source | Notes |
|-------|--------|-------|
| Client logos (optional) | R2 CDN | Small, grayscale by default. SVG or PNG. |
| Quote marks / decorative (optional) | Inline SVG or Tailwind | Minimal, editorial. |

**Rule:** No local media. All images from `https://nonoise.media/...` (ARCHITECTURE.md).

---

## 9. Technical Checklist

- [ ] Create testimonials data array (inline or `data/testimonials.ts`)
- [ ] Add new section after editorial grid, before footer
- [ ] Use 12-column grid; narrow columns for quotes
- [ ] Apply Framer Motion `whileInView` with stagger
- [ ] Match typography: display font for quotes, muted uppercase for attribution
- [ ] Mobile: stack vertically
- [ ] Optional: client logos from R2 with grayscale → color hover

---

## 10. Content to Gather

Before implementation, collect:
- 3–5 real quotes from PHH, Danone, CIONET, or similar clients
- Permission to use names, roles, and company names
- Optional: approved logo files for R2 upload

---

## 11. Out of Scope

- Carousel/slider (keep it static for editorial feel)
- Star ratings or review aggregates
- External review widgets (Google, etc.)
