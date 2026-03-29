import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta",
  description:
    "Kompleksowa realizacja materiałów wideo — rolki, filmy produktowe, case studies, webinary i więcej. Wizualny storytelling nastawiony na konwersję.",
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
