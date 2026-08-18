import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import { breadcrumbList, videoObject } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Portfolio — Realizacje Wideo dla Firm",
    description:
      "Portfolio Nonoise Media: filmy wizerunkowe, korporacyjne, produktowe i reportaże eventowe dla PHH, Danone, CIONET i innych marek premium. Zobacz nasze realizacje.",
    alternates: buildAlternates(locale, "/work"),
  };
}

export default async function WorkLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return (
    <>
      <JsonLd
        data={breadcrumbList(locale, [
          { name: isEn ? "Home" : "Strona główna", path: "" },
          { name: isEn ? "Portfolio" : "Realizacje", path: "/work" },
        ])}
      />
      {projects.map((project) => (
        <JsonLd key={project.id} data={videoObject(project, locale)} />
      ))}
      {children}
    </>
  );
}
