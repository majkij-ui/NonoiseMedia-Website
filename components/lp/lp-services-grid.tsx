"use client"

import { useEffect, useEffectEvent, useId, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import {
  Building2,
  Clapperboard,
  Megaphone,
  Mic,
  Play,
  Plus,
  Share2,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { sendGTMEvent } from "@/lib/gtm"
import { ProjectVideoModal } from "@/components/project-video-modal"
import { LP_SERVICE_EXAMPLES, LP_SERVICE_IDS, type LpExample, type LpServiceId } from "@/lib/lp-services"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const
/** Slow in, slow out: the curtain. */
const curtainEase = [0.76, 0, 0.24, 1] as const
/** Fast in, long settle: lines of text arriving. */
const settleEase = [0.16, 1, 0.3, 1] as const
const plateSpring = { type: "spring" as const, stiffness: 210, damping: 30, mass: 0.9 }

/** When the dark curtain starts to rise over the expanded plate, in seconds. */
const CURTAIN_DELAY = 0.32
const CURTAIN_DURATION = 0.7
/** Panel content starts arriving while the curtain is still finishing. */
const CONTENT_DELAY = CURTAIN_DELAY + 0.4

const ICONS: Record<LpServiceId, LucideIcon> = {
  corporate: Building2,
  commercial: Megaphone,
  ai: Sparkles,
  social: Share2,
  podcast: Mic,
  event: Clapperboard,
}

type ServiceCopy = { title: string; body: string; price: string; priceNote: string; points: string[] }

const DESKTOP_QUERY = "(min-width: 48rem)"

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** False on the server and on a phone: the tiles then open in place instead of as a panel. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
}

/** Focus is inside the grid (or nowhere), so the grid may react to keys and move focus. */
function focusIsOurs(grid: HTMLElement | null) {
  const active = document.activeElement
  return !active || active === document.body || Boolean(grid?.contains(active))
}

/** One line of text rising out of a mask. */
function RevealLine({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduceMotion ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: settleEase }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeUp({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: settleEase }}
    >
      {children}
    </motion.div>
  )
}

/** A playable film still. It wipes in from the left while the picture settles from a slight zoom. */
function ExampleThumb({
  example,
  delay,
  onPlay,
  label,
  sizes,
}: {
  example: LpExample
  delay: number
  onPlay: (example: LpExample) => void
  label: string
  sizes: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(example)}
      aria-label={label}
      initial={reduceMotion ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.9, delay, ease: curtainEase }}
      className={`group/thumb relative block w-full overflow-hidden border border-white/15 bg-neutral-950 text-left ${
        example.vertical ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, delay, ease: settleEase }}
      >
        <Image src={example.image} alt="" fill sizes={sizes} className="object-cover" />
      </motion.div>
      <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover/thumb:bg-black/45" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col p-3 md:p-4">
        {/* A reel still is too narrow for the client's name; the tile already says whose it is. */}
        {example.vertical ? null : (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">{example.client}</span>
        )}
        <span
          className={`mt-1 font-[family-name:var(--font-display)] uppercase leading-tight tracking-[0.02em] text-white ${
            example.vertical ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {example.title}
        </span>
      </span>
      <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center ${example.vertical ? "h-9 w-9" : "h-12 w-12"} justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm transition-transform duration-300 group-hover/thumb:scale-110`}>
        <Play size={18} fill="currentColor" />
      </span>
    </motion.button>
  )
}

type LpServicesGridProps = {
  /** Called by "Wyceń ten format": the page preselects the service in the form and takes the visitor to it. */
  onQuote: (service: LpServiceId) => void
  /**
   * "landing": a section of its own, with heading. "page": the grid only, for a
   * page that already has a hero above it (/offer).
   */
  variant?: "landing" | "page"
}

/**
 * The offer as six tiles that open.
 *
 * Desktop: the tile's plate grows until it covers the whole grid, a dark
 * curtain rises over it and the details arrive line by line. Only the plate
 * (an empty box) is animated by layout, so no text is ever stretched.
 * Phone: the tile opens in place, like an accordion.
 */
export function LpServicesGrid({ onQuote, variant = "landing" }: LpServicesGridProps) {
  const t = useTranslations("lp.kampania")
  const isDesktop = useIsDesktop()
  const reduceMotion = useReducedMotion()
  const baseId = useId()

  /** The tile whose plate is expanded (desktop) or whose details are open (phone). */
  const [openId, setOpenId] = useState<LpServiceId | null>(null)
  /** Desktop only: the panel's content. It leaves first, then the plate shrinks back. */
  const [panelShown, setPanelShown] = useState(false)
  /** Desktop only: the plate starts white and turns dark once the curtain covers it. */
  const [plateDark, setPlateDark] = useState(false)
  const [activeExample, setActiveExample] = useState<LpExample | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const tileRefs = useRef(new Map<LpServiceId, HTMLButtonElement>())
  const lastOpenedRef = useRef<LpServiceId | null>(null)
  /** Set when the desktop panel has closed: focus goes back to its tile once the tiles are usable again. */
  const restoreFocusRef = useRef(false)
  /** True while close() is taking the desktop panel away (as opposed to a phone/desktop mode switch). */
  const closingRef = useRef(false)
  /** False for a moment after a tile opens: the panel's buttons exist before they are visible. */
  const panelArmedRef = useRef(true)
  const armTimerRef = useRef<number | undefined>(undefined)
  const scrollTimerRef = useRef<number | undefined>(undefined)

  const copy = (id: LpServiceId): ServiceCopy => t.raw(`services.${id}`) as ServiceCopy

  const open = (id: LpServiceId) => {
    lastOpenedRef.current = id
    // The panel's buttons are in place ~0.8 s before they are visible; a double-click must not hit them.
    panelArmedRef.current = false
    window.clearTimeout(armTimerRef.current)
    armTimerRef.current = window.setTimeout(() => {
      panelArmedRef.current = true
    }, 600)
    sendGTMEvent("lp_service_open", { service: id })
    setPlateDark(false)
    setOpenId(id)
    setPanelShown(true)

    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth"
    if (isDesktop) {
      // The panel takes the grid's place, so bring the whole grid into view.
      const grid = gridRef.current
      if (grid) {
        const fits = grid.getBoundingClientRect().height < window.innerHeight - 120
        grid.scrollIntoView({ behavior, block: fits ? "center" : "start" })
      }
    } else {
      // Closing another tile above moves this one; wait for the layout, then keep its header in view.
      window.clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = window.setTimeout(() => {
        const tile = tileRefs.current.get(id)
        if (!tile) return
        const top = tile.getBoundingClientRect().top
        if (top < 72 || top > window.innerHeight * 0.5) tile.scrollIntoView({ behavior, block: "start" })
      }, 420)
    }
  }

  const close = () => {
    if (isDesktop) {
      closingRef.current = true
      // Hand focus back to the tile afterwards, unless the visitor has moved on (e.g. into the form).
      restoreFocusRef.current = focusIsOurs(gridRef.current)
      // The plate is dark by the time it shrinks, so nothing flashes white.
      setPlateDark(true)
      setPanelShown(false)
    } else {
      setOpenId(null)
    }
  }

  const toggle = (id: LpServiceId) => (openId === id ? close() : open(id))

  useEffect(
    () => () => {
      window.clearTimeout(armTimerRef.current)
      window.clearTimeout(scrollTimerRef.current)
    },
    [],
  )

  /** After the panel content has left: let the plate fall back into its tile. */
  const onPanelExitComplete = () => {
    // A phone/desktop switch also removes the panel; the tile then simply stays open in the other mode.
    if (!closingRef.current) return
    closingRef.current = false
    setOpenId(null)
    setPlateDark(false)
  }

  // The tiles are inert while the panel covers them, so focus can only return after that render.
  useEffect(() => {
    if (openId !== null || !restoreFocusRef.current) return
    restoreFocusRef.current = false
    const id = lastOpenedRef.current
    if (id) tileRefs.current.get(id)?.focus({ preventScroll: true })
  }, [openId])

  // Crossing the breakpoint with a tile open (a rotated phone, a resized window): keep it open in
  // the other mode. On desktop that means the finished panel, without replaying the white plate.
  const [wasDesktop, setWasDesktop] = useState(isDesktop)
  if (wasDesktop !== isDesktop) {
    setWasDesktop(isDesktop)
    if (openId !== null) {
      setPanelShown(true)
      setPlateDark(true)
    }
  }

  const panelOpen = isDesktop && openId !== null && panelShown

  useEffect(() => {
    if (!panelOpen) return
    closeRef.current?.focus({ preventScroll: true })
  }, [panelOpen])

  const onEscape = useEffectEvent(() => {
    if (videoOpen) setVideoOpen(false)
    // Escape pressed elsewhere on the page (the form, another dialog) is not ours to handle.
    else if (focusIsOurs(gridRef.current)) close()
  })

  useEffect(() => {
    if (!panelOpen && !videoOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.isComposing) onEscape()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [panelOpen, videoOpen])

  useEffect(() => {
    if (!videoOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [videoOpen])

  const play = (service: LpServiceId, example: LpExample) => {
    if (videoOpen) return
    sendGTMEvent("lp_service_video_play", { service, video: example.title })
    setActiveExample(example)
    setVideoOpen(true)
  }

  const quote = (service: LpServiceId) => {
    sendGTMEvent("lp_service_quote_click", { service })
    onQuote(service)
    // The visitor is leaving for the form (which takes focus): do not leave a panel open behind them.
    if (isDesktop) {
      closingRef.current = true
      restoreFocusRef.current = false
      setPlateDark(true)
      setPanelShown(false)
    }
  }

  const useLayoutMorph = isDesktop && !reduceMotion
  const openIndex = openId ? LP_SERVICE_IDS.indexOf(openId) : -1
  const openCopy = openId ? copy(openId) : null
  const openExamples = openId ? LP_SERVICE_EXAMPLES[openId] : []

  return (
    <LayoutGroup id={`${baseId}-services`}>
      <section
        className={
          variant === "landing"
            ? "relative overflow-hidden bg-surface px-6 py-20 md:px-12 md:py-24"
            : "relative overflow-hidden px-6 pb-20 md:px-12 md:pb-24"
        }
      >
        {variant === "landing" ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="relative z-10 mb-12 grid grid-cols-1 gap-4 md:mb-16 md:grid-cols-12"
          >
            <div className="md:col-span-8 lg:col-span-6">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("servicesLabel")}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-5xl md:text-6xl">
                {t("servicesTitle")}
              </h2>
              <p className="mt-4 max-w-sm text-pretty font-sans text-sm leading-relaxed text-foreground/60 md:mt-6">
                {t("servicesBody")}
              </p>
            </div>
          </motion.div>
        ) : (
          <p className="relative z-10 mb-6 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
            {t("servicesHint")}
          </p>
        )}

        <div
          ref={gridRef}
          className="relative z-10 grid scroll-mt-24 grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2 lg:grid-cols-3"
        >
          {LP_SERVICE_IDS.map((id, index) => {
            const Icon = ICONS[id]
            const item = copy(id)
            const isOpen = openId === id
            const dimmed = isDesktop && openId !== null && !isOpen
            const detailsId = `${baseId}-${id}-details`
            const examples = LP_SERVICE_EXAMPLES[id]

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: cinematicEase }}
                className="group relative"
                // Covered by the panel on desktop: keep them out of the tab order and the accessibility tree.
                inert={isDesktop && openId !== null}
              >
                {/* The plate: the only thing layout animation ever resizes. Keyed by mode
                    because Framer reads layoutId once, at mount: the server render (and a
                    phone) has none, so the desktop plate has to be a fresh element. */}
                <motion.div
                  key={useLayoutMorph ? "morph" : "static"}
                  layoutId={useLayoutMorph ? `lp-service-plate-${id}` : undefined}
                  transition={plateSpring}
                  className="absolute inset-0 bg-surface-raised transition-colors duration-300 md:group-hover:bg-foreground"
                />

                <motion.div
                  animate={{ opacity: dimmed ? 0.25 : isDesktop && isOpen ? 0 : 1, scale: dimmed ? 0.97 : 1 }}
                  transition={{ duration: 0.45, ease: cinematicEase }}
                  className="relative"
                >
                  <button
                    type="button"
                    ref={(node) => {
                      if (node) tileRefs.current.set(id, node)
                      else tileRefs.current.delete(id)
                    }}
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={isDesktop ? `${baseId}-panel` : detailsId}
                    className="flex h-full w-full scroll-mt-20 flex-col p-7 text-left outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-foreground md:min-h-[17.5rem] md:p-8"
                  >
                    <span className="mb-6 flex w-full items-start justify-between">
                      <Icon
                        size={24}
                        strokeWidth={1.4}
                        className="text-foreground/70 transition-colors duration-300 md:group-hover:text-background/70"
                      />
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 md:group-hover:text-background/60">
                        <span className="hidden md:inline">{t("serviceOpen")}</span>
                        <Plus
                          size={16}
                          strokeWidth={1.5}
                          className={`transition-transform duration-500 ${isOpen ? "rotate-[135deg]" : "md:group-hover:rotate-90"}`}
                        />
                      </span>
                    </span>

                    <span className="mb-3 block font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground transition-colors duration-300 md:group-hover:text-background md:text-2xl">
                      {item.title}
                    </span>
                    <span className="block max-w-xs font-sans text-sm leading-relaxed text-foreground/60 transition-colors duration-300 md:group-hover:text-background/60">
                      {item.body}
                    </span>

                    <span className="mt-auto block w-full pt-6">
                      <span className="block border-t border-foreground/15 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors duration-300 md:group-hover:border-background/20 md:group-hover:text-background">
                        {item.price}
                        {item.priceNote ? (
                          <span className="text-foreground/50 transition-colors duration-300 md:group-hover:text-background/60">
                            {" "}
                            {item.priceNote.split(" · ")[0]}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>

                  {/* Phone: the details open under the tile's own header. */}
                  <AnimatePresence initial={false}>
                    {!isDesktop && isOpen ? (
                      <motion.div
                        key="details"
                        id={detailsId}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.55, ease: curtainEase }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-8">
                          <motion.span
                            aria-hidden
                            className="mb-6 block h-px origin-left bg-foreground/40"
                            initial={reduceMotion ? false : { scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: curtainEase }}
                          />
                          {item.priceNote.includes(" · ") ? (
                            <FadeUp delay={0.15} className="mb-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-foreground/60">
                              {item.priceNote.split(" · ").slice(1).join(" · ")}
                            </FadeUp>
                          ) : null}
                          <FadeUp delay={0.18}>
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              {t("serviceIncluded")}
                            </p>
                          </FadeUp>
                          <ul className="mb-7 space-y-3">
                            {item.points.map((point, i) => (
                              <li key={point}>
                                <FadeUp delay={0.22 + i * 0.07} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                                  <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-foreground/50" />
                                  <span>{point}</span>
                                </FadeUp>
                              </li>
                            ))}
                          </ul>

                          {examples.length ? (
                            <div className={`mb-7 grid gap-2 ${examples.some((e) => e.vertical) ? "grid-cols-3" : "grid-cols-1"}`}>
                              {examples.map((example, i) => (
                                <ExampleThumb
                                  key={example.id}
                                  example={example}
                                  delay={0.3 + i * 0.12}
                                  onPlay={(e) => play(id, e)}
                                  label={t("servicePlayAria", { title: example.title })}
                                  sizes="(max-width: 768px) 90vw, 40vw"
                                />
                              ))}
                            </div>
                          ) : null}

                          <FadeUp delay={0.4}>
                            <button
                              type="button"
                              onClick={() => quote(id)}
                              className="w-full border border-foreground bg-foreground px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-background"
                            >
                              {t("serviceCta")}
                            </button>
                          </FadeUp>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Desktop: the opened tile's plate, grown to the size of the grid. Inside
              AnimatePresence so that, on the way out, Framer can hand its last box
              back to the tile's own plate, which then shrinks into place. */}
          <AnimatePresence>
            {isDesktop && openId ? (
              <motion.div
                key={openId}
                layoutId={useLayoutMorph ? `lp-service-plate-${openId}` : undefined}
                transition={plateSpring}
                className={`absolute inset-0 z-20 transition-colors duration-300 ${plateDark ? "bg-surface-raised" : "bg-foreground"}`}
              />
            ) : null}
          </AnimatePresence>

          {/* Desktop: the panel itself, on top of the plate. */}
          <AnimatePresence onExitComplete={onPanelExitComplete}>
            {panelOpen && openId && openCopy ? (
              <motion.div
                key={openId}
                id={`${baseId}-panel`}
                role="region"
                aria-labelledby={`${baseId}-panel-title`}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: cinematicEase }}
                className="absolute inset-0 z-30 overflow-hidden"
              >
                {/* The curtain: dark rises over the white plate. */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 border border-white/20 bg-surface-raised"
                  initial={{ clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{
                    duration: reduceMotion ? 0 : CURTAIN_DURATION,
                    delay: reduceMotion ? 0 : CURTAIN_DELAY,
                    ease: curtainEase,
                  }}
                  onAnimationComplete={() => setPlateDark(true)}
                />

                {/* A large index number, half out of frame, for depth. */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 right-6 select-none font-[family-name:var(--font-display)] text-[16rem] leading-none text-foreground/[0.04] lg:text-[22rem]"
                  initial={reduceMotion ? false : { opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: CONTENT_DELAY, ease: settleEase }}
                >
                  {String(openIndex + 1).padStart(2, "0")}
                </motion.span>

                <div className="relative grid h-full grid-cols-12 content-start gap-x-8 gap-y-4 overflow-y-auto p-8 [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin] lg:content-stretch lg:p-10 xl:p-12">
                  <div className="col-span-12 flex items-start justify-between">
                    <FadeUp delay={CONTENT_DELAY} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {String(openIndex + 1).padStart(2, "0")} / {String(LP_SERVICE_IDS.length).padStart(2, "0")}
                    </FadeUp>
                    <motion.button
                      ref={closeRef}
                      type="button"
                      onClick={() => {
                        if (panelArmedRef.current) close()
                      }}
                      initial={reduceMotion ? false : { opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: CONTENT_DELAY + 0.1, ease: settleEase }}
                      className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground"
                      aria-label={t("serviceClose")}
                    >
                      <X size={22} strokeWidth={1.5} />
                    </motion.button>
                  </div>

                  <div className={`col-span-12 flex flex-col ${openExamples.length ? "lg:col-span-5" : "lg:col-span-6"}`}>
                    <h3
                      id={`${baseId}-panel-title`}
                      className="font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-[0.02em] text-foreground lg:text-5xl"
                    >
                      <RevealLine delay={CONTENT_DELAY + 0.05}>{openCopy.title}</RevealLine>
                    </h3>

                    <motion.span
                      aria-hidden
                      className="my-5 block h-px origin-left bg-foreground/30"
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: CONTENT_DELAY + 0.15, ease: curtainEase }}
                    />

                    <p className="font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.02em] text-foreground lg:text-4xl">
                      <RevealLine delay={CONTENT_DELAY + 0.2}>{openCopy.price}</RevealLine>
                    </p>
                    {openCopy.priceNote ? (
                      <FadeUp
                        delay={CONTENT_DELAY + 0.3}
                        className="mt-3 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-foreground/60"
                      >
                        {openCopy.priceNote}
                      </FadeUp>
                    ) : null}

                    <FadeUp delay={CONTENT_DELAY + 0.35} className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/60">
                      {openCopy.body}
                    </FadeUp>

                    <FadeUp delay={CONTENT_DELAY + 0.55} className="mt-auto pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          if (panelArmedRef.current) quote(openId)
                        }}
                        className="group/cta relative overflow-hidden border border-foreground bg-foreground px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-background outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="absolute inset-0 origin-left scale-x-0 bg-surface-raised transition-transform duration-500 ease-out group-hover/cta:scale-x-100" />
                        <span className="relative transition-colors duration-300 group-hover/cta:text-foreground">
                          {t("serviceCta")}
                        </span>
                      </button>
                    </FadeUp>
                  </div>

                  <div className={`col-span-12 ${openExamples.length ? "lg:col-span-7" : "lg:col-span-5 lg:col-start-8"}`}>
                    <FadeUp delay={CONTENT_DELAY + 0.25}>
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {t("serviceIncluded")}
                      </p>
                    </FadeUp>
                    <ul className={openExamples.length ? "mb-5 grid grid-cols-1 gap-x-8 gap-y-3 xl:grid-cols-3" : "space-y-5"}>
                      {openCopy.points.map((point, i) => (
                        <li key={point}>
                          <FadeUp
                            delay={CONTENT_DELAY + 0.3 + i * 0.08}
                            className={`border-t border-foreground/15 pt-3 leading-relaxed text-foreground/85 ${
                              openExamples.length ? "text-sm" : "text-base lg:text-lg"
                            }`}
                          >
                            {point}
                          </FadeUp>
                        </li>
                      ))}
                    </ul>

                    {openExamples.length ? (
                      <>
                        <FadeUp delay={CONTENT_DELAY + 0.4}>
                          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            {t("serviceExamples")}
                          </p>
                        </FadeUp>
                        <div
                          className={`grid gap-3 ${
                            openExamples.some((e) => e.vertical)
                              ? "max-w-xs grid-cols-3"
                              : openExamples.length > 1
                                ? "grid-cols-2"
                                : "max-w-[17rem] grid-cols-1 lg:max-w-[21rem]"
                          }`}
                        >
                          {openExamples.map((example, i) => (
                            <ExampleThumb
                              key={example.id}
                              example={example}
                              delay={CONTENT_DELAY + 0.45 + i * 0.14}
                              onPlay={(e) => play(openId, e)}
                              label={t("servicePlayAria", { title: example.title })}
                              sizes="(max-width: 1024px) 45vw, 30vw"
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <p className="relative z-10 mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {t("servicesNet")}
        </p>
      </section>

      <ProjectVideoModal
        isOpen={videoOpen}
        activeProject={activeExample}
        useSharedLayout={false}
        onClose={() => setVideoOpen(false)}
        onExitComplete={() => setActiveExample(null)}
      />
    </LayoutGroup>
  )
}
