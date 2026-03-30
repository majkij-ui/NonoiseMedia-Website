"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { wordFade } from "./constants"

export function AboutPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-32 md:px-12 md:py-48"
    >
      <motion.img
        src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=1920&q=80"
        alt=""
        className="pointer-events-none absolute inset-0 -top-[15%] h-[130%] w-full object-cover opacity-[0.06]"
        style={{ y: imgY }}
        loading="lazy"
      />

      <div className="relative z-10 mx-auto max-w-[70rem]">
        <WordRevealBlock
          text="Większość produkcji ma po prostu dobrze wyglądać."
          className="font-mono text-xl tracking-tight text-foreground/25 md:text-3xl lg:text-4xl"
        />

        <div className="mt-6 md:mt-10">
          <WordRevealBlock
            text="Nasze mają za zadanie"
            className="font-mono text-2xl tracking-tight text-foreground/60 md:text-4xl lg:text-5xl"
          />
          <div className="mt-6 md:mt-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.span
                variants={wordFade}
                className="mr-[0.3em] inline-block font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.9] tracking-[0.02em] text-foreground/70 sm:text-5xl md:text-8xl lg:text-[10rem]"
              >
                skłaniać
              </motion.span>
              <motion.span
                variants={wordFade}
                className="inline-block font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.9] tracking-[0.02em] text-foreground sm:text-5xl md:text-8xl lg:text-[10rem]"
              >
                do działania.
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="mt-4 max-w-lg md:mt-6">
          <WordRevealBlock
            text="Każda klatka ma zadanie. Każde cięcie ma cel. Nie tworzymy kontentu — projektujemy reakcje emocjonalne."
            className="font-sans text-sm leading-relaxed text-foreground/30 md:text-base"
          />
        </div>
      </div>
    </section>
  )
}

function WordRevealBlock({ text, className }: { text: string; className: string }) {
  const words = text.split(" ")

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordFade} className={`mr-[0.3em] inline-block ${className}`}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
