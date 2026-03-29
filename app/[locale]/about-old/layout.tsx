import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas (archiwum)",
  description:
    "Poprzednia wersja strony O nas (layout referencyjny + referencje). Jesteśmy zespołem twórców, którzy wierzą w bezkompromisową jakość.",
};

export default function AboutOldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
