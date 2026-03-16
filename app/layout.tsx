import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _bebasNeue = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: ["400"] });

export const metadata: Metadata = {
  title: 'Nonoise Media | Produkcja Wideo',
  description: 'Cinematic video production for brands that demand excellence',
  generator: 'v0.app',
  icons: {
    icon: '/images/logo-orb.png',
    shortcut: '/images/logo-orb.png',
    apple: '/images/logo-orb.png',
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
      </body>
    </html>
  )
}
