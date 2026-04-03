"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Play } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Navigation } from "@/components/navigation"
import type { ServicePageData } from "@/lib/service-pages"
import type { Project } from "@/lib/projects"

// ---------------------------------------------------------------------------
// Shared animation constants (match site-wide cinematic style)
// ---------------------------------------------------------------------------

const cinematicEase = [0.25, 0.1, 0.25, 1] as const
const revealEase = [0.16, 1, 0.3, 1] as const

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type Props = {
  data: ServicePageData
  project?: Project
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════

function Hero({ data }: { data: ServicePageData }) {
  const { hero } = data

  return (
    <section className="relative px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-10 lg:col-span-8">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6"
          >
            {hero.label}
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: cinematicEase }}
            className="whitespace-pre-line font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.92] tracking-[0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {hero.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: cinematicEase }}
            className="mt-6 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/70 md:mt-8 md:text-base"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: cinematicEase }}
            className="mt-8 md:mt-10"
          >
            <Link
              href="/contact"
              className="inline-block border border-foreground/20 px-10 py-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              {hero.ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// BENEFITS — 3 cards (matches about-features pattern)
// ═══════════════════════════════════════════════════════════════════════════

function Benefits({ data }: { data: ServicePageData }) {
  const { benefits } = data

  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="mb-12 md:mb-20"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
          {benefits.sectionLabel}
        </p>
        <h2 className="max-w-3xl whitespace-pre-line font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          {benefits.sectionHeadline}
        </h2>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-3"
      >
        {benefits.items.map((item) => (
          <motion.div
            key={item.label}
            variants={cardReveal}
            whileHover={{ y: -4 }}
            className="group border border-foreground/10 bg-background p-8 transition-colors duration-300 hover:bg-foreground hover:text-background md:p-10"
          >
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-background/50">
              {item.label}
            </p>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground transition-colors duration-300 group-hover:text-background md:text-2xl">
              {item.title}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-foreground/50 transition-colors duration-300 group-hover:text-background/60">
              {item.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS — numbered steps (editorial grid layout)
// ═══════════════════════════════════════════════════════════════════════════

function Process({ data }: { data: ServicePageData }) {
  const { process } = data

  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="mb-16 md:mb-24"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
          {process.sectionLabel}
        </p>
        <h2 className="max-w-3xl whitespace-pre-line font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          {process.sectionHeadline}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        {process.steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: cinematicEase,
            }}
            className="border-t border-foreground/10 pt-8"
          >
            <span className="mb-4 block font-[family-name:var(--font-display)] text-6xl leading-none tracking-[0.02em] text-foreground/10 md:text-7xl">
              {step.number}
            </span>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground md:text-2xl">
              {step.title}
            </h3>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/50 md:text-base">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CASE STUDY — featured project (matches /work card pattern)
// ═══════════════════════════════════════════════════════════════════════════

function CaseStudy({ data, project }: { data: ServicePageData; project: Project | undefined }) {
  if (!project) return null
  const { caseStudy } = data

  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="mb-12 md:mb-20"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
          {caseStudy.sectionLabel}
        </p>
        <h2 className="max-w-3xl whitespace-pre-line font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          {caseStudy.sectionHeadline}
        </h2>
      </motion.div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: revealEase }}
          className="w-full lg:w-3/5"
        >
          <div className="group relative overflow-hidden">
            <motion.div whileHover="hover">
              <motion.div
                variants={{ hover: { scale: 1.03 } }}
                transition={{ duration: 0.6, ease: cinematicEase }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="h-auto w-full object-cover"
                />
              </motion.div>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-background/0"
                variants={{ hover: { backgroundColor: "rgba(0,0,0,0.18)" } }}
                transition={{ duration: 0.35 }}
              />
              {project.video && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                  variants={{
                    hover: { opacity: 1, scale: 1 },
                    initial: { opacity: 0.65, scale: 0.96 },
                  }}
                  initial="initial"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/35 text-white backdrop-blur-sm">
                    <Play size={20} fill="currentColor" />
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.75, delay: 0.08, ease: revealEase }}
          className="flex w-full flex-col justify-center lg:w-2/5"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {`Klient: ${project.client}`}
          </p>

          <h3 className="mb-3 font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.02em] text-foreground md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 md:text-sm">
            {project.subtitle}
          </p>

          <div className="mb-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              WYZWANIE:
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/70 md:text-base">
              {project.challenge}
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              ROZWIĄZANIE:
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/70 md:text-base">
              {project.solution}
            </p>
          </div>

          <Link
            href="/work"
            className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            {caseStudy.linkText}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ — accordion (Framer Motion, no Radix dependency)
// ═══════════════════════════════════════════════════════════════════════════

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: cinematicEase }}
      className="border-b border-foreground/10"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left md:py-8"
      >
        <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.02em] text-foreground md:text-xl">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: cinematicEase }}
          className="shrink-0 text-foreground/40"
        >
          <ChevronDown size={20} strokeWidth={1.4} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: cinematicEase }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-sans text-sm leading-relaxed text-foreground/50 md:max-w-2xl md:pb-8 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Faqs({ data }: { data: ServicePageData }) {
  const { faqs } = data

  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Left — section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="md:col-span-4"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
            {faqs.sectionLabel}
          </p>
          <h2 className="whitespace-pre-line font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-5xl lg:text-6xl">
            {faqs.sectionHeadline}
          </h2>
        </motion.div>

        {/* Right — accordion */}
        <div className="md:col-span-8">
          <div className="border-t border-foreground/10">
            {faqs.items.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CTA STRIP — bottom conversion section
// ═══════════════════════════════════════════════════════════════════════════

function CtaStrip({ data }: { data: ServicePageData }) {
  const { cta } = data

  return (
    <section className="border-t border-foreground/10 px-6 py-24 md:px-12 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="whitespace-pre-line font-[family-name:var(--font-display)] text-3xl uppercase leading-[0.92] tracking-[0.02em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {cta.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-foreground/50 md:mt-8 md:text-base">
          {cta.body}
        </p>
        <div className="mt-8 md:mt-10">
          <Link
            href="/contact"
            className="inline-block border border-foreground/20 px-12 py-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            {cta.buttonText}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════════

export function ServiceLandingClient({ data, project }: Props) {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <Hero data={data} />
      <Benefits data={data} />
      <Process data={data} />
      {project && <CaseStudy data={data} project={project} />}
      <Faqs data={data} />
      <CtaStrip data={data} />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
