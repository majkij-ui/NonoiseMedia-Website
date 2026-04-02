import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta — Filmy Korporacyjne, Reklamowe i Produktowe",
  description:
    "Kompleksowa produkcja wideo dla firm w Warszawie: filmy korporacyjne, reklamowe, produktowe, reportaże eventowe, rolki na Instagram i wideo na LinkedIn. Wizualny storytelling nastawiony na konwersję.",
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
