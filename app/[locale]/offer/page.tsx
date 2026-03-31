"use client"

import { motion } from "framer-motion"
import {
  Smartphone,
  Briefcase,
  PackageOpen,
  TrendingUp,
  Webcam,
  Mic,
  Video,
  Clapperboard,
  UserCheck,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/navigation"
import { OfferPricingTiers } from "@/components/offer/pricing-tiers"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

const serviceKeys = [
  "productVideos",
  "instagramReels",
  "eventReportage",
  "linkedinVideo",
  "caseStudies",
  "webinars",
  "expertInterviews",
  "vlogs",
  "personalizedVideo",
] as const

const serviceIcons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  productVideos: PackageOpen,
  instagramReels: Smartphone,
  eventReportage: Clapperboard,
  linkedinVideo: Briefcase,
  caseStudies: TrendingUp,
  webinars: Webcam,
  expertInterviews: Mic,
  vlogs: Video,
  personalizedVideo: UserCheck,
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  const t = useTranslations("offer")

  return (
    <section className="relative px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
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
// Service Card
// ---------------------------------------------------------------------------

function ServiceCard({
  icon: Icon,
  titleKey,
  bodyKey,
  index,
}: {
  icon: LucideIcon
  titleKey: string
  bodyKey: string
  index: number
}) {
  const t = useTranslations("offer.services")

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: cinematicEase,
      }}
      whileHover={{ y: -4 }}
      className="group border border-foreground/10 bg-background p-8 transition-colors duration-300 hover:bg-foreground hover:text-background md:p-10"
    >
      <Icon
        size={28}
        strokeWidth={1.4}
        className="mb-8 text-foreground/60 transition-colors duration-300 group-hover:text-background/70"
      />

      <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground transition-colors duration-300 group-hover:text-background md:text-2xl">
        {t(`${titleKey}.title`)}
      </h3>

      <p className="font-sans text-sm leading-relaxed text-foreground/50 transition-colors duration-300 group-hover:text-background/60">
        {t(`${bodyKey}.body`)}
      </p>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Services Grid
// ---------------------------------------------------------------------------

function ServicesGrid() {
  return (
    <section className="px-6 pb-32 md:px-12">
      <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2 lg:grid-cols-3">
        {serviceKeys.map((key, i) => (
          <ServiceCard
            key={key}
            icon={serviceIcons[key]}
            titleKey={key}
            bodyKey={key}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page Assembly
// ---------------------------------------------------------------------------

export default function OfferPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <Hero />
      <ServicesGrid />
      <OfferPricingTiers />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
