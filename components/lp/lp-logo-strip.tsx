"use client"

import { useTranslations } from "next-intl"
import { TrustedByLogos } from "@/components/trusted-by-logos"

/** How many logos the strip shows. A phone gets two or three rows, not eight. */
const LOGO_COUNT = 6

/** Client logos directly under the hero: proof before the visitor has to scroll for it. */
export function LpLogoStrip() {
  const t = useTranslations("lp.kampania")

  return (
    <section className="border-b border-white/20 bg-background px-6 py-10 md:px-12 md:py-12">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:mb-8">
        {t("logosLabel")}
      </p>
      <TrustedByLogos withLabel={false} limit={LOGO_COUNT} />
    </section>
  )
}
