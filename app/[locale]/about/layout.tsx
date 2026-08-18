import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "O Nas — Studio Produkcji Filmowej w Warszawie",
    description:
      "Nonoise Media to warszawskie studio produkcji filmowej i wideo dla firm. Filmy korporacyjne, reklamowe i produktowe tworzone z kinową jakością — bez agencyjnego narzutu.",
    alternates: buildAlternates(locale, "/about"),
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
