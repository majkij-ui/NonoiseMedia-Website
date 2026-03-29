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
  Check,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/navigation"
import { Link } from "@/i18n/navigation"

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
// Pricing — "Wybierz formę współpracy"
// ---------------------------------------------------------------------------

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
}

const TIERS = [
  {
    name: "Pojedyncze zlecenie",
    tagline: "PROJEKT",
    price: "Od 4 000 PLN",
    features: [
      "Materiały wideo szyte na miarę",
      "Kierownictwo kreatywne i koncepcja",
      "Profesjonalna ekipa i sprzęt",
      "Kompletna postprodukcja z korekcją kolorów i masterem dźwięku",
      "Filmy końcowe w wybranych przez Ciebie formatach",
    ],
    cta: "Rozpocznij projekt",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Abonament miesięczny",
    tagline: "RETAINER",
    price: "Od 7 500 PLN/mies.",
    features: [
      "Pakiet dni produkcyjnych/miesiąc",
      "Dedykowany dyrektor kreatywny",
      "Kompleksowa postprodukcja",
      "Materiały social media i optymalizacja",
      "Priorytetowe terminy",
      "Dashboard analityczny",
    ],
    cta: "Umów rozmowę",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Partnerstwo na miarę",
    tagline: "SKALA",
    price: "Wycena indywidualna",
    features: [
      "Nieograniczony zakres produkcji",
      "Integracja z Twoim zespołem",
      "Strategia kampanii wielokanałowej",
      "Wsparcie priorytetowe 24/7",
      "Dedykowany opiekun klienta",
    ],
    cta: "Skontaktuj się",
    href: "/contact",
    highlighted: false,
  },
]

function Pricing() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mb-12 text-center md:mb-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          02 / Zainwestuj w swoją markę
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          WYBIERZ FORMĘ
          <br />
          WSPÓŁPRACY
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
        className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3"
      >
        {TIERS.map((tier) => (
          <motion.div
            key={tier.name}
            variants={cardReveal}
            className={`flex flex-col p-8 md:p-10 ${
              tier.highlighted
                ? "bg-foreground text-background ring-1 ring-foreground md:scale-105"
                : "border border-foreground/10 bg-card text-foreground"
            }`}
          >
            <p
              className={`mb-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
                tier.highlighted ? "text-background/50" : "text-muted-foreground"
              }`}
            >
              {tier.tagline}
            </p>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em]">
              {tier.name}
            </h3>

            <p className="mb-8 font-[family-name:var(--font-display)] text-3xl tracking-[0.02em] md:text-4xl">
              {tier.price}
            </p>

            <ul className="mb-10 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      tier.highlighted ? "text-background/60" : "text-foreground/40"
                    }`}
                  />
                  <span
                    className={`font-sans text-sm leading-relaxed ${
                      tier.highlighted ? "text-background/70" : "text-foreground/50"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.href}
              className={`block w-full border py-4 text-center font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] transition-colors duration-300 ${
                tier.highlighted
                  ? "border-background/30 text-background hover:bg-background/10"
                  : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>
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
      <Pricing />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
