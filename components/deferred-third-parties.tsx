"use client"

import dynamic from "next/dynamic"

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

/** Loads GTM + Vercel analytics after hydration so they are not in the critical path. */
export function DeferredThirdParties({ gtmId }: { gtmId?: string }) {
  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
