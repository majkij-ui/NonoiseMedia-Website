import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Oferta — Filmy Korporacyjne, Reklamowe i Produktowe",
    description:
      "Kompleksowa produkcja wideo dla firm w Warszawie: filmy korporacyjne, reklamowe, produktowe, reportaże eventowe, rolki na Instagram i wideo na LinkedIn. Wizualny storytelling nastawiony na konwersję.",
    alternates: buildAlternates(locale, "/offer"),
  };
}

// No BreadcrumbList here: this layout also wraps /offer/[slug], which emits its own
// deeper breadcrumb — two BreadcrumbLists on one page would contradict each other.
export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
