import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas — Studio Produkcji Filmowej w Warszawie",
  description:
    "Nonoise Media to warszawskie studio produkcji filmowej i wideo dla firm. Filmy korporacyjne, reklamowe i produktowe tworzone z kinową jakością — bez agencyjnego narzutu.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
