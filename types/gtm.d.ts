export {}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    /** Set by gtag/GTM once Consent Mode is initialized. */
    google_tag_data?: {
      ics?: {
        getConsentState?: (consentType: string) => number
      }
    }
  }
}
