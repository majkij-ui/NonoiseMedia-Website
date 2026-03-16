"use client"

import { type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const contactEmail = "contact@nonoise.media"
  const contactPhoneDisplay = "tel. 882 111 288"
  const contactPhoneHref = "tel:+48882111288"
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
    <main className="min-h-screen w-full bg-background text-foreground">
      <Navigation fixed />

      <div className="px-6 pb-16 pt-[calc(6.5rem+env(safe-area-inset-top))] md:px-12 md:pt-24 lg:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-10">
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="md:col-span-5"
          >
            <div className="flex max-w-sm flex-col gap-9">
              <motion.div variants={fadeUpVariants}>
                <span className="mb-5 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Co możemy dla Ciebie stworzyć?
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  data-gaw-contact="email-hero"
                  className="block w-fit font-[family-name:var(--font-display)] text-[2.6rem] uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 sm:text-[3.45rem]"
                >
                  {contactEmail}
                </a>
                <a
                  href={contactPhoneHref}
                  data-gaw-contact="phone-hero"
                  className="mt-2 block w-fit font-[family-name:var(--font-display)] text-[2.6rem] uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 sm:text-[3.45rem]"
                >
                  {contactPhoneDisplay}
                </a>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="space-y-4">
                <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Adres
                </span>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block max-w-xs border-b border-white/20 pb-2 text-sm leading-relaxed text-foreground/90 transition-colors hover:border-white/60 hover:text-foreground"
                >
                  Za olszyną 13B/2
                  <br />
                  05-090 Podolszyn Nowy (Warszawa)
                </a>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                variants={fadeUpVariants}
                className="flex flex-col gap-6 pt-1"
              >
                <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Formularz kontaktowy
                </span>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Imię
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-b border-white/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="Twoje imię"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-b border-white/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="twoj@email.pl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="resize-none border-b border-white/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white"
                    placeholder="Opowiedz nam o swoim projekcie..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="group relative w-fit overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[1.95rem] uppercase leading-none tracking-[0.02em] text-background"
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
                    Zapytaj o wycenę
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="md:col-start-7 md:col-span-6 md:pt-9"
          >
            <motion.div variants={fadeUpVariants}>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-square min-h-[400px] w-full overflow-hidden border border-white/20 md:min-h-[520px]">
                  <img
                    src="/warsaw-map.png"
                    alt="Mapa Warszawy"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/warsaw-map.jpg"
                    }}
                  />
                </div>
              </a>
            </motion.div>
          </motion.section>
        </div>
      </div>

      <footer className="border-t border-white/10 px-6 py-6 text-xs tracking-widest text-muted-foreground md:px-12">
        <div className="flex items-center justify-end">
          <span>© 2026 NONOISE MEDIA</span>
        </div>
      </footer>
    </main>
  )
}
