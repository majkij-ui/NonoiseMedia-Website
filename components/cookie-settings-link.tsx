"use client"

import { useTranslations } from "next-intl"
import { openConsentSettings } from "@/lib/consent"

/**
 * Reopens the cookie banner in settings mode so visitors can change or
 * withdraw consent at any time (components/cookie-consent.tsx listens).
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const t = useTranslations("footer")

  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={className ?? "uppercase transition-colors hover:text-foreground"}
    >
      {t("cookieSettings")}
    </button>
  )
}
