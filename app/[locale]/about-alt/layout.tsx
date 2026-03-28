import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas — Alternatywna",
  description:
    "Nonoise Media — studio produkcji wideo nowej generacji. Kinowa jakość, zwinność bez narzutu, bezkompromisowa dbałość o detal.",
};

export default function AboutAltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
