/**
 * First-party cookie consent (no third-party CMP).
 *
 * One cookie, `nnm_consent`, holds the visitor's choice. The same value drives
 * three things: Google Consent Mode v2 (so GTM tags know what they may do),
 * where the ad-click record is stored (lib/attribution.ts), and the consent
 * line in lead emails (lib/lead-source.ts).
 *
 * Wire-up for Google tags lives in GTM, not here: see docs/google-ads.md.
 */

export type ConsentValue = "granted" | "denied" | "unknown"

/** The two optional categories. Necessary storage is always on. */
export type ConsentChoice = { analytics: boolean; ads: boolean }

export const CONSENT_COOKIE = "nnm_consent"
/** Dispatched on `document` with the new ConsentChoice in `detail`. */
export const CONSENT_EVENT = "nnm:consent"
/** Dispatched on `document` to reopen the banner in settings mode. */
export const CONSENT_OPEN_EVENT = "nnm:consent-open"
/** dataLayer event pushed after every choice, for GTM triggers that need one. */
export const CONSENT_DATALAYER_EVENT = "nnm_consent_update"

/** Ask again after six months, the retention the policy states. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180

/** Same-origin endpoint that re-sets the cookie from an HTTP response (see persistOnServer). */
const CONSENT_ENDPOINT = "/api/consent"

/**
 * The choice for this page session when the cookie could not be written
 * (cookies blocked). Without it the banner could never be dismissed.
 */
let memoryRaw = ""

/** `v1.a<0|1>.m<0|1>.t<unix seconds>` — analytics, marketing, when chosen. */
const COOKIE_PATTERN = /^v1\.a([01])\.m([01])(?:\.t\d+)?$/

type ConsentModeState = Record<
  "analytics_storage" | "ad_storage" | "ad_user_data" | "ad_personalization",
  "granted" | "denied"
>

/**
 * The banner asks for ad *measurement* only. We run no remarketing, so
 * `ad_personalization` stays denied whatever the visitor picks: granting it
 * would tell Google the visitor agreed to personalised ads, which nobody asked.
 */
function toConsentMode(choice: ConsentChoice): ConsentModeState {
  const ads = choice.ads ? "granted" : "denied"
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: "denied",
  }
}

/** Raw cookie value, or "" when the visitor has not decided (or cookies are blocked). */
export function readConsentRaw(): string {
  try {
    const match = document.cookie.match(/(?:^|; )nnm_consent=([^;]*)/)
    const value = match ? decodeURIComponent(match[1]) : ""
    return COOKIE_PATTERN.test(value) ? value : memoryRaw
  } catch {
    return memoryRaw
  }
}

export function parseConsent(raw: string): ConsentChoice | null {
  const match = raw.match(COOKIE_PATTERN)
  if (!match) return null
  return { analytics: match[1] === "1", ads: match[2] === "1" }
}

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  return parseConsent(readConsentRaw())
}

/**
 * Current `ad_storage` consent signal.
 *
 * "unknown" means the visitor has not decided yet. Callers must treat it as
 * its own case: reporting it as "granted" would put a consent claim in the
 * Google Ads export that nobody ever gave, and storage must treat it like
 * "denied".
 */
export function getAdStorageConsent(): ConsentValue {
  const choice = readConsentChoice()
  if (!choice) return "unknown"
  return choice.ads ? "granted" : "denied"
}

/**
 * Consent Mode commands must reach the dataLayer as an `arguments` object,
 * exactly as Google's gtag() snippet pushes them. A plain array is ignored.
 */
function gtag(..._args: unknown[]): void {
  window.dataLayer ??= []
  window.dataLayer.push(arguments as unknown as Record<string, unknown>)
}

/** Google's own first-party cookies, by category. Removed when consent is withdrawn. */
const ANALYTICS_COOKIES = /^_ga/
const ADS_COOKIES = /^_gcl_|^_gac_/

/**
 * Consent Mode stops Google tags reading their cookies once consent is denied,
 * but it does not delete them. Withdrawal should leave nothing behind, so
 * expire them on this host and on every parent domain they may sit on.
 */
function expireCookies(pattern: RegExp): void {
  try {
    const names = document.cookie
      .split("; ")
      .map((pair) => pair.split("=")[0])
      .filter((name) => pattern.test(name))
    if (!names.length) return

    const labels = window.location.hostname.split(".")
    const domains = [""]
    for (let i = 0; i < labels.length - 1; i += 1) domains.push(`; domain=.${labels.slice(i).join(".")}`)

    for (const name of names) {
      for (const domain of domains) document.cookie = `${name}=; path=/; max-age=0${domain}`
    }
  } catch {
    // Best effort only.
  }
}

/**
 * Safari caps cookies written by script at 7 days, and at 24 hours on a
 * landing reached from an ad click. A cookie set by an HTTP response from our
 * own host is not capped, so the same value is sent back through a route
 * handler. The script-written cookie above covers the gap until it answers.
 */
function persistOnServer(choice: ConsentChoice): void {
  try {
    void fetch(CONSENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(choice),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Offline or fetch unavailable: the script-written cookie still stands.
  }
}

/**
 * Stores the choice, tells Google tags, and notifies the app.
 * Never throws: a blocked cookie jar must not break the page.
 */
export function saveConsentChoice(choice: ConsentChoice): void {
  if (typeof window === "undefined") return

  const value = `v1.a${choice.analytics ? 1 : 0}.m${choice.ads ? 1 : 0}.t${Math.floor(Date.now() / 1000)}`
  memoryRaw = value
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
  } catch {
    // Cookies blocked: memoryRaw keeps the choice for this page session.
  }
  persistOnServer(choice)

  try {
    gtag("consent", "update", toConsentMode(choice))
    window.dataLayer?.push({
      event: CONSENT_DATALAYER_EVENT,
      consent_analytics: choice.analytics,
      consent_ads: choice.ads,
    })
  } catch {
    // dataLayer unavailable: nothing to tell.
  }

  if (!choice.analytics) expireCookies(ANALYTICS_COOKIES)
  if (!choice.ads) expireCookies(ADS_COOKIES)

  try {
    document.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }))
  } catch {
    // Old browsers without CustomEvent constructors: the cookie is still set.
  }
}

/** Subscribe to consent changes (for useSyncExternalStore). */
export function subscribeConsent(onChange: () => void): () => void {
  document.addEventListener(CONSENT_EVENT, onChange)
  return () => document.removeEventListener(CONSENT_EVENT, onChange)
}

/** Asks the banner to reopen so the visitor can change or withdraw consent. */
export function openConsentSettings(): void {
  try {
    document.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
  } catch {
    // Nothing to reopen.
  }
}

/**
 * Inline script for the top of <body>. It must run before GTM loads, so the
 * consent defaults are already in the dataLayer when the container starts:
 * everything optional is denied until the visitor says otherwise, and a
 * returning visitor's stored choice is replayed immediately.
 *
 * It also expires the cookie of the consent tool this banner replaced
 * (`cookieyes-consent`, host-only). While that tool's tag is still in a
 * published GTM container, its template reads the cookie and pushes its own
 * consent update after ours, overriding the visitor's new choice.
 *
 * Kept as a string because it has to execute during HTML parsing, before
 * React hydrates. The cookie format here must match COOKIE_PATTERN above.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `(function(){
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{document.cookie='cookieyes-consent=; path=/; max-age=0';}catch(e){}
try{
var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=v1\\.a([01])\\.m([01])/);
if(m){var d=m[2]==='1'?'granted':'denied';
gtag('consent','update',{analytics_storage:m[1]==='1'?'granted':'denied',ad_storage:d,ad_user_data:d,ad_personalization:'denied'});}
}catch(e){}
})();`
