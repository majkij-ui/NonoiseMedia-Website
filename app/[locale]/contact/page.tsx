"use client"

import { type FormEvent, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ClipboardList, Check, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PhoneNumber } from "@/components/ui/phone-number"
import { Link } from "@/i18n/navigation"

type FormStatus = "idle" | "sending" | "sent" | "error"

export default function ContactPage() {
  const contactEmail = "contact@nonoise.media"
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=Za+olszyn%C4%85+13B%2F2+05-090+Podolszyn+Nowy"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

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

  const validate = useCallback(() => {
    if (!formData.name.trim()) return "Podaj nazwę firmy lub swoje imię."
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Podaj prawidłowy adres e-mail."
    if (!formData.message.trim()) return "Wpisz treść wiadomości."
    return null
  }, [formData])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const validationError = validate()
      if (validationError) {
        setErrorMsg(validationError)
        setStatus("error")
        return
      }

      setStatus("sending")
      setErrorMsg("")

      try {
        const res = await fetch("/api/send-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()

        if (!res.ok) {
          setErrorMsg(data.error || "Nie udało się wysłać wiadomości.")
          setStatus("error")
          return
        }

        setStatus("sent")
        setFormData({ name: "", email: "", message: "" })
      } catch {
        setErrorMsg("Błąd połączenia. Sprawdź internet i spróbuj ponownie.")
        setStatus("error")
      }
    },
    [formData, validate],
  )

  return (
    <main className="flex min-h-dvh w-full flex-col bg-background text-foreground md:h-dvh md:overflow-hidden">
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
              phoneNumber="+48 882 111 288"
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

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-1 flex-col items-start justify-center gap-3"
                >
                  <div className="flex items-center gap-2 text-foreground">
                    <Check size={20} strokeWidth={2} />
                    <span className="font-mono text-sm uppercase tracking-wider">
                      Wiadomość wysłana
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60">
                    Dziękujemy! Odezwiemy się najszybciej jak to możliwe.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-1 text-sm text-foreground/40 underline underline-offset-4 transition-colors hover:text-foreground/70"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-1 flex-col gap-3"
                >
                  <input
                    id="name"
                    type="text"
                    aria-label="Nazwa firmy"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (status === "error") setStatus("idle")
                    }}
                    className="border-b border-white/20 bg-transparent py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="Nazwa Twojej Firmy"
                  />

                  <input
                    id="email"
                    type="email"
                    aria-label="Email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (status === "error") setStatus("idle")
                    }}
                    className="border-b border-white/20 bg-transparent py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="twoj@email.pl"
                  />

                  <textarea
                    id="message"
                    aria-label="Wiadomość"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (status === "error") setStatus("idle")
                    }}
                    rows={2}
                    className="flex-1 resize-none border-b border-white/20 bg-transparent py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="Treść Twojej wiadomości"
                  />

                  {status === "error" && errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  <div className="mt-auto pt-2">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative w-fit overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[1.75rem] uppercase leading-none tracking-[0.02em] text-background disabled:opacity-50 md:text-[2rem]"
                      whileHover={status !== "sending" ? "hover" : undefined}
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
                        {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
                      </span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
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
        <div className="flex items-center justify-end">
          <span>© 2026 NONOISE MEDIA</span>
        </div>
      </footer>
    </main>
  )
}
