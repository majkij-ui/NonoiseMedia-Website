"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Megaphone,
  Film,
  PackageOpen,
  Clapperboard,
  Share2,
  Briefcase,
  TrendingUp,
  Mic,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

// Same order as the main offer grid — no hrefs (conversion page, keep leads on page)
const services: { key: string; icon: LucideIcon }[] = [
  { key: "corporateFilm",    icon: Building2    },
  { key: "commercialFilm",   icon: Megaphone    },
  { key: "brandFilm",        icon: Film         },
  { key: "productVideos",    icon: PackageOpen  },
  { key: "eventReportage",   icon: Clapperboard },
  { key: "instagramReels",   icon: Share2       },
  { key: "linkedinVideo",    icon: Briefcase    },
  { key: "caseStudies",      icon: TrendingUp   },
  { key: "expertInterviews", icon: Mic          },
]

function ServiceTile({
  icon: Icon,
  serviceKey,
  index,
}: {
  icon: LucideIcon
  serviceKey: string
  index: number
}) {
  const t = useTranslations("offer.services")

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: cinematicEase,
      }}
      className="group h-full border border-foreground/10 bg-background p-7 transition-colors duration-300 hover:bg-foreground hover:text-background md:p-8"
    >
      <Icon
        size={24}
        strokeWidth={1.4}
        className="mb-6 text-foreground/60 transition-colors duration-300 group-hover:text-background/70"
      />

      <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg uppercase leading-none tracking-[0.02em] text-foreground transition-colors duration-300 group-hover:text-background md:text-xl">
        {t(`${serviceKey}.title`)}
      </h3>

      <p className="font-sans text-xs leading-relaxed text-foreground/50 transition-colors duration-300 group-hover:text-background/60">
        {t(`${serviceKey}.body`)}
      </p>
    </motion.div>
  )
}

export function LpServicesGrid() {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="mb-12 grid grid-cols-1 gap-4 md:mb-16 md:grid-cols-12"
      >
        <div className="md:col-span-8 lg:col-span-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            02 / CO MOŻEMY DLA CIEBIE ZROBIĆ
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl md:text-6xl">
            PEŁNA OFERTA
          </h2>
          <p className="mt-4 max-w-lg text-pretty font-sans text-sm leading-relaxed text-foreground/60 md:mt-6">
            Od krótkich reelsów po pełne kampanie filmowe — realizujemy każdy format wideo, jaki może potrzebować Twoja firma.
          </p>
        </div>
      </motion.div>

      {/* 3 × 3 grid */}
      <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ key, icon }, i) => (
          <ServiceTile key={key} icon={icon} serviceKey={key} index={i} />
        ))}
      </div>
    </section>
  )
}
