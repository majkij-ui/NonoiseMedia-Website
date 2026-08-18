import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bebas_Neue } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { DeferredThirdParties } from '@/components/deferred-third-parties'
import { cn } from '@/lib/utils'
import '../globals.css'

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

/** Primary UI/body font — preload so first paint isn’t blocked behind display/mono. */
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  preload: false,
})

/** Headings / display — used across routes; no separate per-page loader. */
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-bebas',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nonoise.media'),
  title: {
    default: 'Produkcja Filmowa i Wideo dla Firm Warszawa | Nonoise Media',
    template: '%s | Nonoise Media',
  },
  description:
    'Studio produkcji filmowej i wideo w Warszawie. Tworzymy filmy korporacyjne, reklamowe, produktowe i wizerunkowe dla firm i marek premium. Bezpłatna wycena.',
  openGraph: {
    title: 'Produkcja Filmowa i Wideo dla Firm Warszawa | Nonoise Media',
    description:
      'Studio produkcji filmowej i wideo w Warszawie. Filmy korporacyjne, reklamowe i produktowe tworzone z kinową jakością dla marek premium.',
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
    <html
      lang={locale}
      className={cn(geistSans.variable, geistMono.variable, bebasNeue.variable)}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <DeferredThirdParties gtmId={gtmId} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness'],
              name: 'Nonoise Media',
              url: 'https://nonoise.media',
              logo: 'https://assets.nonoise.media/logos/logo-orb.png',
              image: 'https://assets.nonoise.media/logos/logo-orb.png',
              description:
                'Studio produkcji filmowej i wideo w Warszawie. Tworzymy filmy korporacyjne, reklamowe i produktowe dla firm i marek premium.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Za olszyną 13B/2',
                addressLocality: 'Warszawa',
                postalCode: '05-090',
                addressCountry: 'PL',
              },
              telephone: '+48882111288',
              email: 'contact@nonoise.media',
              areaServed: { '@type': 'Country', name: 'Poland' },
              hasMap:
                'https://www.google.com/maps/search/?api=1&query=Za+olszyn%C4%85+13B%2F2+05-090+Podolszyn+Nowy',
              knowsAbout: [
                'Produkcja filmowa',
                'Filmy korporacyjne',
                'Filmy reklamowe',
                'Filmy produktowe',
                'Film wizerunkowy',
                'Reportaż eventowy',
                'Wideo dla firm',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
