"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { startClarity } from "@/lib/clarity"

const GoogleTagManager = dynamic(
  () => import("@next/third-parties/google").then((m) => m.GoogleTagManager),
  { ssr: false }
)
const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => m.Analytics),
  { ssr: false }
)
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
)

/**
 * Loads GTM + Vercel analytics after hydration so they are not in the critical path.
 * Microsoft Clarity starts here too, and only after analytics consent (lib/clarity.ts).
 */
export function DeferredThirdParties({ gtmId }: { gtmId?: string }) {
  useEffect(() => startClarity(), [])

  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
