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
 * The site has no cookie banner yet, so "unknown" is the expected answer
 * today: tags load unblocked and Google receives no consent signals. Callers
 * must treat "unknown" as its own case — reporting it as "granted" would put
 * a consent claim in the Google Ads export that nobody ever gave. Once a CMP
 * is wired into GTM (Etap 1) this resolves to granted/denied with no changes
 * anywhere else.
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
