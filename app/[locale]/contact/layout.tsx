import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Wycena Projektu Wideo",
  description:
    "Skontaktuj się z Nonoise Media — warszawskim studiem produkcji filmowej i wideo dla firm. Napisz, zadzwoń lub wypełnij kwestionariusz i otrzymaj bezpłatną wycenę.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
