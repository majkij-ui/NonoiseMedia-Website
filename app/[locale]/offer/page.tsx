"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Megaphone,
  Film,
  PackageOpen,
  Clapperboard,
  Smartphone,
  Briefcase,
  TrendingUp,
  Mic,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Navigation } from "@/components/navigation"
import { OfferPricingTiers } from "@/components/offer/pricing-tiers"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

// ---------------------------------------------------------------------------
// Service definitions — order = grid order (row-major, 3-col)
// href links to the dedicated landing page where one exists.
// ---------------------------------------------------------------------------

const services: {
  key: string
  icon: LucideIcon
  href?: string
}[] = [
  { key: "corporateFilm",   icon: Building2,   href: "/offer/filmy-korporacyjne" },
  { key: "commercialFilm",  icon: Megaphone,   href: "/offer/filmy-reklamowe"    },
  { key: "brandFilm",       icon: Film,        href: "/offer/filmy-wizerunkowe"  },
  { key: "productVideos",   icon: PackageOpen, href: "/offer/filmy-produktowe"   },
  { key: "eventReportage",  icon: Clapperboard,href: "/offer/reportaz-eventowy"  },
  { key: "instagramReels",  icon: Smartphone, href: "/offer/rolki-instagram"      },
  { key: "linkedinVideo",   icon: Briefcase,  href: "/offer/video-linkedin"        },
  { key: "caseStudies",     icon: TrendingUp, href: "/offer/video-case-studies"    },
  { key: "expertInterviews",icon: Mic,        href: "/offer/wywiady-eksperckie"    },
]

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
// Service Card — optionally wrapped in a Link when href is provided
// ---------------------------------------------------------------------------

function ServiceCard({
  icon: Icon,
  serviceKey,
  index,
  href,
}: {
  icon: LucideIcon
  serviceKey: string
  index: number
  href?: string
}) {
  const t = useTranslations("offer.services")

  const inner = (
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
      className="group relative border border-foreground/10 bg-background p-8 transition-colors duration-300 hover:bg-foreground hover:text-background md:p-10"
    >
      {/* "See more" indicator for tiles with landing pages */}
      {href && (
        <span className="absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/20 transition-colors duration-300 group-hover:text-background/40">
          →
        </span>
      )}

      <Icon
        size={28}
        strokeWidth={1.4}
        className="mb-8 text-foreground/60 transition-colors duration-300 group-hover:text-background/70"
      />

      <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground transition-colors duration-300 group-hover:text-background md:text-2xl">
        {t(`${serviceKey}.title`)}
      </h3>

      <p className="font-sans text-sm leading-relaxed text-foreground/50 transition-colors duration-300 group-hover:text-background/60">
        {t(`${serviceKey}.body`)}
      </p>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    )
  }

  return inner
}

// ---------------------------------------------------------------------------
// Services Grid
// ---------------------------------------------------------------------------

function ServicesGrid() {
  return (
    <section className="px-6 pb-32 md:px-12">
      <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ key, icon, href }, i) => (
          <ServiceCard
            key={key}
            icon={icon}
            serviceKey={key}
            index={i}
            href={href}
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
