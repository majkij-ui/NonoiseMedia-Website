import type { Metadata } from "next"

/** Paid-traffic LP: not for organic search; keep out of index. */
export const metadata: Metadata = {
  title: "Kampania",
  description: "Nonoise Media — landing dla ruchu płatnego.",
  robots: { index: false, follow: false },
}

export default function KampaniaLpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
