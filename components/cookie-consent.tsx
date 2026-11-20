"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  CONSENT_OPEN_EVENT,
  parseConsent,
  readConsentRaw,
  saveConsentChoice,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/consent"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

/** Server snapshot: the banner is never in the HTML, so it cannot flash for visitors who already chose. */
const NOT_MOUNTED = "ssr"
const getServerSnapshot = () => NOT_MOUNTED

/** CSS variable other fixed or viewport-locked layouts read to stay clear of the banner. */
const OFFSET_VAR = "--consent-offset"
/** The settings panel is tall; pages only make room for a bar-sized strip of it. */
const MAX_OFFSET_IN_SETTINGS = 120

const NOTHING_OPTIONAL: ConsentChoice = { analytics: false, ads: false }
const EVERYTHING: ConsentChoice = { analytics: true, ads: true }

const BUTTON_BASE =
  "flex items-center justify-center whitespace-nowrap border font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
const FILLED = "border-foreground bg-foreground text-background hover:bg-foreground/85"
const OUTLINE = "border-white/40 text-foreground hover:border-foreground"
const LINK =
  "text-foreground underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-foreground"

function Toggle({
  label,
  description,
  checked,
  onChange,
  lockedLabel,
}: {
  label: string
  description: string
  checked: boolean
  onChange?: (next: boolean) => void
  /** When set, the category cannot be switched off and this text replaces the switch. */
  lockedLabel?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/15 py-3">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">{label}</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-foreground/60">{description}</p>
      </div>
      {lockedLabel ? (
        <span className="shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {lockedLabel}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          onClick={() => onChange?.(!checked)}
          className={`relative h-6 w-11 shrink-0 border transition-colors ${
            checked ? "border-foreground bg-foreground" : "border-white/40 bg-transparent"
          }`}
        >
          <span
            className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 transition-all ${
              checked ? "left-[calc(100%-1.25rem)] bg-background" : "left-1 bg-foreground/70"
            }`}
          />
        </button>
      )}
    </div>
  )
}

/**
 * Cookie banner in the site's own style: a slim bar pinned to the bottom,
 * never a modal and never an overlay over the whole page.
 *
 * It is still a fixed element, so on a short screen it can sit over whatever
 * is at the very bottom of the first view. Two things keep that harmless: the
 * bar is small (about 85px on a phone), and it publishes its height as
 * `--consent-offset`, which the page uses as bottom padding so everything can
 * be scrolled clear of it, and which viewport-locked layouts subtract.
 *
 * Shown until the visitor chooses; reopened from "Ustawienia cookies" in the
 * footer. Google tags learn the choice through Consent Mode (lib/consent.ts).
 */
export function CookieConsent() {
  const t = useTranslations("consent")
  const stored = useSyncExternalStore(subscribeConsent, readConsentRaw, getServerSnapshot)
  const [reopened, setReopened] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [draft, setDraft] = useState<ConsentChoice>(NOTHING_OPTIONAL)
  const barRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  /** What had focus before the footer link opened the panel, to hand focus back. */
  const openerRef = useRef<HTMLElement | null>(null)

  const mounted = stored !== NOT_MOUNTED
  const visible = mounted && (stored === "" || reopened)

  const openSettings = useCallback(() => {
    setDraft(parseConsent(readConsentRaw()) ?? NOTHING_OPTIONAL)
    setShowSettings(true)
  }, [])

  /** Leave the panel without changing anything. */
  const closeSettings = useCallback(() => {
    setShowSettings(false)
    setReopened(false)
    openerRef.current?.focus?.()
    openerRef.current = null
  }, [])

  const decide = useCallback((choice: ConsentChoice) => {
    saveConsentChoice(choice)
    setReopened(false)
    setShowSettings(false)
    openerRef.current?.focus?.()
    openerRef.current = null
  }, [])

  // Footer link → reopen with the current choice loaded into the toggles.
  useEffect(() => {
    const onOpen = () => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      openSettings()
      setReopened(true)
    }
    document.addEventListener(CONSENT_OPEN_EVENT, onOpen)
    return () => document.removeEventListener(CONSENT_OPEN_EVENT, onOpen)
  }, [openSettings])

  // Tell keyboard and screen-reader users the panel opened; Escape leaves it unchanged.
  useEffect(() => {
    if (!visible || !showSettings) return
    titleRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [visible, showSettings, closeSettings])

  // Publish the bar's height so the page keeps its controls above it.
  useEffect(() => {
    const root = document.documentElement
    const bar = barRef.current
    if (!visible || !bar) {
      root.style.removeProperty(OFFSET_VAR)
      return
    }

    const publish = () => {
      const height = Math.ceil(bar.getBoundingClientRect().height)
      root.style.setProperty(OFFSET_VAR, `${showSettings ? Math.min(height, MAX_OFFSET_IN_SETTINGS) : height}px`)
    }
    publish()

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(publish)
    observer?.observe(bar)
    return () => {
      observer?.disconnect()
      root.style.removeProperty(OFFSET_VAR)
    }
  }, [visible, showSettings])

  if (!visible) return null

  // Entrance is a short slide only, never a fade from transparent, and there is
  // no exit animation: an invisible bar that still catches taps is exactly the
  // failure this component replaces.
  return (
    <motion.div
      ref={barRef}
      role="region"
      aria-label={t("ariaLabel")}
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: cinematicEase }}
      className="fixed inset-x-0 bottom-0 z-[60] max-h-dvh overflow-y-auto overscroll-contain border-t border-white/20 bg-background/95 px-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm md:px-12 md:py-4"
    >
      {showSettings ? (
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p
              ref={titleRef}
              tabIndex={-1}
              className="font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground outline-none"
            >
              {t("settingsTitle")}
            </p>
            <button
              type="button"
              onClick={closeSettings}
              aria-label={t("close")}
              className="-mr-1 flex h-8 w-8 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          <Toggle label={t("necessary")} description={t("necessaryDesc")} checked lockedLabel={t("alwaysOn")} />
          <Toggle
            label={t("analytics")}
            description={t("analyticsDesc")}
            checked={draft.analytics}
            onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
          />
          <Toggle
            label={t("ads")}
            description={t("adsDesc")}
            checked={draft.ads}
            onChange={(ads) => setDraft((d) => ({ ...d, ads }))}
          />
          {/* "Save" is the primary action here: the visitor has just set the switches. */}
          <div className="grid grid-cols-2 gap-2 border-t border-white/15 pt-3 sm:flex">
            <button
              type="button"
              className={`${BUTTON_BASE} ${OUTLINE} h-10 px-4 sm:px-5`}
              onClick={() => decide(NOTHING_OPTIONAL)}
            >
              {t("reject")}
            </button>
            <button
              type="button"
              className={`${BUTTON_BASE} ${OUTLINE} h-10 px-4 sm:px-5`}
              onClick={() => decide(EVERYTHING)}
            >
              {t("acceptAll")}
            </button>
            <button
              type="button"
              className={`${BUTTON_BASE} ${FILLED} col-span-2 h-10 px-4 sm:col-span-1 sm:px-5`}
              onClick={() => decide(draft)}
            >
              {t("save")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-xs leading-snug text-foreground/70 md:leading-relaxed">
            {t("text")}
            <span className="hidden md:ml-2 md:inline">
              <Link href="/privacy" className={LINK}>
                {t("policy")}
              </Link>
              <span aria-hidden className="px-2 text-foreground/30">
                /
              </span>
              <button type="button" onClick={openSettings} className={LINK}>
                {t("settings")}
              </button>
            </span>
          </p>
          <div className="flex items-center justify-between gap-3">
            {/* Phone: links share the row with the buttons to keep the bar short. */}
            <p className="text-xs text-foreground/70 md:hidden">
              <Link href="/privacy" className={LINK}>
                {t("policyShort")}
              </Link>
              <span aria-hidden className="px-1.5 text-foreground/30">
                /
              </span>
              <button type="button" onClick={openSettings} className={LINK}>
                {t("settings")}
              </button>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className={`${BUTTON_BASE} ${OUTLINE} h-9 px-3 md:h-10 md:px-5`}
                onClick={() => decide(NOTHING_OPTIONAL)}
              >
                {t("reject")}
              </button>
              <button
                type="button"
                className={`${BUTTON_BASE} ${FILLED} h-9 px-3 md:h-10 md:px-5`}
                onClick={() => decide(EVERYTHING)}
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
