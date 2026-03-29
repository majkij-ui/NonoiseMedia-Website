"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function AboutOldPage() {
  const gridImages = Array.from({ length: 30 }, (_, i) => `https://assets.nonoise.media/about/collage${i + 1}.png`)
  const cinematicEase = [0.25, 0.1, 0.25, 1] as const
  const testimonials = [
    {
      text: "Doskonale odnajdują się w specyfice pracy z klientem korporacyjnym, łącząc wysoką estetykę nagrań z dyskrecją i szybkim czasem realizacji. Pełne zrozumienie biznesowych potrzeb klienta.",
      author: "Martyna Mayer, Senior Project Manager, DE Group",
    },
    {
      text: "Nasza branża wymagała pracy w trudnych warunkach plenerowych i uchwycenia dynamicznej akcji. Nonoise Media wykazało się najwyższym profesjonalizmem, kreatywnością i perfekcją techniczną.",
      author: "Micheal MacDonald, Właściciel, Big Air Kite Center",
    },
    {
      text: "Zrealizowali dla nas szereg spotów reklamowych oraz produkcji wizerunkowych. Wszystkie projekty zostały wykonane z najwyższą starannością, terminowo i wysoce profesjonalnie.",
      author: "Marcin Jurasz, Marketing Manager, 7 Anna Group",
    },
  ]
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
  const testimonialsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  }
  const testimonialItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: cinematicEase },
    },
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      {/* Hero Section */}
      <section className="flex min-h-[88vh] items-end px-6 pb-24 pt-32 md:px-12">
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
            Odrzucamy to, co zbędne, by skupić się na czystym, wizualnym storytellingu. Łączymy najnowsze technologie, sprzęt klasy kinowej i 5 lat doświadczenia na planie. Dzięki optymalizacji procesów dostarczamy jakość zarezerwowaną dotąd dla dużych domów produkcyjnych, zachowując zwinność i elastyczność. Tworzymy bez agencyjnego narzutu, ale z bezkompromisowym naciskiem na detal.
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
              <span className="font-semibold text-foreground">Branża wideo przeszła transformację,</span>{" "}
              <br />
              a demokratyzacja sprzętu i branżowych sekretów zmieniła zasady gry. W Nonoise Media odrzucamy ociężałe schematy dużych agencji na rzecz maksymalnej zwinności, budując studio nowej generacji.
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
            Naszą siłą jest połączenie 5 lat rynkowego doświadczenia z <span className="font-bold text-foreground">technologiczną rewolucją jaką stanowi AI</span>. Odcinamy zbędne koszty operacyjne, optymalizujemy procesy i skupiamy się wyłącznie na dostarczeniu produktu dopasowanego do Twoich potrzeb.
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
              Od koncepcji po finalną postprodukcję — każdy etap realizujemy z najwyższą starannością. Wierzymy w siłę wizualnego storytellingu i jego <span className="font-bold text-foreground">zdolność do łączenia ludzi z markami na głębszym poziomie.</span>
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
                <span className="font-semibold text-foreground">Branża wideo przeszła transformację,</span>{" "}
                <br />
                a demokratyzacja sprzętu i branżowych sekretów zmieniła zasady gry. W Nonoise Media odrzucamy ociężałe schematy dużych agencji na rzecz maksymalnej zwinności, budując studio nowej generacji.
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
                Naszą siłą jest połączenie 5 lat rynkowego doświadczenia z <span className="font-bold text-foreground">technologiczną rewolucją jaką stanowi AI</span>. Odcinamy zbędne koszty operacyjne, optymalizujemy procesy i skupiamy się wyłącznie na dostarczeniu produktu dopasowanego do Twoich potrzeb.
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
                Od koncepcji po finalną postprodukcję — każdy etap realizujemy z najwyższą starannością. Wierzymy w siłę wizualnego storytellingu i jego <span className="font-bold text-foreground">zdolność do łączenia ludzi z markami na głębszym poziomie.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pb-32 pt-4 md:pb-32 md:pt-6">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.03em] text-foreground md:text-5xl">
                REFERENCJE
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              variants={testimonialsContainer}
              className="col-span-12 grid grid-cols-1 gap-12 md:col-span-9 md:grid-cols-3"
            >
              {testimonials.map((testimonial) => (
                <motion.blockquote
                  key={testimonial.author}
                  variants={testimonialItem}
                  className="border-t border-white/20 pt-6"
                >
                  <Quote className="mb-4 h-4 w-4 text-foreground/40" strokeWidth={1.5} />
                  <p className="text-pretty font-sans text-base leading-relaxed text-foreground/90">
                    {testimonial.text}
                    <span aria-hidden="true">"</span>
                  </p>
                  <p className="mt-6 text-sm text-foreground/60">{testimonial.author}</p>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>© 2026 NONOISE MEDIA</span>
      </footer>
    </main>
  )
}
