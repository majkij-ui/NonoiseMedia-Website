"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cinematicEase, gridImages, gridItemVariant } from "./constants"

const defaultLabel = "Produkcja Filmowa i Wideo Dla Biznesu"
const defaultBody =
  "Jesteśmy polskim studiem produkcyjnym, realizującym projekty wideo od A do Z. Tworzymy wysokiej klasy filmy korporacyjne, wideo produktowe oraz angażujące spoty do kampanii reklamowych. Odpowiadamy również na dzisiejsze tempo rynku, dostarczając dynamiczny, krótki kontent na social media, który realnie wspiera sprzedaż."

export type AboutHeroProps = {
  label?: string
  headline?: ReactNode
  body?: string
  /** Renders below the body paragraph (e.g. campaign CTAs). */
  footerSlot?: ReactNode
  showScrollCue?: boolean
  /**
   * When true (default), the left column uses min-height ~ viewport so the layout matches the About page.
   * Set false when extra actions are added so the hero stays compact and stays in view.
   */
  fillViewportColumn?: boolean
}

export function AboutHero({
  label = defaultLabel,
  headline = (
    <>
      WYBIJ SIĘ
      <br />
      PONAD SZUM
    </>
  ),
  body = defaultBody,
  footerSlot,
  showScrollCue = true,
  fillViewportColumn = true,
}: AboutHeroProps) {
  return (
    <section className="relative px-6 pb-16 pt-28 md:min-h-screen md:px-12 md:pb-12 md:pt-32 lg:pt-36">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className={`flex flex-col md:col-span-6 lg:col-span-7 ${
            fillViewportColumn ? "md:min-h-[calc(100svh-11rem)]" : ""
          }`}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
            {label}
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            {headline}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/70 md:mt-7 md:text-base">
            {body}
          </p>

          {footerSlot ? <div className="mt-8 md:mt-10">{footerSlot}</div> : null}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="md:col-span-6 lg:col-span-5"
        >
          <div className="grid grid-cols-6 gap-2 md:gap-2.5">
            {gridImages.map((src, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={gridItemVariant}
                className="relative aspect-square overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Nonoise Media produkcja wideo - ujęcie ${i + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover grayscale opacity-70 transition-all duration-[2000ms] ease-out hover:grayscale-0 hover:opacity-100 hover:duration-[50ms]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {showScrollCue ? (
        <div className="pointer-events-none mt-10 flex justify-center md:absolute md:bottom-10 md:left-1/2 md:mt-0 md:-translate-x-1/2">
          <motion.div
            aria-label="Przewiń niżej"
            className="inline-flex flex-col items-center text-foreground/40"
          >
            <motion.span
              animate={{ opacity: [0.75, 0.25, 0.75] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="leading-none"
            >
              <ChevronDown size={18} strokeWidth={1.8} />
            </motion.span>
            <motion.span
              animate={{ opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="-mt-2 leading-none"
            >
              <ChevronDown size={18} strokeWidth={1.8} />
            </motion.span>
          </motion.div>
        </div>
      ) : null}
    </section>
  )
}
