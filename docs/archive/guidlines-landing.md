# Role & Objective
Act as a Senior Next.js Developer and Conversion Rate Optimization (CRO) Specialist.
Your task is to build a new, dedicated landing page for paid ad traffic (Google/Meta Ads) located at `/app/lp/kampania/page.tsx` (or similar routing based on the project structure). 

# Core Directives
1. **Minimize New Code:** Mash up the existing `About` page and `Offer` page components. Reuse existing Framer Motion animations, Lucide React icons, and styling precisely as they are.
2. **Strict Adherence to Style:** Maintain the dark-mode aesthetic, the `cinematicEase` transitions, the typography (`var(--font-display)`, monospace subheadings), and the overall premium, boutique feel.
3. **Hidden from SEO:** This page must NOT be indexed by search engines. Ensure proper Next.js metadata is applied to prevent crawling.

# Component Architecture (Top to Bottom)

## 1. Metadata (SEO)
- Export a metadata object with `robots: { index: false, follow: false }` so this page remains a hidden "orphan page" for ad traffic only.

## 2. Navigation
- Import and use the existing `<Navigation fixed />` component.

## 3. Hero Section (Modified from About Page)
- **Base:** Reuse the `Hero` component from the current About page (with the 30-image grid and cinematic text reveal).
- **Copy Update:** Make the headline more conversion-oriented (e.g., "Tworzymy Wideo, Które Sprzedaje" or keep "WYBIJ SIĘ PONAD SZUM"). Keep the short sub-paragraph.
- **NEW ADDITION - CTAs:** Immediately below the paragraph in the left typography column, inject two buttons touching corner-to-corner, symilar style to home page:
  - **Primary Button:** Same style as home page buttons, saying "Portfolio". Clicking this should smooth-scroll to the grid of thumbnails showing projects from /work subpage.
  - **Secondary Button:** Same style as home page buttons, saying "Darmowa Wycena". Clicking this should smooth-scroll to the bottom Contact/Booking section.
- Apply the same Framer Motion entry delays to these buttons so they fade in gracefully with the text.

## 4. The Portfolio section
- Import the main grid or list component from the existing `Offer` or `Portfolio` page. 
- Place it immediately after the Hero. This gives ad traffic instant visual proof of the work without needing to navigate away.

## 5. How We Work / Process (Reused from About Page)
- Import and render the exact `Features` component from the About page (the section with `DiagnosticShuffler`, `TelemetryTypewriter`, and `CursorScheduler`).
- This serves as logic and process justification for B2B buyers.

## 6. Social Proof (Reused from About Page)
- Import and render the exact `TestimonialCards` component. 
- The sticky scrolling cards are highly engaging and build massive trust.

## 7. The Closer / Lead Capture (New or Reused)
- For starters let's use philosophy section from about sub-page.
- At the very bottom, before the footer, we need a clear conversion point.
- Create a clean, high-contrast button titled "Porozmawiajmy o Twoim Projekcie" (Let's talk about your project).

## 8. Footer
- Reuse the simple copyright footer from the About page.

# Execution
Please generate the complete `page.tsx` for this landing page by importing the necessary components from their respective files (e.g., `@/components/about/Hero`, `@/components/offer/PortfolioGrid`, etc. - adjust import paths based on actual project structure). Only write new component code for the Hero Buttons and the Final Lead Capture section if they don't already exist.