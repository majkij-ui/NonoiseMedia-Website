import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta",
  description:
    "Kompleksowa realizacja produktów wideo dla biznesu — rolki, filmy produktowe, kampanie reklamowe, case studies, wywiady,webinary i więcej. Wizualny storytelling nastawiony na konwersję.",
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
