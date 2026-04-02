import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Realizacje Wideo dla Firm",
  description:
    "Portfolio Nonoise Media: filmy wizerunkowe, korporacyjne, produktowe i reportaże eventowe dla PHH, Danone, CIONET i innych marek premium. Zobacz nasze realizacje.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
