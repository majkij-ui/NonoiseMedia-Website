import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bebas_Neue } from 'next/font/google'
import { DeferredThirdParties } from '@/components/deferred-third-parties'
import { cn } from '@/lib/utils'
import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, bebasNeue.variable)}
    >
      <body className="font-sans antialiased">
        {children}
        <DeferredThirdParties gtmId={gtmId} />
      </body>
    </html>
  )
}
