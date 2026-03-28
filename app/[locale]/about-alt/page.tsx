"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Quote, Check, Film, Clapperboard, Camera, ChevronDown, Target, Users, Fingerprint } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Link } from "@/i18n/navigation"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const gridImages = Array.from(
  { length: 30 },
  (_, i) => `https://assets.nonoise.media/about/collage${i + 1}.png`
)

const gridItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.floor(i / 6) * 0.2,
      duration: 0.8,
      ease: cinematicEase,
    },
  }),
}

function Hero() {
  return (
    <section className="relative min-h-screen px-6 pb-10 pt-28 md:px-12 md:pb-12 md:pt-32 lg:pt-36">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-6">
        {/* Left — typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="flex flex-col md:col-span-6 md:min-h-[calc(100svh-11rem)] lg:col-span-7"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
            Produkcja Filmowa i Wideo
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            WYBIJ SIĘ
            <br />
            PONAD SZUM
          </h1>

          <p className="mt-6 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/70 md:mt-7 md:text-base">
            Odrzucamy to, co zbędne, by skupić się na czystym, wizualnym storytellingu. Dzięki optymalizacji procesów dostarczamy jakość zarezerwowaną dotąd dla dużych domów produkcyjnych, zachowując zwinność i elastyczność. Tworzymy z myślą o Twoich celach marketingowych.
          </p>

        </motion.div>

        {/* Right — photo grid */}
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
                className="aspect-square overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover grayscale opacity-70 transition-all duration-[2000ms] ease-out hover:grayscale-0 hover:opacity-100 hover:duration-[50ms]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-10">
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
    </section>
  )
}

// ---------------------------------------------------------------------------
// Features — "Trzy filary precyzyjnych mediów"
// ---------------------------------------------------------------------------

function Features() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mb-12 md:mb-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Co dostarczamy
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          NASZA OFERTA
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

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
}

// — Card 1: Shuffling stack
const CARDS_DATA = [
  { 
    label: "Analiza marki", 
    icon: Fingerprint, 
    status: "w trakcie" // Replaces active: true
  }, 
  { 
    label: "Grupa docelowa", 
    icon: Users, 
    status: "oczekujące" // Replaces active: false
  },     
  { 
    label: "Cele biznesowe", 
    icon: Target, 
    status: "oczekujące" // Replaces active: false
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

// — Card 2: Terminal typewriter
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
        Bezproblemowa realizacja od koncepcji kreatywnej, przez profesjonalną
        produkcję, aż po finalne dostarczenie materiałów.
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
            <span className="mr-2 text-foreground/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            {line}
          </p>
        ))}
        <p className="overflow-hidden whitespace-nowrap font-mono text-[11px] leading-relaxed text-foreground/80">
          <span className="mr-2 text-foreground/20">
            {String(lines.length + 1).padStart(2, "0")}
          </span>
          {PIPELINE_MESSAGES[currentMsg].slice(0, currentChar)}
          <span className="ml-0.5 inline-block h-[13px] w-[6px] animate-pulse bg-foreground" />
        </p>
      </div>
    </div>
  )
}

// — Card 3: Cursor scheduler
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
        03 / Strategiczna dystrybujca
      </p>
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
        Media nastawione na konwersję
      </h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/50">
        Cyfrowe materiały, które zatrzymują scroll — zaprojektowane by angażować,
        budować zaufanie i maksymalizować ROI z marketingu.
      </p>

      <div ref={gridRef} className="relative min-h-[160px] flex-1">
        <div className="mb-2 grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => (
            <div
              key={`header-${i}`}
              className="text-center font-mono text-[10px] uppercase text-muted-foreground"
            >
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
                {activeDays.includes(i)
                  ? "✓"
                  : String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <button
          data-save
          className={`w-full border py-2.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] transition-all duration-300 ${
            saved
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/10 bg-secondary text-foreground/50"
          }`}
        >
          {saved ? "Opublikowano ✓" : "Publikuj harmonogram"}
        </button>

        {cursorVisible && (
          <svg
            className="pointer-events-none absolute z-10"
            style={{
              left: cursorPos.x - 4,
              top: cursorPos.y - 2,
              transform: pressing ? "scale(0.85)" : "scale(1)",
              transition:
                "left 0.5s ease-out, top 0.5s ease-out, transform 0.15s ease",
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
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Philosophy — "Skupiamy się na poruszaniu ludzi"
// ---------------------------------------------------------------------------

function Philosophy() {
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

      <div className="relative z-10 max-w-[70rem] mx-auto">
        <WordRevealBlock
          text="Większość mediów skupia się na: ładnym wyglądzie."
          className="font-sans text-xl text-foreground/30 tracking-tight md:text-3xl lg:text-4xl"
        />

        <div className="mt-8 md:mt-12">
          <WordRevealBlock
            text="My skupiamy się na:"
            className="font-sans text-2xl text-foreground tracking-tight md:text-4xl lg:text-5xl"
          />
          <div className="mt-2 md:mt-4">
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
                className="mr-[0.3em] inline-block font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] tracking-[0.02em] text-foreground md:text-8xl lg:text-[10rem]"
              >
                PORUSZANIU
              </motion.span>
              <motion.span
                variants={wordFade}
                className="inline-block font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] tracking-[0.02em] text-foreground/50 md:text-8xl lg:text-[10rem]"
              >
                LUDZI.
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 max-w-lg md:mt-20">
          <WordRevealBlock
            text="Każda klatka ma zadanie. Każde cięcie ma cel. Nie tworzymy kontentu — projektujemy reakcje emocjonalne."
            className="font-sans text-sm leading-relaxed text-foreground/30 md:text-base"
          />
        </div>
      </div>
    </section>
  )
}

const wordFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase },
  },
}

function WordRevealBlock({
  text,
  className,
}: {
  text: string
  className: string
}) {
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
        <motion.span
          key={i}
          variants={wordFade}
          className={`mr-[0.3em] inline-block ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Protocol — "Nasz proces" (stacking cards)
// ---------------------------------------------------------------------------

function ConcentricCircles() {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 md:right-12">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="md:h-[300px] md:w-[300px]"
        style={{ animation: "spin 30s linear infinite" }}
      >
        {[30, 50, 70, 90].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/30"
          />
        ))}
        <circle cx="100" cy="100" r="4" fill="currentColor" className="text-foreground/30" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" className="text-foreground/20" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-foreground/20" />
      </svg>
    </div>
  )
}

function LaserGrid() {
  const dots = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 12; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={20 + c * 22}
          cy={20 + r * 22}
          r="2"
          fill="currentColor"
          className="text-foreground/15"
        />
      )
    }
  }

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 overflow-hidden opacity-30 md:right-12">
      <svg
        width="280"
        height="160"
        viewBox="0 0 280 160"
        className="md:h-[180px] md:w-[340px]"
      >
        {dots}
      </svg>
    </div>
  )
}

function EKGWaveform() {
  const path =
    "M0,50 L30,50 L35,50 L40,20 L45,80 L50,10 L55,60 L60,50 L90,50 L95,50 L100,20 L105,80 L110,10 L115,60 L120,50 L150,50 L155,50 L160,20 L165,80 L170,10 L175,60 L180,50 L210,50 L240,50"

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 md:right-12">
      <svg
        width="240"
        height="80"
        viewBox="0 0 240 80"
        className="md:h-[100px] md:w-[340px]"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/40"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{ animation: "ekgDash 2.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  )
}

const STEPS = [
  {
    num: "01",
    title: "ODKRYWAMY",
    desc: "Analizujemy Twoją markę, grupę docelową i cele, zanim zaplanujemy choćby jedną klatkę. Strategia zawsze na pierwszym miejscu.",
    Visual: ConcentricCircles,
  },
  {
    num: "02",
    title: "PRODUKUJEMY",
    desc: "Od scenariusza po ekran — reżyserujemy, nagrywamy i zarządzamy bez tarcia. Twoja wizja, nasza realizacja.",
    Visual: LaserGrid,
  },
  {
    num: "03",
    title: "DOSTARCZAMY",
    desc: "Gotowe materiały zoptymalizowane pod każdą platformę, format i punkt konwersji. Gotowe do działania.",
    Visual: EKGWaveform,
  },
]

function Protocol() {
  return (
    <section className="relative">
      <div className="px-6 py-16 md:px-12 md:py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Nasz proces
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          ZBUDOWANY
          <br />
          NA PROTOKOLE
        </h2>
      </div>

      {STEPS.map((step, i) => (
        <div
          key={step.num}
          className="sticky top-0 flex h-[100dvh] w-full items-center"
          style={{ zIndex: i + 1 }}
        >
          <div
            className={`flex h-full w-full items-center px-6 md:px-12 ${
              i % 2 === 0 ? "bg-background" : "bg-card"
            }`}
          >
            <div className="relative mx-auto w-full max-w-[90rem]">
              <div className="max-w-xl">
                <span className="mb-4 block font-mono text-sm tracking-[0.1em] text-foreground/50 md:text-base">
                  {step.num}
                </span>
                <h3 className="mb-6 font-[family-name:var(--font-display)] text-5xl uppercase tracking-[0.02em] text-foreground md:text-7xl lg:text-8xl">
                  {step.title}
                </h3>
                <p className="max-w-md font-sans text-base leading-relaxed text-foreground/40 md:text-lg">
                  {step.desc}
                </p>
              </div>
              <step.Visual />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pricing — "Wybierz formę współpracy"
// ---------------------------------------------------------------------------

const TIERS = [
  {
    name: "ESSENTIAL",
    tagline: "Pojedynczy projekt",
    price: "Od 10 000 PLN",
    features: [
      "Jeden kinowy materiał wideo",
      "Kierownictwo kreatywne i koncepcja",
      "Profesjonalna ekipa i sprzęt",
      "Postprodukcja i korekcja kolorów",
      "2 rundy poprawek",
      "Dostawa we wszystkich formatach",
    ],
    cta: "Rozpocznij projekt",
    highlighted: false,
  },
  {
    name: "PERFORMANCE",
    tagline: "Abonament miesięczny",
    price: "Od 25 000 PLN/mies.",
    features: [
      "4 dni produkcyjne miesięcznie",
      "Dedykowany dyrektor kreatywny",
      "Pełen pakiet postprodukcji",
      "Materiały social media i optymalizacja",
      "Priorytetowe terminy",
      "Dashboard analityczny",
      "Nieograniczone poprawki",
    ],
    cta: "Umów rozmowę",
    highlighted: true,
  },
  {
    name: "ENTERPRISE",
    tagline: "Partnerstwo na miarę",
    price: "Wycena indywidualna",
    features: [
      "Nieograniczony zakres produkcji",
      "Integracja z Twoim zespołem",
      "Strategia kampanii wielokanałowej",
      "Dashboard projektu w czasie rzeczywistym",
      "Wsparcie priorytetowe 24/7",
      "Kwartalne przeglądy strategiczne",
      "Dedykowany opiekun klienta",
    ],
    cta: "Skontaktuj się",
    highlighted: false,
  },
]

function Pricing() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mb-12 text-center md:mb-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Inwestycja
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
          WYBIERZ FORMĘ
          <br />
          WSPÓŁPRACY
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
        className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3"
      >
        {TIERS.map((tier) => (
          <motion.div
            key={tier.name}
            variants={cardReveal}
            className={`flex flex-col p-8 md:p-10 ${
              tier.highlighted
                ? "bg-foreground text-background ring-1 ring-foreground md:scale-105"
                : "border border-foreground/10 bg-card text-foreground"
            }`}
          >
            <p
              className={`mb-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
                tier.highlighted ? "text-background/50" : "text-muted-foreground"
              }`}
            >
              {tier.tagline}
            </p>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em]">
              {tier.name}
            </h3>

            <p className="mb-8 font-[family-name:var(--font-display)] text-3xl tracking-[0.02em] md:text-4xl">
              {tier.price}
            </p>

            <ul className="mb-10 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      tier.highlighted ? "text-background/60" : "text-foreground/40"
                    }`}
                  />
                  <span
                    className={`font-sans text-sm leading-relaxed ${
                      tier.highlighted ? "text-background/70" : "text-foreground/50"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`block w-full border py-4 text-center font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] transition-colors duration-300 ${
                tier.highlighted
                  ? "border-background/30 text-background hover:bg-background/10"
                  : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

const TESTIMONIALS = [
  {
    text: "Doskonale odnajdują się w specyfice pracy z klientem korporacyjnym, łącząc wysoką estetykę nagrań z dyskrecją i szybkim czasem realizacji. Pełne zrozumienie biznesowych potrzeb klienta.",
    author: "Martyna Mayer, Senior Project Manager, DE Group",
  },
  {
    text: "Nasza branża wymagała pracy w trudnych warunkach plenerowych i uchwycenia dynamicznej akcji. Nonoise Media wykazało się najwyższym profesjonalizmem, kreatywnością i perfekcją techniczną.",
    author: "Micheal MacDonald, Właściciel, Big Air Kite Center",
  },
  {
    text: "Zrealizowali dla nas szereg spotów reklamowych oraz produkcji wizerunkowych. Wszystkie projekty zostały wykonane z najwyższą starannością, terminowo i wysoce profesjonalnie.",
    author: "Marcin Jurasz, Marketing Manager, 7 Anna Group",
  },
]

function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.08 },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: cinematicEase },
    },
  }

  return (
    <section className="px-6 pb-32 pt-4 md:px-12 md:pb-32 md:pt-6">
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-6">
        <div className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.03em] text-foreground md:text-5xl">
            REFERENCJE
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          variants={containerVariants}
          className="col-span-12 grid grid-cols-1 gap-12 md:col-span-9 md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.blockquote
              key={testimonial.author}
              variants={itemVariants}
              className="border-t border-white/20 pt-6"
            >
              <Quote
                className="mb-4 h-4 w-4 text-foreground/40"
                strokeWidth={1.5}
              />
              <p className="text-pretty font-sans text-base leading-relaxed text-foreground/90">
                {testimonial.text}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              <p className="mt-6 text-sm text-foreground/60">
                {testimonial.author}
              </p>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page Assembly
// ---------------------------------------------------------------------------

export default function AboutAltPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Testimonials />
      <Pricing />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
