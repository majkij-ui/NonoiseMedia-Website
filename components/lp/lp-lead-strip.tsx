"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { sendGTMEvent } from "@/lib/gtm"

export function LpLeadStrip() {
  const t = useTranslations("lp.kampania")

  return (
    <section
      id="lead"
      className="scroll-mt-24 border-t border-foreground/10 bg-surface-raised px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-10"
    >
      {/* Same grid as OfferPricingTiers: middle column = width of center tier card */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="hidden min-h-0 md:block" aria-hidden />
        <div className="flex flex-col items-stretch text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:mb-5">
            {t("leadLabel")}
          </p>
          <Link
            href="/contact"
            onClick={() => sendGTMEvent("lp_contact_click")}
            className="block w-full border border-foreground bg-foreground py-4 font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.06em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground md:py-4 md:text-xl"
          >
            {t("leadCta")}
          </Link>
        </div>
        <div className="hidden min-h-0 md:block" aria-hidden />
      </div>
    </section>
  )
}
