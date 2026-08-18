import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Kontakt — Wycena Projektu Wideo",
    description:
      "Skontaktuj się z Nonoise Media — warszawskim studiem produkcji filmowej i wideo dla firm. Napisz, zadzwoń lub wypełnij kwestionariusz i otrzymaj bezpłatną wycenę.",
    alternates: buildAlternates(locale, "/contact"),
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
