"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cinematicEase } from "@/components/about/constants"

type ProcessStep = { step: string; title: string; text: string }

/**
 * How the studio works, as three plain steps. The /about page tells the same
 * story with animated demo cards; a paid visitor gets the content without the
 * mock interface.
 */
export function LpProcess() {
  const t = useTranslations("lp.kampania")
  const steps = t.raw("process") as ProcessStep[]

  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-28">
      <div className="mb-10 md:mb-14">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("processLabel")}
        </p>
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl md:text-6xl">
          {t("processTitle")}
        </h2>
      </div>

      <ol className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {steps.map((item, i) => (
          <motion.li
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: cinematicEase }}
            className="border-t border-white/20 pt-5 md:col-span-4"
          >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.step}</p>
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] text-foreground md:text-3xl">
              {item.title}
            </h3>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/60">{item.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
