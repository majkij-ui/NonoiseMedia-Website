"use client"

import { Navigation } from "@/components/navigation"
import { AboutFeatures } from "@/components/about/about-features"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { OfferPricingTiers } from "@/components/offer/pricing-tiers"
import { ProjectThumbnailGrid } from "@/components/lp/project-thumbnail-grid"
import { LpLeadStrip } from "@/components/lp/lp-lead-strip"
import { LpHero } from "@/components/lp/lp-hero"
import { LpServicesGrid } from "@/components/lp/lp-services-grid"

export default function KampaniaLpPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      <LpHero />
      <LpServicesGrid />

      <ProjectThumbnailGrid />
      <AboutFeatures />
      <AboutTestimonials showTrustedLogos />
      <AboutPhilosophy />
      <OfferPricingTiers showCta={false} tightFooter />
      <LpLeadStrip />

      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
