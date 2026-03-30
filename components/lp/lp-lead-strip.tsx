"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function LpLeadStrip() {
  const t = useTranslations("lp.kampania")

  return (
    <section
      id="lead"
      className="scroll-mt-24 border-t border-foreground/15 bg-neutral-950 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("leadLabel")}
        </p>
        <Link
          href="/contact"
          className="inline-flex border border-foreground bg-foreground px-10 py-4 font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.06em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground md:text-2xl"
        >
          {t("leadCta")}
        </Link>
      </div>
    </section>
  )
}
