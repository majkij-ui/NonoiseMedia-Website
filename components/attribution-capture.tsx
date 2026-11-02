"use client"

import { useEffect } from "react"
import { applyAdStorageConsent, captureAttribution } from "@/lib/attribution"
import { getAdStorageConsent, type ConsentValue } from "@/lib/consent"

/** CookieYes fires this on `document` when the visitor accepts or rejects. */
const CONSENT_UPDATE_EVENT = "cookieyes_consent_update"

/**
 * Reads the advertisement decision from the event payload
 * (`detail.accepted` / `detail.rejected`, per CookieYes docs), falling back to
 * the cookie and Consent Mode state when the payload has no answer.
 */
function adConsentFrom(event: Event): ConsentValue {
  const detail = (event as CustomEvent<{ accepted?: unknown; rejected?: unknown }>).detail
  if (Array.isArray(detail?.accepted) && detail.accepted.includes("advertisement")) return "granted"
  if (Array.isArray(detail?.rejected) && detail.rejected.includes("advertisement")) return "denied"
  return getAdStorageConsent()
}

/**
 * Stores gclid / utm parameters on the landing hit so a form submitted later
 * can tell Google which ad click it came from. Mounted in the locale layout,
 * which survives client-side navigation, so this runs once per visit.
 *
 * Until the visitor accepts advertising cookies the record lives in
 * sessionStorage; a later consent decision moves it to match.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution()

    const onConsentUpdate = (event: Event) => applyAdStorageConsent(adConsentFrom(event))
    document.addEventListener(CONSENT_UPDATE_EVENT, onConsentUpdate)
    return () => document.removeEventListener(CONSENT_UPDATE_EVENT, onConsentUpdate)
  }, [])

  return null
}
