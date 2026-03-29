# Contact Page Improvement Plan

## Overview
Rework the `/contact` page to be a high-converting, Google Ads–friendly destination that prominently features the studio address, editorial imagery, and a clear path to conversion.

---

## 1. Business Address (Priority)

**Address to display:**
> Za olszyną 13B/2  
> 05-090 Podolszyn Nowy (Warszawa)

**Implementation:**
- Add a dedicated **Address** section with the full address in a prominent, readable format.
- Use `tel:` and `mailto:` links for phone and email (already present; ensure they remain for conversion tracking).
- Consider adding a **Google Maps link** (`https://www.google.com/maps/search/?api=1&query=Za+olszyną+13B/2+05-090+Podolszyn+Nowy`) so users can navigate directly—this also supports local SEO and Google Ads location extensions.
- Optionally add a **schema.org LocalBusiness** JSON-LD snippet in the page metadata for rich results and better local search visibility.

---

## 2. Picture / Visual Element

**Requirements (per ARCHITECTURE.md):**
- No local media. All images must load from Cloudflare R2 CDN (`https://assets.nonoise.media/...`).

**Options:**
- **Studio / office hero image:** A high-end, editorial B&W or desaturated photo of the studio, workspace, or Warsaw skyline. Host on R2 and use as a hero or sidebar image.
- **Portrait of founder/team:** Adds trust and human connection for premium clients.
- **Behind-the-scenes still:** A cinematic BTS frame from a production—reinforces the “show, don’t tell” vibe.

**Layout suggestion:**
- Use the existing 12-column editorial grid. Place the image in a narrow column (e.g., 4–5 cols) with the address and contact info in the adjacent column.
- Or: Full-width hero image at top, with address + form below in a grid.

---

## 3. Google Ads Optimization

**Conversion tracking & UX:**
- Keep all `tel:` and `mailto:` links functional and consistent (no JavaScript-only handlers that block tracking).
- Add `data-gtm-*` or `data-gaw-*` attributes if using Google Tag Manager / Google Ads conversion tracking.
- Ensure the primary CTA (e.g., “Wyślij wiadomość” / “Get a Quote”) is clearly identifiable for conversion tagging.

**Landing page best practices:**
- Single, clear goal: get a quote / start a conversation.
- Minimal friction: short form, visible address, phone, and email.
- Trust signals: address, phone, social links, and possibly a small “Zaufali Nam” logo strip if space allows.

**URL structure:**
- Keep `/contact` as the main URL. For ad campaigns, consider UTM parameters (e.g., `?utm_source=google&utm_medium=cpc`) for attribution.

---

## 4. Content & Copy Updates

**Polish translation (from TODO.md):**
- Form labels: Imię, Email, Wiadomość.
- Placeholders: Twoje imię, twoj@email.pl, Opowiedz nam o swoim projekcie...
- Submit button: **Wyślij wiadomość** or **Zapytaj o wycenę** (stronger CTA for ads).
- Section labels: Sociale, Adres, Formularz kontaktowy.

**Address section copy:**
- Label: `Adres` or `Odwiedź nas`
- Subtext (optional): `Zapraszamy do naszego studia w Warszawie. Umów się na spotkanie.`

---

## 5. Layout Proposal (12-column editorial grid)

```
┌─────────────────────────────────────────────────────────────────┐
│  [Navigation]                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Hero: Large email + phone + address block]                     │
│  (Anchored right on desktop, stacked on mobile)                  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────────────────────────┐ │
│  │                  │  │  ADRES                                │ │
│  │   [Picture]      │  │  Za olszyną 13B/2                     │ │
│  │   from R2 CDN    │  │  05-090 Podolszyn Nowy (Warszawa)     │ │
│  │                  │  │  [Map link / Open in Maps]             │ │
│  │   (4–5 cols)     │  │                                        │ │
│  │                  │  │  SOCIALE                               │ │
│  │                  │  │  Instagram | Vimeo | LinkedIn          │ │
│  └──────────────────┘  └──────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  FORMULARZ KONTAKTOWY (full width or 7–8 cols)               │ │
│  │  Imię | Email | Wiadomość | [Zapytaj o wycenę]              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Technical Checklist

- [ ] Add address block with `Za olszyną 13B/2, 05-090 Podolszyn Nowy (Warszawa)`.
- [ ] Add Google Maps link for directions.
- [ ] Source and upload contact hero/studio image to R2; add to page.
- [ ] Translate form and labels to Polish.
- [ ] Ensure `tel:` and `mailto:` links are used (no `onClick` redirects).
- [ ] Add optional LocalBusiness schema for SEO.
- [ ] Use Framer Motion `whileInView` for scroll reveals (per ARCHITECTURE.md).
- [ ] Keep dark mode, `border-white/20`, narrow columns.

---

## 7. Assets Needed

| Asset | Source | Notes |
|-------|--------|-------|
| Contact hero / studio image | R2 CDN | B&W or desaturated, editorial style |
| (Optional) Custom map graphic | SVG or R2 | Minimalist B&W map of Warsaw area with pin |

---

## 8. Out of Scope (for later)

- Custom map illustration (can start with Google Maps link only).
- Contact form backend (currently uses `mailto:`; consider Formspree, Vercel serverless, or similar later).
- Google Tag Manager / conversion pixel setup (document for implementation when ads go live).
