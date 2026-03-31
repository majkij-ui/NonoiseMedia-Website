"use client"

import { useTranslations } from "next-intl"
import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about/about-hero"
import { AboutFeatures } from "@/components/about/about-features"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { OfferPricingTiers } from "@/components/offer/pricing-tiers"
import { ProjectThumbnailGrid } from "@/components/lp/project-thumbnail-grid"
import { LpLeadStrip } from "@/components/lp/lp-lead-strip"

/** Fixed nav + small breathing room; tuned so “Portfolio” scroll doesn’t leave excess space above. */
const SCROLL_OFFSET_PX = 72

function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
}

export default function KampaniaLpPage() {
  const t = useTranslations("lp.kampania")

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      <AboutHero
        fillViewportColumn={false}
        showScrollCue
        footerSlot={
          <div className="mt-6 flex max-w-xl flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => scrollToAnchor("portfolio")}
              className="border border-white/25 bg-transparent px-5 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-white/45 hover:bg-white/[0.06] sm:min-w-0 sm:flex-1 sm:text-center"
            >
              {t("ctaPortfolio")}
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor("lead")}
              className="border border-white/25 bg-transparent px-5 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-white/45 hover:bg-white/[0.06] sm:min-w-0 sm:flex-1 sm:text-center"
            >
              {t("ctaQuote")}
            </button>
          </div>
        }
      />

      <ProjectThumbnailGrid />
      <AboutFeatures />
      <AboutTestimonials showTrustedLogos />
      <AboutPhilosophy />
      <OfferPricingTiers showCta={false} />
      <LpLeadStrip />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
