import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Portfolio — Realizacje Wideo dla Firm",
    description:
      "Portfolio Nonoise Media: filmy wizerunkowe, korporacyjne, produktowe i reportaże eventowe dla PHH, Danone, CIONET i innych marek premium. Zobacz nasze realizacje.",
    alternates: buildAlternates(locale, "/work"),
  };
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
