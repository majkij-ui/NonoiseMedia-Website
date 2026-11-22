"use client"

import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about/about-hero"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { LpLogoStrip } from "@/components/lp/lp-logo-strip"
import { LpProcess } from "@/components/lp/lp-process"
import { LpTestimonials } from "@/components/lp/lp-testimonials"
import { FooterLegalLinks } from "@/components/footer-legal-links"
import { testimonials } from "@/lib/testimonials"

/**
 * The logo strip, the process and the testimonials are the landing page's own
 * components, on purpose: prices, time promises and quotes are then written
 * once and cannot drift apart between the two pages.
 */
export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <AboutHero />
      <LpLogoStrip />
      <LpProcess />
      <AboutPhilosophy />
      <LpTestimonials items={testimonials} />

      <footer className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <FooterLegalLinks />
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
