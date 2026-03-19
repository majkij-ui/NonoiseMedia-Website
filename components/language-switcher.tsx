"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 text-xs font-light tracking-[0.2em] text-muted-foreground">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`px-1 py-0.5 uppercase transition-colors hover:text-foreground ${
            locale === loc ? "text-foreground" : ""
          }`}
          aria-label={locale === loc ? `Current language: ${loc}` : `Switch to ${loc}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
