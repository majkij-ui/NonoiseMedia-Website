"use client"

import { Quote, MessageSquareQuote, Handshake, Award } from "lucide-react"
import { TrustedByLogos } from "@/components/trusted-by-logos"

const TESTIMONIAL_SLIDES = [
  {
    num: "01 / DE GROUP",
    text: "Firma Nonoise Media idealnie odnajduje się w pracy z kadrą zarządzającą C-level, zapewniając obsługę naszych wydarzeń z pełną dyskrecją i wyjątkową estetyką. Pan Michał wykazuje się głębokim zrozumieniem naszych celów biznesowych oraz ogromną proaktywnością w działaniu. To elastyczny i rzetelny partner, z którym z powodzeniem współpracujemy długoterminowo.",
    author: "Martyna Mayer",
    role: "Senior Project Manager",
    Icon: MessageSquareQuote,
  },
  {
    num: "02 / BIG AIR KITE CENTER",
    text: "Nonoise Media completely excels at capturing dynamic sports action in highly demanding outdoor conditions. Their technical excellence, creativity, and high professionalism significantly supported our marketing activities and social media campaigns. They are a truly reliable and highly creative business partner.",
    author: "Micheal MacDonald",
    role: "Founder",
    Icon: Handshake,
  },
  {
    num: "03 / 7 ANNA GROUP",
    text: "Jako bezpośredni koordynator naszych projektów wideo, mogę z pełnym przekonaniem polecić zespół Nonoise Media. Doskonale poradzili sobie z produkcją dynamicznych spotów reklamowych naszych rowerów, idealnie trafiając w nasze potrzeby. To profesjonaliści, którzy realizują zlecenia należycie, w terminie i w pełnej zgodności z wymaganiami marki.",
    author: "Marcin Jurasz",
    role: "Marketing Manager",
    Icon: Award,
  },
]

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

      {TESTIMONIAL_SLIDES.map((slide, i) => (
        <div
          key={slide.num}
          className="sticky top-0 flex h-[100dvh] w-full items-center"
          style={{ zIndex: i + 1 }}
        >
          <div
            className={`flex h-full w-full items-center overflow-y-auto px-6 py-16 md:overflow-visible md:px-12 md:py-0 ${
              i % 2 === 0 ? "bg-background" : "bg-neutral-950"
            }`}
          >
            <div className="relative mx-auto w-full max-w-[90rem]">
              <div className="max-w-2xl">
                <span className="mb-8 block font-mono text-sm tracking-[0.1em] text-foreground/50 md:text-base">
                  {slide.num}
                </span>
                <Quote className="mb-4 h-5 w-5 text-foreground/15" strokeWidth={1.2} />
                <p className="mb-10 font-sans text-base leading-[1.7] tracking-tight text-foreground/70 md:text-lg md:leading-[1.75]">
                  {slide.text}
                </p>
                <div className="border-t border-foreground/10 pt-4">
                  <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.02em] text-foreground md:text-3xl">
                    {slide.author}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/35">
                    {slide.role}
                  </p>
                </div>
              </div>

              <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:right-12 md:block">
                <slide.Icon size={160} strokeWidth={0.5} className="text-foreground/[0.1]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
