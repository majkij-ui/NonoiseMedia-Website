"use client"

import { useEffect } from "react"
import { captureAttribution } from "@/lib/attribution"

/**
 * Stores gclid / utm parameters on the landing hit so a form submitted later
 * can tell Google which ad click it came from. Mounted in the locale layout,
 * which survives client-side navigation, so this runs once per visit.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
