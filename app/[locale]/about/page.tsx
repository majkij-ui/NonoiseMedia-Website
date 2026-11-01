"use client"

import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about/about-hero"
import { AboutFeatures } from "@/components/about/about-features"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { FooterLegalLinks } from "@/components/footer-legal-links"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />
      <AboutHero />
      <AboutFeatures />
      <AboutPhilosophy />
      <AboutTestimonials />

      <footer className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <FooterLegalLinks />
        <span>&copy; 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
