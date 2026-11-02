export type ConsentValue = "granted" | "denied" | "unknown"

/** CookieYes writes `advertisement:yes|no`; Cookiebot writes `marketing:true|false`. */
const CMP_COOKIES: { name: string; granted: RegExp; denied: RegExp }[] = [
  {
    name: "cookieyes-consent",
    granted: /advertisement:yes/i,
    denied: /advertisement:no/i,
  },
  {
    name: "CookieConsent",
    granted: /marketing:true/i,
    denied: /marketing:false/i,
  },
]

function readCookie(name: string): string {
  try {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
    )
    return match ? decodeURIComponent(match[1]) : ""
  } catch {
    return ""
  }
}

/**
 * Current `ad_storage` consent signal.
 *
 * CookieYes runs through GTM, which loads after hydration, so "unknown" means
 * the visitor has not decided yet (or the banner is blocked). Callers must
 * treat "unknown" as its own case: reporting it as "granted" would put a
 * consent claim in the Google Ads export that nobody ever gave, and storage
 * must treat it like "denied".
 */
export function getAdStorageConsent(): ConsentValue {
  if (typeof window === "undefined") return "unknown"

  // Consent Mode, when a CMP has already pushed a state for this page.
  try {
    const state = window.google_tag_data?.ics?.getConsentState?.("ad_storage")
    if (state === 1) return "granted"
    if (state === 2) return "denied"
  } catch {
    // Fall through to cookies.
  }

  for (const cmp of CMP_COOKIES) {
    const value = readCookie(cmp.name)
    if (!value) continue
    if (cmp.granted.test(value)) return "granted"
    if (cmp.denied.test(value)) return "denied"
  }

  return "unknown"
}
