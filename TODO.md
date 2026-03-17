# Immediate Task List

**Legend:**
⚪️ Not Started
🟡 In Progress
🟢 Completed

## 🎯 General Direction: Ads Campaign Optimization
⚪️ **Conversion Tracking Prep:** Ensure all phone numbers and email addresses use functional `tel:` and `mailto:` links across the entire site for Google Ads tracking.
⚪️ **Global CTA:** Add a "Contact" or "Get a Quote" CTA button to the sticky header/navigation so it is always accessible on the Home page.
⚪️ **Floating CTA on Work Page:** Add a sticky, unintrusive "Get a Quote" (or Polish equivalent) button that follows the user as they scroll through the `/work` portfolio.

## 📄 Pages & Content Expansion
🟢 **Rework Contact Page:** >   - Add a custom, minimalist black-and-white map of Warsaw with the studio address.
  - Translate and optimize the contact form into Polish, ensuring it clearly drives the "desired action" (e.g., getting a quote).
⚪️ **New Drone Services Page:** >   - Create a dedicated `/drone` page showcasing aerial cinematography capabilities.
  - Add "Drone" to the main hamburger navigation menu.
⚪️ **Service-Specific Landing Pages (For Ads targeting):**
  - Draft and create `/services/corporate-video`
  - Draft and create `/services/product-video`
  - Draft and create `/services/drone-services` (can be the same as above)
 🟡**Social Proof Updates:**
  - Expand the "Zaufali Nam" (Trusted By) logo cloud on the `/work` page.
  - Add a high-end, editorial Testimonials/Quotes section to the `/about` page.

## ⚙️ Speed, SEO & Technical
⚪️ **SEO Metadata:** Implement proper `<title>` and `<meta description>` tags for all pages (using Next.js Metadata API) targeting keywords like "Corporate Video Production Warsaw" / "Produkcja Video Warszawa".
⚪️ **Video Performance Check:** Verify that the Cloudflare R2 videos are optimized for mobile data. (e.g., ensure we aren't loading 4K ProRes files on mobile, check bitrates, and use appropriate `preload` attributes on `<video>` tags so the site doesn't stutter on 4G/5G).