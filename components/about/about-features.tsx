"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Target, Users, Fingerprint } from "lucide-react"
import { cardReveal } from "./constants"

export function AboutFeatures() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mb-12 md:mb-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Jak pracujemy
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          PRZEKUWAMY WIZJĘ W REALNE WYNIKI
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        <motion.div variants={cardReveal}>
          <DiagnosticShuffler />
        </motion.div>
        <motion.div variants={cardReveal}>
          <TelemetryTypewriter />
        </motion.div>
        <motion.div variants={cardReveal}>
          <CursorScheduler />
        </motion.div>
      </motion.div>
    </section>
  )
}

const CARDS_DATA = [
  {
    label: "Analiza marki",
    icon: Fingerprint,
    status: "w trakcie",
  },
  {
    label: "Grupa docelowa",
    icon: Users,
    status: "oczekujące",
  },
  {
    label: "Cele biznesowe",
    icon: Target,
    status: "oczekujące",
  },
]

function DiagnosticShuffler() {
  const [stack, setStack] = useState([0, 1, 2])

  const cycle = useCallback(() => {
    setStack((prev) => {
      const next = [...prev]
      next.push(next.shift()!)
      return next
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(cycle, 3000)
    return () => clearInterval(interval)
  }, [cycle])

  return (
    <div className="flex h-full flex-col border border-foreground/10 bg-card p-6 md:p-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        01 / zrozumienie klienta
      </p>
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
        Odkrywamy Twoje potrzeby
      </h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/50">
        Analizujemy Twoją markę, grupę docelową i cele, zanim zaplanujemy choćby jedną klatkę. Strategia zawsze na pierwszym miejscu.
      </p>

      <div className="relative min-h-[160px] flex-1">
        {stack.map((cardIdx, position) => {
          const card = CARDS_DATA[cardIdx]
          const Icon = card.icon
          const yOffset = position * 14
          const scale = 1 - position * 0.04
          const opacity = 1 - position * 0.25

          return (
            <div
              key={card.label}
              className="absolute left-0 right-0 flex items-center gap-4 border border-foreground/10 bg-secondary p-4"
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                zIndex: 3 - position,
                opacity,
                transition:
                  "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center border border-foreground/10 bg-background">
                <Icon size={18} className="text-foreground/70" />
              </div>
              <div>
                <span className="font-sans text-sm font-semibold tracking-tight text-foreground">
                  {card.label}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
                  {card.status}
                </span>
              </div>
              <div className="ml-auto h-2 w-2 bg-foreground" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const PIPELINE_MESSAGES = [
  "Brief kreatywny ──── zatwierdzony",
  "Rozwój koncepcji ─────── w toku",
  "Storyboard v2 ──────── zamknięty",
  "Reżyseria sceny 01 ──── nagrywanie",
  "Montaż ───────────── gotowy",
  "Projekt dźwięku ──────── miks",
  "Master koloru ───── renderowanie",
  "Assety kampanii ──────── ONLINE",
]

function TelemetryTypewriter() {
  const [lines, setLines] = useState<string[]>([])
  const [currentMsg, setCurrentMsg] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const msg = PIPELINE_MESSAGES[currentMsg]
    if (currentChar < msg.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1)
      }, 25 + Math.random() * 15)
      return () => clearTimeout(timeout)
    }

    const pause = setTimeout(() => {
      setLines((prev) => {
        const next = [...prev, msg]
        if (next.length > 6) next.shift()
        return next
      })
      setCurrentChar(0)
      setCurrentMsg((m) => (m + 1) % PIPELINE_MESSAGES.length)
    }, 800)

    return () => clearTimeout(pause)
  }, [currentChar, currentMsg])

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [lines, currentChar])

  return (
    <div className="flex h-full flex-col border border-foreground/10 bg-card p-6 md:p-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        02 / Produkcja od A do Z
      </p>
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
        Kompletny pipeline produkcyjny
      </h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/50">
        Bezproblemowa realizacja od koncepcji kreatywnej, przez profesjonalną produkcję, aż po finalne dostarczenie materiałów.
      </p>

      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse bg-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70">
          Twój projekt
        </span>
      </div>

      <div
        ref={feedRef}
        className="min-h-[140px] flex-1 overflow-hidden border border-foreground/10 bg-background p-4"
      >
        {lines.map((line, i) => (
          <p
            key={`${line}-${i}`}
            className="overflow-hidden whitespace-nowrap font-mono text-[11px] leading-relaxed text-foreground/40"
          >
            <span className="mr-2 text-foreground/20">{String(i + 1).padStart(2, "0")}</span>
            {line}
          </p>
        ))}
        <p className="overflow-hidden whitespace-nowrap font-mono text-[11px] leading-relaxed text-foreground/80">
          <span className="mr-2 text-foreground/20">{String(lines.length + 1).padStart(2, "0")}</span>
          {PIPELINE_MESSAGES[currentMsg].slice(0, currentChar)}
          <span className="ml-0.5 inline-block h-[13px] w-[6px] animate-pulse bg-foreground" />
        </p>
      </div>
    </div>
  )
}

const DAYS = ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"]
const ACTIVATE_SEQUENCE = [1, 3, 5]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function CursorScheduler() {
  const [activeDays, setActiveDays] = useState<number[]>([])
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [step, setStep] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  const getCellCenter = useCallback((index: number) => {
    if (!gridRef.current) return { x: 50, y: 50 }
    const cells = gridRef.current.querySelectorAll("[data-cell]")
    const cell = cells[index] as HTMLElement
    if (!cell) return { x: 50, y: 50 }
    const grid = gridRef.current.getBoundingClientRect()
    const rect = cell.getBoundingClientRect()
    return {
      x: rect.left - grid.left + rect.width / 2,
      y: rect.top - grid.top + rect.height / 2,
    }
  }, [])

  const getSaveCenter = useCallback(() => {
    if (!gridRef.current) return { x: 200, y: 200 }
    const btn = gridRef.current.querySelector("[data-save]") as HTMLElement
    if (!btn) return { x: 200, y: 200 }
    const grid = gridRef.current.getBoundingClientRect()
    const rect = btn.getBoundingClientRect()
    return {
      x: rect.left - grid.left + rect.width / 2,
      y: rect.top - grid.top + rect.height / 2,
    }
  }, [])

  useEffect(() => {
    if (animating.current) return
    animating.current = true

    const runSequence = async () => {
      await delay(600)
      setCursorVisible(true)

      for (const dayIdx of ACTIVATE_SEQUENCE) {
        const pos = getCellCenter(dayIdx)
        setCursorPos(pos)
        await delay(500)
        setPressing(true)
        await delay(150)
        setPressing(false)
        setActiveDays((prev) => [...prev, dayIdx])
        await delay(400)
      }

      const savePos = getSaveCenter()
      setCursorPos(savePos)
      await delay(500)
      setPressing(true)
      await delay(150)
      setPressing(false)
      setSaved(true)
      await delay(1500)

      setCursorVisible(false)
      await delay(800)
      setActiveDays([])
      setSaved(false)
      animating.current = false
      setStep((s) => s + 1)
    }

    runSequence()
  }, [step, getCellCenter, getSaveCenter])

  return (
    <div className="flex h-full flex-col border border-foreground/10 bg-card p-6 md:p-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        03 / Strategiczna dystrybucja
      </p>
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
        Media nastawione na konwersję
      </h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/50">
        Cyfrowe materiały, które zatrzymują scroll — zaprojektowane by angażować, budować zaufanie i maksymalizować ROI z marketingu.
      </p>

      <div ref={gridRef} className="relative min-h-[160px] flex-1">
        <div className="mb-2 grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => (
            <div key={`header-${i}`} className="text-center font-mono text-[10px] uppercase text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-7 gap-2">
          {DAYS.map((_, i) => (
            <div
              key={`cell-${i}`}
              data-cell
              className={`flex aspect-square items-center justify-center border transition-all duration-300 ${
                activeDays.includes(i)
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/10 bg-secondary text-foreground/30"
              }`}
            >
              <span className="font-mono text-[10px]">
                {activeDays.includes(i) ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <button
          data-save
          type="button"
          className={`w-full border py-2.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] transition-all duration-300 ${
            saved
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/10 bg-secondary text-foreground/50"
          }`}
        >
          {saved ? "Opublikowano ✓" : "Publikuj harmonogram"}
        </button>

        {cursorVisible ? (
          <svg
            className="pointer-events-none absolute z-10"
            style={{
              left: cursorPos.x - 4,
              top: cursorPos.y - 2,
              transform: pressing ? "scale(0.85)" : "scale(1)",
              transition: "left 0.5s ease-out, top 0.5s ease-out, transform 0.15s ease",
            }}
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M4 0L4 17L8 13L12.5 21L15 19.5L10.5 12L16 11L4 0Z"
              fill="currentColor"
              stroke="var(--background)"
              strokeWidth="1.5"
              className="text-foreground"
            />
          </svg>
        ) : null}
      </div>
    </div>
  )
}
