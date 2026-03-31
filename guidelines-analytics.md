# Role & Context
Act as a Senior Next.js Developer and Tracking Expert. We need to implement Google Tag Manager (GTM) into our Next.js (App Router) project to track conversions for our paid ad campaigns (Meta/Google Ads).

# Objective
1. Install the official Next.js third-party package for Google Tag Manager.
2. Implement the GTM script globally without negatively impacting Core Web Vitals.
3. Create a utility function to send custom events to the GTM `dataLayer`.
4. Implement event tracking on the core Call-to-Action (CTA) buttons on the landing page.

# Execution Steps

## 1. Installation
- Run `npm install @next/third-parties@latest` in the terminal to install the official Next.js package.

## 2. Global Setup (Root Layout)
- Locate your root `layout.tsx` file (e.g., `app/layout.tsx`).
- Import the GTM component: `import { GoogleTagManager } from '@next/third-parties/google'`
- Add `<GoogleTagManager gtmId="GTM-XXXXXXX" />` inside the `<body>` or `<html>` tag (follow the official Next.js documentation for optimal placement). Leave `GTM-XXXXXXX` as a placeholder for now.

## 3. Create a DataLayer Utility
- Create a new file: `lib/gtm.ts` (or in your `utils` folder).
- Write a typed helper function to push events to the `window.dataLayer` safely. 
- Example implementation:
  ```typescript
  export const sendGTMEvent = (event: string, value?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: event,
        ...value,
      });
    }
  };
Ensure TypeScript doesn't complain by adding dataLayer: any[]; to the global Window interface if necessary.

4. Track Landing Page Conversions
Locate the landing page we created (/app/lp/kampania/page.tsx or similar).

Import the sendGTMEvent function.

Add an onClick handler to the "Zobacz Portfolio" Hero button: onClick={() => sendGTMEvent('lp_portfolio_click')}.

Add an onClick handler to the "Darmowa Wycena" Hero button: onClick={() => sendGTMEvent('lp_quote_click')}.

If there is a form submission function or a Calendly booking button at the bottom of the page, add an onClick or onSubmit event: sendGTMEvent('lp_form_submitted') or sendGTMEvent('lp_booking_click').

Please execute these steps and ensure the code compiles without TypeScript errors.