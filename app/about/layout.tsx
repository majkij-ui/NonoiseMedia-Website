import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas",
  description:
    "Jesteśmy zespołem twórców, którzy wierzą w bezkompromisową jakość. Zamiast generować szum, dostarczamy konkretny, przemyślany obraz.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
