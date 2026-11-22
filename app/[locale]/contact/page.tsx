"use client"

import { useState, useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Mail, ClipboardList, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PhoneNumber } from "@/components/phone-number"
import { LeadForm } from "@/components/lead-form"
import { Link } from "@/i18n/navigation"
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact-info"
import { FooterLegalLinks } from "@/components/footer-legal-links"
import { LP_SERVICE_IDS, LP_SERVICE_OTHER } from "@/lib/lp-services"

const SERVICE_CHOICES: readonly string[] = [...LP_SERVICE_IDS, LP_SERVICE_OTHER]
const noSubscription = () => () => {}

/** The format picked on an offer tile, carried here as `?service=`. Empty when there is none. */
function readServiceFromUrl(): string {
  const value = new URLSearchParams(window.location.search).get("service") ?? ""
  return SERVICE_CHOICES.includes(value) ? value : ""
}

export default function ContactPage() {
  const tLp = useTranslations("lp.kampania")
  const contactEmail = CONTACT_EMAIL

  // Read from the address bar, not useSearchParams(): that hook would force this
  // prerendered page into dynamic rendering (same reason as in lib/attribution.ts).
  const serviceFromUrl = useSyncExternalStore(noSubscription, readServiceFromUrl, () => "")
  /** null until the visitor touches the field; then their choice wins over the URL. */
  const [pickedService, setPickedService] = useState<string | null>(null)
  const service = pickedService ?? serviceFromUrl
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=Za+olszyn%C4%85+13B%2F2+05-090+Podolszyn+Nowy"

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const revealEase = [0.22, 1, 0.36, 1] as const

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: revealEase },
    },
  }

  return (
    <main
      className={`flex min-h-dvh w-full flex-col bg-background text-foreground ${
        // The one-viewport lock is sized for the three-field form. With the format field
        // and an open cookie bar the submit button would be cut off, so let the page scroll.
        serviceFromUrl ? "" : "md-tall:h-[calc(100dvh-var(--consent-offset,0px))] md-tall:min-h-0 md-tall:overflow-hidden"
      }`}
    >
      <Navigation fixed />

      {/* Hero — brutalist header */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-shrink-0 px-6 pt-[calc(5rem+env(safe-area-inset-top))] md:px-12 md:pt-20"
      >
        <div className="flex flex-col gap-2 pb-4 md:pb-5">
          <motion.span
            variants={fadeUpVariants}
            className="block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            Co możemy dla Ciebie stworzyć?
          </motion.span>

          <motion.div variants={fadeUpVariants}>
            <a
              href={`mailto:${contactEmail}`}
              data-gaw-contact="email-hero"
              className="block w-fit font-[family-name:var(--font-display)] text-[2.4rem] uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 sm:text-[3rem] md:text-[3.4rem]"
            >
              {contactEmail}
            </a>
            <PhoneNumber
              phoneNumber={CONTACT_PHONE}
              data-gaw-contact="phone-hero"
              className="mt-1 block w-fit font-[family-name:var(--font-display)] text-[2.4rem] uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 sm:text-[3rem] md:text-[3.4rem]"
            />
          </motion.div>

          <motion.a
            variants={fadeUpVariants}
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-1.5 text-sm text-foreground/50 transition-colors hover:text-foreground/80"
          >
            <MapPin size={14} strokeWidth={1.5} className="flex-shrink-0" />
            Za olszyną 13B/2, 05-090 Podolszyn Nowy (Warszawa)
          </motion.a>
        </div>
      </motion.section>

      {/* Two-card area */}
      <div className="flex flex-1 flex-col border-t border-white/10 px-6 py-4 md:min-h-0 md:px-12 md:py-5">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid flex-1 grid-cols-1 gap-4 md:min-h-0 md:grid-cols-2 md:gap-4"
        >
          {/* Card 1 — Contact Form */}
          <motion.div
            variants={fadeUpVariants}
            className="relative flex flex-col border border-white/20 p-4 md:p-5"
          >
            <Mail
              size={36}
              strokeWidth={1}
              className="absolute right-4 top-4 text-foreground/10 md:right-5 md:top-5"
            />

            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Formularz kontaktowy
            </span>

            <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] text-foreground md:text-3xl">
              Opowiedz nam
              <br />
              o swoim projekcie
            </h2>

            <LeadForm
              source="contact"
              // The format field appears only for visitors who came from an offer tile:
              // everyone else keeps the three-field form this page is laid out around.
              serviceField={
                serviceFromUrl
                  ? {
                      label: tLp("formServiceLabel"),
                      placeholder: tLp("formServicePlaceholder"),
                      options: [
                        ...LP_SERVICE_IDS.map((id) => ({ value: id, label: tLp(`services.${id}.title`) })),
                        { value: LP_SERVICE_OTHER, label: tLp("formServiceOther") },
                      ],
                      value: service,
                      onChange: setPickedService,
                    }
                  : undefined
              }
            />
          </motion.div>

          {/* Card 2 — Questionnaire CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="relative flex flex-col border border-white/20 p-4 md:p-5"
          >
            <ClipboardList
              size={36}
              strokeWidth={1}
              className="absolute right-4 top-4 text-foreground/10 md:right-5 md:top-5"
            />

            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              INTERAKTYWNY KWESTIONARIUSZ
            </span>

            <div className="flex flex-1 flex-col">
              <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] text-foreground md:text-3xl">
                Nie lubisz
                <br />
                pytań otwartych?
              </h2>

              <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
                Nasz krótki kwestionariusz pomoże Ci określić zakres
                projektu&nbsp;— od&nbsp;formatu, przez styl, po&nbsp;budżet.
                Na&nbsp;tej podstawie przygotujemy spersonalizowaną propozycję.
              </p>

              <div className="mt-auto pt-4">
                <Link href="/questionnaire">
                  <motion.span
                    className="group relative inline-block w-fit overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[1.75rem] uppercase leading-none tracking-[0.02em] text-background md:text-[2rem]"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.span
                      className="absolute inset-0 bg-background"
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
                      Wypełnij kwestionariusz
                    </span>
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-white/10 px-6 py-2.5 text-xs tracking-widest text-muted-foreground md:px-12">
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1">
          <FooterLegalLinks />
          <span>© 2026 NONOISE MEDIA</span>
        </div>
      </footer>
    </main>
  )
}
