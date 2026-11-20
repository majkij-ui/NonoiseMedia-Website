"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AboutFeatures } from "@/components/about/about-features"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { ProjectThumbnailGrid } from "@/components/lp/project-thumbnail-grid"
import { LpLeadSection } from "@/components/lp/lp-lead-section"
import { LpStickyCta } from "@/components/lp/lp-sticky-cta"
import { LpHero } from "@/components/lp/lp-hero"
import { LpServicesGrid } from "@/components/lp/lp-services-grid"
import { FooterLegalLinks } from "@/components/footer-legal-links"

/**
 * Paid-traffic landing page. Self-contained on purpose: the visitor can watch
 * the work and send an enquiry without leaving it. Every call-to-action
 * scrolls to the form in LpLeadSection; nothing links to another page except
 * the legal links.
 */
export default function KampaniaLpPage() {
  const [reelPlaying, setReelPlaying] = useState(false)

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed minimal />

      <LpHero onPlayingChange={setReelPlaying} />
      <LpServicesGrid />

      <ProjectThumbnailGrid />
      <AboutFeatures />
      <AboutTestimonials showTrustedLogos />
      <LpLeadSection />

      <footer className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <FooterLegalLinks />
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>

      <LpStickyCta hidden={reelPlaying} />
    </main>
  )
}
