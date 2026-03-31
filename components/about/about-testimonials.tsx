"use client"

import { Quote } from "lucide-react"
import { TrustedByLogos } from "@/components/trusted-by-logos"
import { trustedBy } from "@/lib/projects"

type TestimonialBrand = "CIONET" | "BAKL" | "Rondo" | "OmniOffice" | "PHH"

const CIONET_TESTIMONIAL_LOGO_SRC =
  "https://assets.nonoise.media/logos/cionet-b.png"

function logoForBrand(brand: TestimonialBrand) {
  return trustedBy.find((b) => b.name === brand)
}

function testimonialLogoSrc(brand: TestimonialBrand, fallbackSrc: string) {
  if (brand === "CIONET") return CIONET_TESTIMONIAL_LOGO_SRC
  return fallbackSrc
}

const TESTIMONIAL_SLIDES: {
  num: string
  text: string
  author: string
  role: string
  brand: TestimonialBrand
}[] = [
  {
    num: "01 / DE GROUP - CIONET",
    text: "Firma Nonoise Media idealnie odnajduje się w pracy z kadrą zarządzającą C-level, zapewniając obsługę naszych wydarzeń z pełną dyskrecją i wyjątkową estetyką. Pan Michał wykazuje się głębokim zrozumieniem naszych celów biznesowych oraz ogromną proaktywnością w działaniu. To elastyczny i rzetelny partner, z którym z powodzeniem współpracujemy długoterminowo.",
    author: "Martyna Mayer",
    role: "Senior Project Manager",
    brand: "CIONET",
  },
  {
    num: "02 / BIG AIR KITE CENTER - BAKL",
    text: "Nonoise Media completely excels at capturing dynamic sports action in highly demanding outdoor conditions. Their technical excellence, creativity, and high professionalism significantly supported our marketing activities and social media campaigns. They are a truly reliable and highly creative business partner.",
    author: "Micheal MacDonald",
    role: "Founder",
    brand: "BAKL",
  },
  {
    num: "03 / 7 ANNA GROUP - RONDO",
    text: "Jako bezpośredni koordynator naszych projektów wideo, mogę z pełnym przekonaniem polecić zespół Nonoise Media. Doskonale poradzili sobie z produkcją dynamicznych spotów reklamowych naszych rowerów, idealnie trafiając w nasze potrzeby. To profesjonaliści, którzy realizują zlecenia należycie, w terminie i w pełnej zgodności z wymaganiami marki.",
    author: "Marcin Jurasz",
    role: "Marketing Manager",
    brand: "Rondo",
  },
  {
    num: "04 / OMNI OFFICE",
    text: "Współpraca z firmą Nonoise Media przy naszej kampanii social media przebiegła bezproblemowo. Mimo skomplikowanej logistyki i trudnych warunków zdjęciowych, niezwykle sprawnie zrealizowali materiał w naszych sześciu warszawskich biurach w zaledwie dwa dni. Z pełnym przekonaniem polecam ten zespół.",
    author: "Joanna Stychno",
    role: "Marketing Manager",
    brand: "OmniOffice",
  },
  {
    num: "05 / POLSKI HOLDING HOTELOWY",
    text: "Nonoise Media to partner, który potrafi połączyć najwyższą, kinową jakość obrazu z perfekcyjną organizacją pracy. Mimo napiętego harmonogramu i wymagającej logistyki w wielu lokacjach, zespół Pana Michała wykazał się niesamowitą elastycznością oraz pełnym zrozumieniem wizji naszego nowego wizerunku. Otrzymaliśmy produkt klasy premium, a sama współpraca przebiegła niezwykle sprawnie i profesjonalnie.",
    author: "Weronika Koper-Wójcik",
    role: "Koordynator ds. Komunikacji i PR",
    brand: "PHH",
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

      {TESTIMONIAL_SLIDES.map((slide, i) => {
        const brandLogo = logoForBrand(slide.brand)
        return (
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

                {brandLogo ? (
                  <div className="pointer-events-none absolute right-6 top-1/2 hidden w-[min(280px,42vw)] -translate-y-1/2 md:right-12 md:flex md:w-[min(340px,36vw)] md:items-center md:justify-end">
                    <img
                      src={testimonialLogoSrc(slide.brand, brandLogo.src)}
                      alt={brandLogo.name}
                      className={`max-h-[140px] w-full max-w-full origin-right object-contain object-right opacity-[0.1] md:max-h-[180px] ${
                        slide.brand === "CIONET" || slide.brand === "BAKL"
                          ? "scale-[0.7]"
                          : ""
                      }`}
                    />
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
