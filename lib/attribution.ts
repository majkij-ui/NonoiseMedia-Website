import { getAdStorageConsent } from "@/lib/consent"

/** Ad-click attribution captured on the landing hit, carried to form submit. */
export type Attribution = {
  gclid?: string
  gbraid?: string
  wbraid?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  landingPath?: string
  /** ISO 8601 — when the visitor arrived from the ad. */
  clickedAt: string
}

type StoredAttribution = {
  data: Attribution
  /** Epoch ms; absent for session-scoped records. */
  expiresAt?: number
}

const STORAGE_KEY = "nnm_attr_v1"
const TTL_MS = 90 * 24 * 60 * 60 * 1000

const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const
const UTM_PARAMS: [string, keyof Attribution][] = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_term", "utmTerm"],
]

/** Keep stored values small — these end up in an email and a CSV export. */
const MAX_VALUE_LENGTH = 512

function clamp(value: string): string {
  return value.trim().slice(0, MAX_VALUE_LENGTH)
}

export function hasClickId(attribution: Attribution | null): boolean {
  if (!attribution) return false
  return Boolean(attribution.gclid || attribution.gbraid || attribution.wbraid)
}

function write(record: StoredAttribution, persist: boolean): void {
  const payload = JSON.stringify(record)
  try {
    if (persist) {
      window.localStorage.setItem(STORAGE_KEY, payload)
      // Drop any session-scoped leftover so reads cannot pick a stale click.
      window.sessionStorage.removeItem(STORAGE_KEY)
    } else {
      window.sessionStorage.setItem(STORAGE_KEY, payload)
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Private mode / blocked storage — attribution is best-effort.
  }
}

function readFrom(storage: "localStorage" | "sessionStorage"): Attribution | null {
  try {
    const raw = window[storage].getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredAttribution
    if (!parsed?.data?.clickedAt) return null

    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      window[storage].removeItem(STORAGE_KEY)
      return null
    }

    return parsed.data
  } catch {
    return null
  }
}

/** Latest stored attribution, or null when the visitor never arrived from an ad. */
export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null
  return readFrom("localStorage") ?? readFrom("sessionStorage")
}

/**
 * Reads click ids and utm parameters off the current URL and stores them.
 *
 * Reads `window.location` rather than `useSearchParams()` on purpose: the
 * latter forces a Suspense boundary or dynamic rendering on these statically
 * prerendered routes.
 *
 * A fresh click id overwrites the previous record; a visit with no ad
 * parameters leaves an existing record alone.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null

  let params: URLSearchParams
  try {
    params = new URLSearchParams(window.location.search)
  } catch {
    return readAttribution()
  }

  const next: Attribution = { clickedAt: new Date().toISOString() }
  let found = false

  for (const key of CLICK_ID_PARAMS) {
    const value = params.get(key)
    if (value) {
      next[key] = clamp(value)
      found = true
    }
  }

  for (const [param, field] of UTM_PARAMS) {
    const value = params.get(param)
    if (value) {
      next[field] = clamp(value)
      found = true
    }
  }

  if (!found) return readAttribution()

  try {
    next.landingPath = clamp(window.location.pathname)
  } catch {
    // Path is a nice-to-have.
  }

  // Without consent for ad_storage the record may not outlive the session.
  // "unknown" means no CMP is installed yet, which is how tags behave today.
  const persist = getAdStorageConsent() !== "denied"
  write({ data: next, expiresAt: persist ? Date.now() + TTL_MS : undefined }, persist)

  return next
}

const LEAD_ID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LEAD_ID_LENGTH = 8

/**
 * Short per-submission id. Travels to the email subject, to the dataLayer as
 * `transaction_id`, and later to Google as Order ID — so the same lead cannot
 * be counted twice.
 */
export function newLeadId(): string {
  const size = LEAD_ID_ALPHABET.length
  let id = ""

  try {
    const bytes = new Uint8Array(LEAD_ID_LENGTH)
    crypto.getRandomValues(bytes)
    for (const byte of bytes) id += LEAD_ID_ALPHABET[byte % size]
    return id
  } catch {
    for (let i = 0; i < LEAD_ID_LENGTH; i += 1) {
      id += LEAD_ID_ALPHABET[Math.floor(Math.random() * size)]
    }
    return id
  }
}

/** Lowercased and trimmed — the form Google expects for enhanced conversions. */
export function normalizeEmail(value: unknown): string {
  const email = String(value ?? "").trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : ""
}

/**
 * Best-effort E.164, defaulting to Poland. Returns "" when the input cannot be
 * read as a phone number — an unmatchable value is worse than an empty column.
 */
export function normalizePhoneE164(value: unknown, defaultCallingCode = "48"): string {
  const raw = String(value ?? "").trim()
  if (!raw) return ""

  const international = raw.startsWith("+") || raw.startsWith("00")
  let digits = raw.replace(/\D/g, "")
  if (!international && digits.startsWith("0")) {
    // Domestic trunk prefix.
    digits = digits.slice(1)
  }
  if (raw.startsWith("00")) digits = digits.slice(2)
  if (!digits) return ""

  if (!international && digits.length === 9) {
    return `+${defaultCallingCode}${digits}`
  }
  if (digits.length < 9 || digits.length > 15) return ""

  return `+${digits}`
}
