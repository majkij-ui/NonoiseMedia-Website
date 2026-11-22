"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useTranslations } from "next-intl"
import { cinematicEase } from "@/components/about/constants"
import { landingPageTestimonials, type Testimonial } from "@/lib/testimonials"

/**
 * Client quotes as compact cards, three to a row. The landing page shows the
 * three picked for it; /about passes the whole list.
 */
export function LpTestimonials({ items = landingPageTestimonials }: { items?: Testimonial[] }) {
  const t = useTranslations("lp.kampania")

  return (
    <section className="bg-surface px-6 py-20 md:px-12 md:py-28">
      <div className="mb-10 md:mb-14">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("testimonialsLabel")}
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl md:text-6xl">
          {t("testimonialsTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
        {items.map((item, i) => (
          <motion.figure
            key={item.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: cinematicEase }}
            className="flex flex-col border-t border-white/20 pt-5 md:col-span-4"
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">{item.company}</p>
            <Quote className="mb-3 h-4 w-4 text-foreground/25" strokeWidth={1.2} />
            <blockquote
              lang={item.lang}
              className="mb-6 max-w-sm font-sans text-sm leading-relaxed text-foreground/70 md:text-[15px]"
            >
              {item.text}
            </blockquote>
            <figcaption className="mt-auto">
              <p className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.02em] text-foreground">
                {item.author}
              </p>
              {item.role ? (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{item.role}</p>
              ) : null}
              {item.pendingConsent ? (
                <p className="mt-3 w-fit border border-amber-400/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300">
                  {t("testimonialDraft")}
                </p>
              ) : null}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
