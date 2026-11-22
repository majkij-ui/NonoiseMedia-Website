"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { Navigation } from "@/components/navigation"
import { LpServicesGrid } from "@/components/lp/lp-services-grid"
import { OfferPricingTiers } from "@/components/offer/pricing-tiers"
import { FooterLegalLinks } from "@/components/footer-legal-links"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  const t = useTranslations("offer")

  return (
    <section className="relative px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-10 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6"
          >
            {t("label")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: cinematicEase }}
            className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: cinematicEase }}
            className="mt-6 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/70 md:mt-8 md:text-base"
          >
            {t("subheader")}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page Assembly
// ---------------------------------------------------------------------------

export default function OfferPage() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <Hero />
      {/* The same six tiles with prices as on the paid landing page, so the two never
          disagree. Here each opened tile also links to its detailed page. */}
      <LpServicesGrid variant="page" onQuote={(service) => router.push(`/contact?service=${service}`)} />
      <OfferPricingTiers />

      <footer className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <FooterLegalLinks />
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
