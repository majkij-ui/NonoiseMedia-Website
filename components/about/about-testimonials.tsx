"use client"

import Image from "next/image"
import { Quote } from "lucide-react"
import { TrustedByLogos } from "@/components/trusted-by-logos"
import { trustedBy } from "@/lib/projects"
import { testimonials, type TestimonialBrand } from "@/lib/testimonials"

const CIONET_TESTIMONIAL_LOGO_SRC =
  "https://assets.nonoise.media/logos/cionet-b.png"

function logoForBrand(brand: TestimonialBrand) {
  return trustedBy.find((b) => b.name === brand)
}

function testimonialLogoSrc(brand: TestimonialBrand, fallbackSrc: string) {
  if (brand === "CIONET") return CIONET_TESTIMONIAL_LOGO_SRC
  return fallbackSrc
}

type AboutTestimonialsProps = {
  /** Work-style client logos under the main heading (no duplicate “ZAUFALI NAM” label). */
  showTrustedLogos?: boolean
}

export function AboutTestimonials({ showTrustedLogos = false }: AboutTestimonialsProps) {
  return (
    <section className="relative">
      <div className="px-6 py-16 md:px-12 md:py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Referencje
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-7xl uppercase leading-none tracking-[0.02em] text-foreground md:text-8xl lg:text-9xl">
          ZAUFALI
          <br />
          NAM
        </h2>
        {showTrustedLogos ? (
          <div className="mt-8 md:mt-10">
            <TrustedByLogos withLabel={false} />
          </div>
        ) : null}
      </div>

      {testimonials.map((slide, i) => {
        const brandLogo = logoForBrand(slide.brand)
        const num = `${String(i + 1).padStart(2, "0")} / ${slide.company}`
        return (
          <div
            key={slide.company}
            className="sticky top-0 flex h-[100dvh] w-full items-center"
            style={{ zIndex: i + 1 }}
          >
            <div
              className={`flex h-full w-full items-center overflow-y-auto px-6 py-16 md:overflow-visible md:px-12 md:py-0 ${
                i % 2 === 0 ? "bg-surface-raised" : "bg-surface"
              }`}
            >
              <div className="relative mx-auto w-full max-w-[90rem]">
                <div className="max-w-2xl">
                  <span className="mb-8 block font-mono text-sm tracking-[0.1em] text-foreground/50 md:text-base">
                    {num}
                  </span>
                  <Quote className="mb-4 h-5 w-5 text-foreground/25" strokeWidth={1.2} />
                  <p className="mb-10 font-sans text-base leading-[1.7] tracking-tight text-foreground/70 md:text-lg md:leading-[1.75]">
                    {slide.text}
                  </p>
                  <div className="border-t border-foreground/10 pt-4">
                    <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
                      {slide.author}
                    </p>
                    {slide.role ? (
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-foreground/45">
                        {slide.role}
                      </p>
                    ) : null}
                    {slide.pendingConsent ? (
                      <p className="mt-3 inline-block border border-amber-400/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300">
                        Szkic · czeka na zgodę autorki
                      </p>
                    ) : null}
                  </div>
                </div>

                {brandLogo ? (
                  <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[140px] w-[min(280px,42vw)] -translate-y-1/2 md:right-12 md:flex md:h-[180px] md:w-[min(340px,36vw)] md:items-center md:justify-end">
                    <div
                      className={`relative h-full w-full ${
                        slide.brand === "CIONET" || slide.brand === "BAKL" ? "scale-[0.7]" : ""
                      }`}
                    >
                      <Image
                        src={testimonialLogoSrc(slide.brand, brandLogo.src)}
                        alt={brandLogo.name}
                        fill
                        sizes="(max-width: 900px) 42vw, 340px"
                        className="origin-right object-contain object-right opacity-[0.25]"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
