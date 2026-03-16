"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  const gridImages = Array.from({ length: 30 }, (_, i) => `https://nonoise.media/about/collage${i + 1}.png`)
  const cinematicEase = [0.25, 0.1, 0.25, 1] as const
  const gridItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.floor(i / 6) * 0.2,
        duration: 0.8,
        ease: cinematicEase,
      },
    }),
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      {/* Hero Section */}
      <section className="flex min-h-[70vh] items-end px-6 pb-24 pt-32 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-6xl"
        >
          <h1 className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            WYBIJ SIĘ
            <br />
            PONAD SZUM
          </h1>
          <p className="mt-8 max-w-2xl text-pretty font-sans text-base leading-relaxed text-foreground/80 md:text-lg">
            Odrzucamy to, co zbędne, by skupić się na czystym, wizualnym storytellingu. Łączymy najwyższej klasy technologię z rzemieślniczym podejściem do światła i dźwięku.
          </p>
        </motion.div>
      </section>

      {/* Editorial Layout Section */}
      <section className="min-h-screen px-6 pb-32 pt-32 md:px-12 md:pt-40">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-16 md:hidden">
          {/* 5x6 Image Grid - Mobile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="grid grid-cols-6 gap-2"
          >
            {gridImages.map((src, i) => (
              <motion.div key={i} custom={i} variants={gridItemVariant} className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover aspect-square grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-[2000ms] ease-out hover:duration-[50ms]"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Paragraph 1 - Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xs"
          >
            <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
              <span className="font-semibold text-foreground">Nonoise Media to niezależne studio</span>{" "}
              produkcji wideo, które łączy pasję do opowiadania historii z techniczną perfekcją. Każdy projekt traktujemy jako unikalną okazję do stworzenia czegoś wyjątkowego.
            </p>
          </motion.div>

          {/* Paragraph 2 - Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xs border-t border-foreground/20 pt-6"
          >
            <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
              Współpracujemy z markami, które cenią jakość i autentyczność. Nasz zespół to doświadczeni filmowcy, którzy rozumieją, że każdy detal ma znaczenie w budowaniu wizualnej narracji.
            </p>
          </motion.div>

          {/* Paragraph 3 - Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xs"
          >
            <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
              Od koncepcji po finalną postprodukcję — każdy etap realizujemy z najwyższą starannością. Wierzymy w siłę wizualnego storytellingu i jego zdolność do łączenia ludzi z markami na głębszym poziomie.
            </p>
          </motion.div>
        </div>

        {/* Desktop Editorial Grid Layout */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-4">
          {/* 5x6 Image Grid - Spans col 2-6 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="col-span-5 col-start-2 row-span-3 row-start-1"
          >
            <div className="grid grid-cols-6 gap-2 md:gap-2.5">
              {gridImages.map((src, i) => (
                <motion.div key={i} custom={i} variants={gridItemVariant} className="aspect-square overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover aspect-square grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-[2000ms] ease-out hover:duration-[50ms]"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Paragraph 1 - Top Right, aligned with image grid top */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="col-span-3 col-start-8 row-start-1 self-start"
          >
            <div className="max-w-xs">
              <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
                <span className="font-semibold text-foreground">Nonoise Media to niezależne studio</span>{" "}
                produkcji wideo, które łączy pasję do opowiadania historii z techniczną perfekcją. Każdy projekt traktujemy jako unikalną okazję do stworzenia czegoś wyjątkowego.
              </p>
            </div>
          </motion.div>

          {/* Paragraph 2 - Middle Right, offset further right with border */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="col-span-3 col-start-9 row-start-2 self-center"
          >
            <div className="max-w-xs border-t border-foreground/20 pt-6">
              <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
                Współpracujemy z markami, które cenią jakość i autentyczność. Nasz zespół to doświadczeni filmowcy, którzy rozumieją, że każdy detal ma znaczenie w budowaniu wizualnej narracji.
              </p>
            </div>
          </motion.div>

          {/* Paragraph 3 - Right column, aligned with paragraph 1 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="col-span-3 col-start-8 row-start-3 self-start"
          >
            <div className="max-w-xs border-t border-foreground/20 pt-6">
              <p className="text-pretty font-sans text-sm leading-relaxed text-foreground/80">
                Od koncepcji po finalną postprodukcję — każdy etap realizujemy z najwyższą starannością. Wierzymy w siłę wizualnego storytellingu i jego zdolność do łączenia ludzi z markami na głębszym poziomie.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>© 2024</span>
        <span>WARSAW, POLAND</span>
      </footer>
    </main>
  )
}
