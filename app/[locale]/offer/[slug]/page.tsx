import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { servicePages, getServicePage } from "@/lib/service-pages"
import { projects } from "@/lib/projects"
import { ServiceLandingClient } from "@/components/service-landing/service-landing-client"

// ---------------------------------------------------------------------------
// Static params — generate pages for every slug × locale combination
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return servicePages.flatMap((sp) =>
    routing.locales.map((locale) => ({ locale, slug: sp.slug }))
  )
}

// ---------------------------------------------------------------------------
// Metadata — locale-aware SEO title & description per service page
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const page = getServicePage(slug)
  if (!page) return {}

  const meta = locale === "en" ? page.meta.en : page.meta.pl

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "en" ? "en_US" : "pl_PL",
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const page = getServicePage(slug)
  if (!page) notFound()

  const project = page.featuredProjectId
    ? projects.find((p) => p.id === page.featuredProjectId)
    : undefined

  return <ServiceLandingClient data={page} project={project} />
}
