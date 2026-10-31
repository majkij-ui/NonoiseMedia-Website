import { escapeHtml } from "@/lib/html"
import { normalizeEmail, normalizePhoneE164 } from "@/lib/attribution"
import type { ConsentValue } from "@/lib/consent"

/**
 * Attribution arrives in the request body, so every field is untrusted input:
 * clamp it, keep only known keys, and escape it on the way into the email.
 */
const LIMITS = {
  leadId: 16,
  clickId: 512,
  utm: 200,
  path: 200,
  contact: 320,
} as const

export type SanitizedLeadSource = {
  leadId: string
  gclid: string
  gbraid: string
  wbraid: string
  fromAds: boolean
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  landingPath: string
  clickedAt: string
  submittedAt: string
  consent: ConsentValue
  email: string
  phone: string
}

function clamp(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max)
}

/** `2026-11-04 10:12:00 Europe/Warsaw` — the shape the Google Ads export wants. */
function formatWarsaw(date: Date): string {
  try {
    const formatted = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Warsaw",
      dateStyle: "short",
      timeStyle: "medium",
    }).format(date)
    return `${formatted} Europe/Warsaw`
  } catch {
    return date.toISOString()
  }
}

function asConsent(value: unknown): ConsentValue {
  return value === "granted" || value === "denied" ? value : "unknown"
}

function asTimestamp(value: unknown): string {
  const raw = clamp(value, 40)
  if (!raw) return ""
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? "" : formatWarsaw(date)
}

type LeadSourceInput = {
  leadId?: unknown
  attribution?: unknown
  consent?: unknown
}

/** Normalized contact details, used for matching leads that carry no click id. */
type ContactInput = {
  email?: unknown
  phone?: unknown
}

export function sanitizeLeadSource(
  body: LeadSourceInput,
  contact: ContactInput = {},
): SanitizedLeadSource {
  const attribution = (body.attribution ?? {}) as Record<string, unknown>

  const gclid = clamp(attribution.gclid, LIMITS.clickId)
  const gbraid = clamp(attribution.gbraid, LIMITS.clickId)
  const wbraid = clamp(attribution.wbraid, LIMITS.clickId)

  return {
    leadId: clamp(body.leadId, LIMITS.leadId),
    gclid,
    gbraid,
    wbraid,
    fromAds: Boolean(gclid || gbraid || wbraid),
    utmSource: clamp(attribution.utmSource, LIMITS.utm),
    utmMedium: clamp(attribution.utmMedium, LIMITS.utm),
    utmCampaign: clamp(attribution.utmCampaign, LIMITS.utm),
    utmTerm: clamp(attribution.utmTerm, LIMITS.utm),
    landingPath: clamp(attribution.landingPath, LIMITS.path),
    clickedAt: asTimestamp(attribution.clickedAt),
    submittedAt: formatWarsaw(new Date()),
    consent: asConsent(body.consent),
    email: normalizeEmail(clamp(contact.email, LIMITS.contact)),
    phone: normalizePhoneE164(clamp(contact.phone, LIMITS.contact)),
  }
}

/** `[Ads] Projekt: X - Nonoise Media · K7Q2M9XA` */
export function buildLeadSubject(base: string, source: SanitizedLeadSource): string {
  const prefix = source.fromAds ? "[Ads] " : ""
  const suffix = source.leadId ? ` · ${source.leadId}` : ""
  return `${prefix}${base}${suffix}`
}

function row(label: string, value: string): string {
  if (!value) return ""
  return `
    <tr>
      <td style="padding: 4px 16px 4px 0; font-size: 12px; text-transform: uppercase; color: #666; white-space: nowrap; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 4px 0; font-size: 14px; color: #000; word-break: break-all;">${escapeHtml(value)}</td>
    </tr>`
}

/**
 * The "Źródło" block appended to every lead email. These are the fields the
 * lead app copies into a record and exports to Google Ads — see
 * google-ads.md for the field contract.
 */
export function renderLeadSourceHtml(source: SanitizedLeadSource): string {
  const rows = [
    row("Lead ID", source.leadId),
    row("Z reklamy", source.fromAds ? "tak" : "nie"),
    row("gclid", source.gclid),
    row("gbraid", source.gbraid),
    row("wbraid", source.wbraid),
    row("E-mail", source.email),
    row("Telefon", source.phone),
    row("Kliknięcie", source.clickedAt),
    row("Wysłano", source.submittedAt),
    row("utm_source", source.utmSource),
    row("utm_medium", source.utmMedium),
    row("utm_campaign", source.utmCampaign),
    row("utm_term", source.utmTerm),
    row("Strona wejścia", source.landingPath),
    row("Zgoda ad_storage", source.consent),
  ]
    .filter(Boolean)
    .join("")

  if (!rows) return ""

  return `
  <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0 20px 0;" />
  <div style="border-left: 2px solid #000; padding-left: 15px;">
    <p style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #666;">Źródło</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tbody>${rows}
      </tbody>
    </table>
  </div>
`
}
