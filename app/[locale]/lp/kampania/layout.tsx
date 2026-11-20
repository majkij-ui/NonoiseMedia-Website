import type { Metadata } from "next"

/** Paid-traffic LP: not for organic search; keep out of index. */
export const metadata: Metadata = {
  title: "Produkcja filmowa i wideo dla firm — wycena projektu",
  description:
    "Filmy korporacyjne, reklamowe i produktowe dla firm. Zobacz realizacje i wyślij zapytanie o wycenę.",
  robots: { index: false, follow: false },
}

export default function KampaniaLpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
