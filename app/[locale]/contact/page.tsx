"use client"

import { type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { ClipboardList } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PhoneNumber } from "@/components/ui/phone-number"
import { Link } from "@/i18n/navigation"

export default function ContactPage() {
  const contactEmail = "contact@nonoise.media"
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=Za+olszyn%C4%85+13B%2F2+05-090+Podolszyn+Nowy"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = `Nowa wiadomość od ${formData.name || "odwiedzającego stronę"}`
    const body = [
      `Imię: ${formData.name || "-"}`,
      `Email: ${formData.email || "-"}`,
      "",
      "Wiadomość:",
      formData.message || "-",
    ].join("\n")

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="flex h-dvh w-full flex-col bg-background text-foreground">
      <Navigation fixed />

      {/* Top info strip */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-shrink-0 border-b border-white/10 px-6 pt-[calc(5rem+env(safe-area-inset-top))] md:px-12 md:pt-20"
      >
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col gap-4 pb-5 md:flex-row md:items-baseline md:gap-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Co możemy dla Ciebie stworzyć?
          </span>

          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm">
            <a
              href={`mailto:${contactEmail}`}
              data-gaw-contact="email-hero"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {contactEmail}
            </a>
            <span className="hidden text-white/20 md:inline">·</span>
            <PhoneNumber
              phoneNumber="+48 882 111 288"
              data-gaw-contact="phone-hero"
              className="text-foreground/80 transition-colors hover:text-foreground"
            />
            <span className="hidden text-white/20 md:inline">·</span>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              Za olszyną 13B/2, 05-090 Podolszyn Nowy
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Two-card area */}
      <div className="flex min-h-0 flex-1 flex-col px-6 py-6 md:px-12 md:py-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid min-h-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {/* Card 1 — Contact Form */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col border border-white/20 p-6 md:p-8"
          >
            <span className="mb-5 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Formularz kontaktowy
            </span>

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-4"
            >
              <input
                id="name"
                type="text"
                aria-label="Imię"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-b border-white/20 bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                placeholder="Twoje imię"
              />

              <input
                id="email"
                type="email"
                aria-label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-b border-white/20 bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                placeholder="twoj@email.pl"
              />

              <textarea
                id="message"
                aria-label="Wiadomość"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={3}
                className="flex-1 resize-none border-b border-white/20 bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                placeholder="Opowiedz nam o swoim projekcie..."
              />

              <div className="mt-auto pt-3">
                <motion.button
                  type="submit"
                  className="group relative w-fit overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[2rem] uppercase leading-none tracking-[0.02em] text-background md:text-[2.24rem]"
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="absolute inset-0 bg-background"
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
                    Wyślij wiadomość
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Card 2 — Questionnaire CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col border border-white/20 p-6 md:p-8"
          >
            <span className="mb-5 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Potrzebujesz pomocy?
            </span>

            <div className="flex flex-1 flex-col">
              <ClipboardList
                size={28}
                strokeWidth={1.2}
                className="mb-5 text-foreground/30"
              />

              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.02em] text-foreground md:text-4xl lg:text-[2.8rem]">
                Nie wiesz, czego
                <br />
                dokładnie
                <br />
                potrzebujesz?
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/60">
                Nasz krótki kwestionariusz pomoże Ci określić zakres
                projektu&nbsp;— od&nbsp;formatu, przez styl, po&nbsp;budżet.
                Na&nbsp;tej podstawie przygotujemy spersonalizowaną propozycję.
              </p>

              <div className="mt-auto pt-6">
                <Link href="/questionnaire">
                  <motion.span
                    className="group relative inline-block w-fit overflow-hidden border border-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[2rem] uppercase leading-none tracking-[0.02em] text-foreground md:text-[2.24rem]"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.span
                      className="absolute inset-0 bg-foreground"
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
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
      <footer className="flex-shrink-0 border-t border-white/10 px-6 py-5 text-xs tracking-widest text-muted-foreground md:px-12">
        <div className="flex items-center justify-end">
          <span>© 2026 NONOISE MEDIA</span>
        </div>
      </footer>
    </main>
  )
}
