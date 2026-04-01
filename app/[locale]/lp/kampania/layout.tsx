import type { Metadata } from "next"

const isProduction = process.env.NODE_ENV === "production"

export const metadata: Metadata = {
  title: "Kampania",
  description: "Nonoise Media — landing dla ruchu płatnego.",
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

export default function KampaniaLpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
