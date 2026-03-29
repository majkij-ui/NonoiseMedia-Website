import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Zobacz nasze realizacje. Filmy komercyjne, wizerunkowe i dokumentalne reportaże eventowe tworzone z dbałością o każdy detal.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
