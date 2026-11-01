"use client"

import { useSyncExternalStore } from "react"
import { useTranslations } from "next-intl"

/**
 * Events CookieYes dispatches on `document`: when its banner has initialised,
 * and when the visitor changes consent. Source:
 * https://www.cookieyes.com/documentation/events-on-cookie-banner-load/
 * https://www.cookieyes.com/documentation/events-on-cookie-banner-interactions/
 */
const COOKIEYES_EVENTS = ["cookieyes_banner_load", "cookieyes_consent_update"] as const

function subscribe(onChange: () => void): () => void {
  for (const name of COOKIEYES_EVENTS) document.addEventListener(name, onChange)
  return () => {
    for (const name of COOKIEYES_EVENTS) document.removeEventListener(name, onChange)
  }
}

function isCookieYesReady(): boolean {
  try {
    return typeof window.revisitCkyConsent === "function"
  } catch {
    return false
  }
}

/** On the server CookieYes never exists, so the link is never in the HTML. */
function isCookieYesReadyOnServer(): boolean {
  return false
}

function openCookieSettings(): void {
  try {
    window.revisitCkyConsent?.()
  } catch {
    // A broken third-party script must not surface as an error in the footer.
  }
}

/**
 * Reopens the CookieYes banner so visitors can change or withdraw consent.
 *
 * CookieYes arrives through GTM, which is deferred and may be missing entirely
 * (no container published, ad blocker). Until `window.revisitCkyConsent`
 * exists this renders nothing, so there is never a dead link.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const t = useTranslations("footer")
  const ready = useSyncExternalStore(subscribe, isCookieYesReady, isCookieYesReadyOnServer)

  if (!ready) return null

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className ?? "uppercase transition-colors hover:text-foreground"}
    >
      {t("cookieSettings")}
    </button>
  )
}
