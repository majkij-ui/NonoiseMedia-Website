"use client"

import { useTranslations } from "next-intl"
import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about/about-hero"
import { AboutFeatures } from "@/components/about/about-features"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { AnimatedHomeButton } from "@/components/animated-home-button"
import { ProjectThumbnailGrid } from "@/components/lp/project-thumbnail-grid"
import { LpLeadStrip } from "@/components/lp/lp-lead-strip"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function KampaniaLpPage() {
  const t = useTranslations("lp.kampania")
  const headlineLines = t("headline").split("\n")

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      <AboutHero
        label={t("label")}
        headline={
          <>
            {headlineLines[0]}
            {headlineLines.length > 1 ? (
              <>
                <br />
                {headlineLines.slice(1).join(" ")}
              </>
            ) : null}
          </>
        }
        body={t("body")}
        showScrollCue={false}
        footerSlot={
          <div className="flex w-full max-w-2xl flex-col border border-foreground/20 sm:flex-row sm:divide-x sm:divide-foreground/20">
            <div className="flex min-h-[3.25rem] flex-1 items-stretch justify-stretch sm:min-h-0">
              <AnimatedHomeButton
                text={t("ctaPortfolio")}
                onClick={() => scrollToId("portfolio")}
                entranceDelay={0.88}
                entranceFrom="left"
                hoverFrom="left"
                className="!flex !w-full !items-center !justify-center !text-[1rem] sm:!text-[1.25rem] md:!text-[1.65rem] lg:!text-[2rem]"
              />
            </div>
            <div className="flex min-h-[3.25rem] flex-1 items-stretch border-t border-foreground/20 sm:min-h-0 sm:border-t-0">
              <AnimatedHomeButton
                text={t("ctaQuote")}
                onClick={() => scrollToId("lead")}
                entranceDelay={1.12}
                entranceFrom="right"
                hoverFrom="right"
                className="!flex !w-full !items-center !justify-center !text-[1rem] sm:!text-[1.25rem] md:!text-[1.65rem] lg:!text-[2rem]"
              />
            </div>
          </div>
        }
      />

      <ProjectThumbnailGrid />
      <AboutFeatures />
      <AboutTestimonials />
      <AboutPhilosophy />
      <LpLeadStrip />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
