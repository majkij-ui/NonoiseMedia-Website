import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas",
  description:
    "Nonoise Media — studio produkcji wideo nowej generacji w Warszawie. Usługi wideo dla firm: kinowa jakość, zwinność bez narzutu, bezkompromisowa dbałość o detal.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
