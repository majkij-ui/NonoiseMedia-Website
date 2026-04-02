import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import HomeClient from './HomeClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (locale === 'en') {
    return {
      title: { absolute: 'Video Production for Business Warsaw | Nonoise Media' },
      description:
        'Warsaw-based video production studio creating corporate films, commercials, product videos and brand films for premium brands. Get a free quote.',
      openGraph: {
        title: 'Video Production for Business Warsaw | Nonoise Media',
        description:
          'Warsaw video production studio. Corporate films, commercials and product videos with cinematic quality for premium brands.',
        locale: 'en_US',
      },
    }
  }
  return {
    title: { absolute: 'Produkcja Filmowa i Wideo dla Firm Warszawa | Nonoise Media' },
    description:
      'Warszawskie studio produkcji filmowej i wideo dla firm. Tworzymy filmy korporacyjne, reklamowe, produktowe i wizerunkowe dla marek premium. Bezpłatna wycena.',
    openGraph: {
      title: 'Produkcja Filmowa i Wideo dla Firm Warszawa | Nonoise Media',
      description:
        'Studio produkcji filmowej i wideo w Warszawie. Filmy korporacyjne, reklamowe i produktowe tworzone z kinową jakością dla marek premium.',
      locale: 'pl_PL',
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeClient />
}
