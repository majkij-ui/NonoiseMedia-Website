import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Porozmawiajmy o Twoim kolejnym projekcie wideo. Skontaktuj się z naszym warszawskim studiem produkcyjnym.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
