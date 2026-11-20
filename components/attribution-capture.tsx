"use client"

import { useEffect } from "react"
import { applyAdStorageConsent, captureAttribution } from "@/lib/attribution"
import { CONSENT_EVENT, getAdStorageConsent, type ConsentChoice } from "@/lib/consent"

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

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice | undefined>).detail
      if (typeof detail?.ads === "boolean") {
        applyAdStorageConsent(detail.ads ? "granted" : "denied")
        return
      }
      applyAdStorageConsent(getAdStorageConsent())
    }
    document.addEventListener(CONSENT_EVENT, onConsent)
    return () => document.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  return null
}
