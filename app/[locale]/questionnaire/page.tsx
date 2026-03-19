import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { Navigation } from "@/components/navigation"
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form"
import enDictionary from "@/dictionaries/en.json"
import plDictionary from "@/dictionaries/pl.json"

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function QuestionnairePage({ params }: PageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const questionnaire =
    locale === "pl" ? plDictionary.questionnaire : enDictionary.questionnaire

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <Navigation fixed />
      <QuestionnaireForm questionnaire={questionnaire} />
    </main>
  )
}
