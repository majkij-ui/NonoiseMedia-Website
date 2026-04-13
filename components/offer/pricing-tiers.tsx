"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Link } from "@/i18n/navigation"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

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
      "Wydajna postprodukcja in-house",
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
] as const

type OfferPricingTiersProps = {
  /** When false, tier footer CTAs are hidden (e.g. landing page uses one global CTA). */
  showCta?: boolean
  /** Less padding below the grid (e.g. LP CTA sits directly under). */
  tightFooter?: boolean
}

export function OfferPricingTiers({ showCta = true, tightFooter = false }: OfferPricingTiersProps) {
  return (
    <section
      className={
        tightFooter
          ? "bg-surface-raised px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-40"
          : "px-6 py-24 md:px-12 md:py-40"
      }
    >
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
              className={`mb-1 font-mono text-[11px] uppercase tracking-[0.15em] ${
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

            <ul className={`flex-1 space-y-3 ${showCta ? "mb-10" : ""}`}>
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      tier.highlighted ? "text-background/60" : "text-foreground/50"
                    }`}
                  />
                  <span
                    className={`font-sans text-sm leading-relaxed ${
                      tier.highlighted ? "text-background/70" : "text-foreground/60"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {showCta ? (
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
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
