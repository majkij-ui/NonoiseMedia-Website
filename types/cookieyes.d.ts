export {}

declare global {
  interface Window {
    /** Defined by the CookieYes banner script; reopens the consent banner. */
    revisitCkyConsent?: () => void
  }
}
