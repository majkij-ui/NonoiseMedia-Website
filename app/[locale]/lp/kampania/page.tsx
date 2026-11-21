"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectThumbnailGrid } from "@/components/lp/project-thumbnail-grid"
import { LpLeadSection } from "@/components/lp/lp-lead-section"
import { LpStickyCta } from "@/components/lp/lp-sticky-cta"
import { LpHero } from "@/components/lp/lp-hero"
import { LpLogoStrip } from "@/components/lp/lp-logo-strip"
import { LpServicesGrid } from "@/components/lp/lp-services-grid"
import { LpTestimonials } from "@/components/lp/lp-testimonials"
import { LpProcess } from "@/components/lp/lp-process"
import { LpFaq } from "@/components/lp/lp-faq"
import { scrollToLead } from "@/components/lp/scroll-to-lead"
import { FooterLegalLinks } from "@/components/footer-legal-links"
import { COMPANY_LEGAL_NAME, COMPANY_NIP, COMPANY_STUDIO_ADDRESS } from "@/lib/contact-info"

/**
 * Paid-traffic landing page. Self-contained on purpose: the visitor can watch
 * the work and send an enquiry without leaving it. Every call-to-action
 * scrolls to the form in LpLeadSection. The only ways off the page are the
 * portfolio link under the films (new tab) and the legal links.
 *
 * Order: who we are and proof first, then the work, the offer with prices,
 * what clients say, how we work, the usual questions, and the form.
 */
export default function KampaniaLpPage() {
  const [reelPlaying, setReelPlaying] = useState(false)
  /** The format picked on a service tile; the form shows it preselected. */
  const [service, setService] = useState("")

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed minimal />

      <LpHero onPlayingChange={setReelPlaying} />
      <LpLogoStrip />

      <ProjectThumbnailGrid />
      <LpServicesGrid
        onQuote={(id) => {
          setService(id)
          scrollToLead()
        }}
      />
      <LpTestimonials />
      <LpProcess />
      <LpFaq />
      <LpLeadSection service={service} onServiceChange={setService} />

      <footer className="flex flex-col gap-4 px-6 py-8 text-xs tracking-widest text-muted-foreground md:flex-row md:items-end md:justify-between md:px-12">
        <p className="max-w-sm normal-case leading-relaxed tracking-normal text-muted-foreground">
          {COMPANY_LEGAL_NAME}
          <br />
          {COMPANY_STUDIO_ADDRESS}
          <br />
          NIP {COMPANY_NIP}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
          <FooterLegalLinks />
          <span>&copy; 2026 NONOISE MEDIA</span>
        </div>
      </footer>

      <LpStickyCta hidden={reelPlaying} />
    </main>
  )
}
