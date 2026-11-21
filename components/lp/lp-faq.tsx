"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { sendGTMEvent } from "@/lib/gtm"
import { cinematicEase } from "@/components/about/constants"

type FaqItem = { q: string; a: string }

const openEase = [0.76, 0, 0.24, 1] as const

/**
 * The questions clients ask in their first emails, answered before the form.
 * Answers are the owner's approved positions (TODO.md 2.5); the one on
 * copyright still needs a lawyer's read.
 */
export function LpFaq() {
  const t = useTranslations("lp.kampania")
  const items = t.raw("faq") as FaqItem[]
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    if (openIndex !== index) sendGTMEvent("lp_faq_open", { question: index + 1 })
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="border-t border-white/20 bg-surface px-6 py-20 md:px-12 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="md:col-span-4"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t("faqLabel")}</p>
          <h2 className="max-w-xs font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl md:text-6xl">
            {t("faqTitle")}
          </h2>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8, delay: 0.1, ease: cinematicEase }}
          className="border-b border-white/20 md:col-span-7 md:col-start-6"
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const answerId = `${baseId}-answer-${index}`
            return (
              <li key={item.q} className="border-t border-white/20">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left outline-none focus-visible:ring-1 focus-visible:ring-foreground md:py-6"
                  >
                    <span className="font-[family-name:var(--font-display)] text-xl uppercase leading-tight tracking-[0.02em] text-foreground md:text-2xl">
                      {item.q}
                    </span>
                    <Plus
                      aria-hidden
                      size={20}
                      strokeWidth={1.5}
                      className={`shrink-0 text-foreground/60 transition-transform duration-500 group-hover:text-foreground ${
                        isOpen ? "rotate-[135deg]" : ""
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: openEase }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-foreground/70 md:pb-7 md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
