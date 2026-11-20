import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { buildAlternates } from "@/lib/seo"
import { Navigation } from "@/components/navigation"
import { FooterLegalLinks } from "@/components/footer-legal-links"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return {
      title: "Video Project Brief — Free Quote",
      description:
        "Tell us about your video project using our short questionnaire. We'll prepare a personalised proposal with pricing for your corporate or commercial video.",
      alternates: buildAlternates(locale, "/questionnaire"),
    }
  }
  return {
    title: "Kwestionariusz — Bezpłatna Wycena Projektu Wideo",
    description:
      "Opowiedz nam o swoim projekcie wideo za pomocą krótkiego kwestionariusza. Przygotujemy spersonalizowaną propozycję z wyceną dla Twojej firmy.",
    alternates: buildAlternates(locale, "/questionnaire"),
  }
}
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form"
import { questionnaireEn, questionnairePl } from "@/lib/questionnaire-data"

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function QuestionnairePage({ params }: PageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const questionnaire = locale === "pl" ? questionnairePl : questionnaireEn

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <Navigation fixed />
      <QuestionnaireForm questionnaire={questionnaire} />
      <footer className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 border-t border-white/10 px-6 py-6 text-xs tracking-widest text-muted-foreground md:px-12">
        <FooterLegalLinks />
      </footer>
    </main>
  )
}
