import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

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
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
