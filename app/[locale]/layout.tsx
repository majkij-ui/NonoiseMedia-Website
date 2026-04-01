import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SetDocumentLang } from '@/components/set-document-lang'

export const metadata: Metadata = {
  metadataBase: new URL('https://nonoise.media'),
  title: {
    default: 'Nonoise Media | Dom Produkcyjny Warszawa',
    template: '%s | Nonoise Media',
  },
  description:
    'Tworzymy kino dla marek. Od zwinnych ekip po pełne plany zdjęciowe. Łączymy rygorystyczną estetykę z celami biznesowymi. Bez dróg na skróty.',
  openGraph: {
    title: 'Nonoise Media | Dom Produkcyjny Warszawa',
    description:
      'Tworzymy kino dla marek. Od zwinnych ekip po pełne plany zdjęciowe. Łączymy rygorystyczną estetykę z celami biznesowymi.',
    url: 'https://nonoise.media',
    siteName: 'Nonoise Media',
    locale: 'pl_PL',
    type: 'website',
  },
  icons: {
    icon: 'https://assets.nonoise.media/logos/logo-orb.png',
    shortcut: 'https://assets.nonoise.media/logos/logo-orb.png',
    apple: 'https://assets.nonoise.media/logos/logo-orb.png',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SetDocumentLang locale={locale} />
      {children}
    </NextIntlClientProvider>
  )
}
