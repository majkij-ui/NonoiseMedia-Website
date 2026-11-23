/**
 * Microsoft Clarity: session recordings and heatmaps.
 *
 * Runs only for visitors who accepted analytics cookies, and only on the
 * production host. Before that consent the script is not even requested:
 * Clarity's own "no-consent mode" would still record page views without
 * cookies, which the banner never asked about.
 *
 * Consent is passed to Clarity with its Consent API v2. `ad_Storage` is always
 * denied: the banner's advertising consent is about Google Ads measurement,
 * not about Microsoft advertising cookies.
 */
import {
  CONSENT_EVENT,
  expireCookies,
  parseConsent,
  readConsentRaw,
  type ConsentChoice,
} from "@/lib/consent"

/** Public project id; it is in every page's HTML once the tag loads. */
const CLARITY_PROJECT_ID = "zi37o7p3zl"

const PRODUCTION_HOST = "www.nonoise.media"

/** Set to "1" in localStorage to load Clarity on another host (local checks only). */
const TEST_FLAG = "nnm_clarity_test"

/**
 * Consent given before the banner named Clarity covered Google Analytics only,
 * so it does not switch Clarity on. Those visitors keep their choice and
 * Clarity starts once they decide again. Must be the moment the banner text
 * naming Clarity went live (set at deploy), never earlier.
 */
const CLARITY_CONSENT_SINCE = 1795392000

const CLARITY_COOKIES = /^_cl(ck|sk)$/

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] }

declare global {
  interface Window {
    clarity?: ClarityFn
  }
}

let loaded = false
/** Clarity was stopped after consent was withdrawn on this page. */
let stopped = false
/** The consent state last applied on this page. */
let granted = false

function allowedHost(): boolean {
  if (window.location.hostname === PRODUCTION_HOST) return true
  try {
    return window.localStorage.getItem(TEST_FLAG) === "1"
  } catch {
    return false
  }
}

/** Analytics consent given after Clarity was named in the banner. */
function clarityConsent(raw: string): boolean {
  const choice = parseConsent(raw)
  if (!choice?.analytics) return false
  const at = Number(raw.match(/\.t(\d+)$/)?.[1] ?? 0)
  return at >= CLARITY_CONSENT_SINCE
}

/** Same queue-then-load pattern as Clarity's own install snippet. */
function load(): void {
  if (loaded) return
  loaded = true
  // Clarity replays this queue as `arguments` objects, exactly as its snippet pushes them.
  const queue: ClarityFn = function (..._args: unknown[]) {
    ;(queue.q ??= []).push(arguments)
  }
  window.clarity ??= queue
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
  document.head.appendChild(script)
}

function apply(next: boolean): void {
  if (next === granted) return
  granted = next
  if (next) {
    if (stopped) {
      stopped = false
      window.clarity?.("start")
    }
    load()
    window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" })
    return
  }
  if (!loaded || stopped) return
  // Checked 2026-11-23 on clarity.js 0.8.79: "denied" alone (and consent(false)
  // too) leaves Clarity recording without cookies; only "stop" ends the
  // uploads. Its final upload rewrites the cookies and a stopped Clarity
  // ignores consent(false), so the cookies are removed here, after it.
  window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" })
  window.clarity?.("stop")
  stopped = true
  expireCookies(CLARITY_COOKIES)
  window.setTimeout(() => expireCookies(CLARITY_COOKIES), 1500)
}

/**
 * Starts Clarity if the stored choice allows it and follows later changes.
 * Returns the unsubscribe function, for a React effect cleanup.
 */
export function startClarity(): () => void {
  if (typeof window === "undefined" || !allowedHost()) return () => {}

  const sync = () => {
    try {
      apply(clarityConsent(readConsentRaw()))
    } catch {
      // Never let analytics break the page.
    }
  }
  sync()

  // A choice made in the banner now is always newer than the cutoff.
  const onChange = (event: Event) => {
    try {
      const choice = (event as CustomEvent<ConsentChoice>).detail
      apply(Boolean(choice?.analytics))
    } catch {
      // Same as above.
    }
  }
  // A choice made in another tab only changes the cookie, so re-read it
  // whenever this tab comes back into view.
  const onVisible = () => {
    if (document.visibilityState === "visible") sync()
  }
  document.addEventListener(CONSENT_EVENT, onChange)
  document.addEventListener("visibilitychange", onVisible)
  return () => {
    document.removeEventListener(CONSENT_EVENT, onChange)
    document.removeEventListener("visibilitychange", onVisible)
  }
}

/**
 * Marks the recording with one of our own event names (never parameters, which
 * can hold contact details), so recordings can be filtered by what the visitor
 * did, e.g. opened a tile or sent the form. No-op until Clarity has loaded.
 */
export function sendClarityEvent(eventName: string): void {
  if (!loaded || stopped) return
  try {
    window.clarity?.("event", eventName)
  } catch {
    // Same as above.
  }
}
