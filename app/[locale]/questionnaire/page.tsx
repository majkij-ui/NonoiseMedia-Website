import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { Navigation } from "@/components/navigation"

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
    }
  }
  return {
    title: "Kwestionariusz — Bezpłatna Wycena Projektu Wideo",
    description:
      "Opowiedz nam o swoim projekcie wideo za pomocą krótkiego kwestionariusza. Przygotujemy spersonalizowaną propozycję z wyceną dla Twojej firmy.",
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
    </main>
  )
}
