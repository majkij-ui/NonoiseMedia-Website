"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { Play, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BtsFilmStripe } from "@/components/bts-film-stripe"

// Project data
const projects = [
  {
    id: 1,
    title: "Gościnni z natury",
    subtitle: "Film wizerunkowy",
    client: "Polski Holding Hotelowy",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/PHH.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/PHH.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/phhproduction1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/phhproduction2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/phhproduction3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/phhproduction4.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/phhproduction5.png",
    ],
    challenge: "Klient – lider polskiego rynku hotelarskiego przechodzący rebranding – potrzebował emocjonalnego filmu wizerunkowego premium. Głównym wyzwaniem była logistyka: stworzenie ujęć o najwyższej kinowej jakości w wielu odległych od siebie lokacjach przy bardzo napiętym harmonogramie.",
    solution: "Kluczem było szybkie zgranie wizji dzięki precyzyjnej komunikacji oraz dopracowanym moodboardom. Elastycznie dobieraliśmy wielkość ekipy – od zwinnego, mobilnego teamu po rozbudowany set w najważniejszych scenach. Charakterystyczną plastykę obrazu osiągnęliśmy, łącząc najwyszej klasy kamerę z organicznym obrazkiem obiektywów vintage."
  },
  {
    id: 2,
    title: "E-GRAVEL REVOLUTION",
    subtitle: "Film produktowy",
    client: "Rondo",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Rondo.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Rondo.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/rondobts1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/rondobts2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/rondobts3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/rondobts4.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/rondobts5.png",
    ],
    challenge: "Wprowadzenie na rynek pionierskiego elektrycznego gravela polskiej marki butikowej, słynącej z wyjątkowego designu swoich rowerów. Naszym zadaniem było uchwycenie esencji e-gravela: bezkompromisowej radości z jazdy niezależnie od formy. Zależało nam na pokazaniu, że napęd elektryczny ułatwia strome podjazdy, zaciera różnice kondycyjne i czyni z roweru niezwykle wszechstronne narzędzie – od leśnych szlaków po miejskie dojazdy",
    solution: "Postawiliśmy na rygorystyczny dobór lokacji pod kątem najlepszych warunków świetlnych oraz elementów otoczenia wspomagających naszą narrację. Aby oddać dynamiczny charakter produktu, zaangażowaliśmy elitarnego operatora drona FPV. Pozwoliło to na rejestrację niezwykle widowiskowych, bliskich ujęć w gęstym leśnym terenie, z perspektywy niemożliwej do osiągnięcia tradycyjnymi metodami. Całość spięliśmy nowoczesnym udźwiękowieniem i animacjami, które napędzały rytm montażu równie mocno, co sam e-gravel."
  },
  {
    id: 3,
    title: "Przestrzeń biurowa w sercu Warszawy",
    subtitle: "Kampania reklamowa",
    client: "OmniOffice",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Omni.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Omni.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/omniproduction1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/omniproduction2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/omniproduction3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/omniproduction4.PNG",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/omniproduction5.png",
    ],
    challenge: "Stworzenie nowoczesnej, zoptymalizowanej budżetowo kampanii na potrzeby mediów społecznościowych dla przestrzeni biurowych w centrum Warszawy. Głównym wyzwaniem była logistyka: sfilmowanie aż 6 lokacji w zaledwie 2 dni zdjęciowe, bez jakichkolwiek kompromisów w kwestii jakości obrazu. Dodatkowo przestrzenie biurowe to często wielkie okna i duzo światła, co wymuszało bardzo staranne planowanie i wspomaganie się duza mocą lamp.",
    solution: "Precyzyjny scouting pozwolił nam dokladnie zaplanować i skompresować harmonogram pracy. Prestiżowe położenie biur podkreśliliśmy dynamicznymi ujęciami z drona. Zamiast pokazywać sterylne, chłodne wnętrza, wpletliśmy w kadry starannie dobranych epizodystów. Ich obecność ożywiła przestrzeń, nadając kampanii autentyczny, lifestylowy i wysoce angażujący charakter."
  },
  {
    id: 4,
    title: "Networking kadry C-level",
    subtitle: "Reportaż eventowy",
    client: "CIONET",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/CIONET.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/CIONET.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/CIONET1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/CIONET2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/CIONET3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/CIONET4.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/CIONET5.png",
    ],
    challenge: "Dokumentacja zamkniętych spotkań networkingowych dla najwyższej kadry zarządzającej. Cel: jakość obrazu oddająca prestiż wydarzenia, realizowana przy niemal zerowej ingerencji w przestrzeń gości.",
    solution: "Zastosowaliśmy strategię 'fly-on-the-wall'. Lekki i mobilny sprzęt i lata współpracy pozwalają nam działać w pełnej dyskrecji. Kompleksowo obsługujemy jednak każdy rodzaj eventu – płynnie rozszerzając zespół o drugi unit, który równolegle realizuje profesjonalnie doświetlone wywiady i testimoniale w osobno wydzielonej strefie."
  },
  {
    id: 5,
    title: "W RYTMIE SŁÓW",
    subtitle: "Seria teledysków",
    client: "Fundacja FIRE",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/wrytmieslow.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Wrytmieslow.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/wrytmieslowbts1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/wrytmieslowbts2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/wrytmieslowbts3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/wrytmieslowbts4.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/wrytmieslowbts5.png",
    ],
    challenge: "Realizacja 12 unikalnych teledysków w zaledwie 3 dni zdjęciowe, dysponując wyłącznie jedną przestrzenią studia nagraniowego. Głównym wyzwaniem było nadanie każdemu z młodych artystów indywidualnego, niepowtarzalnego charakteru wizualnego pod ogromną presją czasu.",
    solution: "Postawiliśmy na ekstremalnie elastyczne i kreatywne sety oświetleniowe, budując unikalny klimat dla każdego twórcy. Świadomie zredukowaliśmy inwazyjność sprzętu na planie. Zespół kamerowy pracował z absolutną dyskrecją, dając młodym twórcom przestrzeń do swobodnej ekspresji bez poczucia bycia obserwowanym."
  },
  {
    id: 6,
    title: "Robot na targach Warsaw Industry Week",
    subtitle: "Reportaż eventowy",
    client: "ZUT Jerzy Kunzek",
    image: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Kunzek.png",
    video: "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/videos/Kunzek.mp4",
    btsImages: [
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/kunzek1.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/kunzek2.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/kunzek3.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/kunzek4.png",
      "https://pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev/bts/kunzek5.png",
    ],
    challenge: "Stworzenie angażującego wideo z targów branżowych. Cel: płynne połączenie wywiadu pracowniczego z dynamicznym, wizualnie atrakcyjnym pokazem zautomatyzowanej linii, ze szczególnym naciskiem na ukazanie pracy robota.",
    solution: "Studyjna jakość dźwięku i obrazu w trudnych warunkach eventowych osiągnięta dzięki zwinnej, jednoosobowej ekipie. Dynamikę maszyny pokazaliśmy dzięki dronom oraz miniaturowym kamerom zamontowanym bezpośrednio na taśmie produkcyjnej, tworząc unikalne ujęcia z wnętrza procesu."
  }
]

// Trusted by logos
const trustedBy = [
  { id: 1, name: "PHH", src: "/logos/phhlogo.png" },
  { id: 2, name: "Danone", src: "/logos/danone.png" },
  { id: 3, name: "CIONET", src: "/logos/CIONET.png" },
  { id: 4, name: "Rondo", src: "/logos/Rondo%20Logo.png" },
  { id: 5, name: "FIRE", src: "/logos/fire.png" },
  { id: 6, name: "North", src: "/logos/north.png" },
  { id: 7, name: "Kunzek", src: "/logos/Kunzek.png" },
]

export default function WorkPage() {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [useSharedLayout, setUseSharedLayout] = useState(false)
  const cinematicEase = [0.25, 0.1, 0.25, 1] as const
  const revealEase = [0.16, 1, 0.3, 1] as const
  const layoutSpring = { type: "spring" as const, stiffness: 250, damping: 25 }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: cinematicEase }
    }
  }

  const openProjectVideo = (projectId: number, videoSrc?: string) => {
    if (!videoSrc) return
    setActiveProjectId(projectId)
    setUseSharedLayout(true)
    setIsVideoOpen(true)
  }

  const closeProjectVideo = () => {
    // Disable shared layout before exit so close is fade-only.
    setUseSharedLayout(false)
    setIsVideoOpen(false)
  }

  const activeProject = projects.find((project) => project.id === activeProjectId)

  useEffect(() => {
    if (!isVideoOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isVideoOpen])

  return (
    <LayoutGroup>
      <main className="relative min-h-screen w-full bg-background">
        <motion.div
          animate={{ opacity: isVideoOpen ? 0.08 : 1 }}
          transition={{ duration: 0.35, ease: cinematicEase }}
        >
          <Navigation fixed />

          {/* Hero Section */}
          <section className="flex min-h-[70vh] items-end px-6 pb-24 pt-32 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              <h1 className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
                WYBRANE
                <br />
                PROJEKTY
              </h1>
            </motion.div>
          </section>

          {/* Trusted By Section */}
          <section className="px-6 py-16 md:px-12 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: "some" }}
              variants={staggerContainer}
            >
              <motion.p
                variants={staggerItem}
                className="mb-8 text-xs tracking-[0.3em] text-muted-foreground"
              >
                ZAUFALI NAM
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap items-center gap-8 md:gap-12 lg:gap-16"
              >
                {trustedBy.map((company) => (
                  <motion.div
                    key={company.id}
                    variants={staggerItem}
                    className="group cursor-default"
                  >
                    <img
                      src={company.src}
                      alt={company.name}
                      className={`w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${
                        company.name === "Danone"
                          ? "h-6 max-w-[105px] md:h-[30px] md:max-w-[135px]"
                          : company.name === "PHH"
                            ? "h-[38px] max-w-[168px] md:h-12 md:max-w-[216px]"
                          : company.name === "CIONET"
                            ? "h-[25px] max-w-[113px] md:h-[32px] md:max-w-[146px]"
                          : company.name === "Rondo"
                            ? "h-[50px] max-w-[218px] md:h-[62px] md:max-w-[281px]"
                            : "h-8 max-w-[140px] md:h-10 md:max-w-[180px]"
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Project Case Studies */}
          <section className="px-6 pb-32 md:px-12">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0
              const slideOffset = isEven ? -80 : 80

              return (
                <article
                  key={project.id}
                  className="py-24 md:py-32 lg:py-48"
                >
                  <div
                    className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="w-full lg:w-3/5">
                      <motion.div
                        initial={{ opacity: 0, x: slideOffset }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 0.8, ease: revealEase }}
                      >
                        <motion.div className="group relative overflow-hidden" whileHover="hover">
                          {project.video ? (
                            <button
                              type="button"
                              onClick={() => openProjectVideo(project.id, project.video)}
                              className={`relative block w-full cursor-pointer text-left ${
                                activeProjectId === project.id && isVideoOpen ? "pointer-events-none opacity-0" : "opacity-100"
                              }`}
                              aria-label={`Play video for ${project.title}`}
                            >
                              <motion.div
                                layoutId={`project-media-${project.id}`}
                                transition={layoutSpring}
                              >
                                <motion.div
                                  variants={{
                                    hover: { scale: 1.03 },
                                  }}
                                  transition={{ duration: 0.6, ease: cinematicEase }}
                                >
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-auto w-full object-cover"
                                  />
                                </motion.div>
                              </motion.div>

                              <motion.div
                                className="pointer-events-none absolute inset-0 bg-background/0"
                                variants={{
                                  hover: { backgroundColor: "rgba(0,0,0,0.18)" },
                                }}
                                transition={{ duration: 0.35 }}
                              />

                              <motion.div
                                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                                variants={{
                                  hover: { opacity: 1, scale: 1 },
                                  initial: { opacity: 0.65, scale: 0.96 },
                                }}
                                initial="initial"
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/35 text-white backdrop-blur-sm">
                                  <Play size={20} fill="currentColor" />
                                </span>
                              </motion.div>
                            </button>
                          ) : (
                            <>
                              <motion.div
                                variants={{
                                  hover: { scale: 1.03 },
                                }}
                                transition={{ duration: 0.6, ease: cinematicEase }}
                              >
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="h-auto w-full object-cover"
                                />
                              </motion.div>
                              <motion.div
                                className="pointer-events-none absolute inset-0 bg-background/0"
                                variants={{
                                  hover: { backgroundColor: "rgba(0,0,0,0.1)" },
                                }}
                                transition={{ duration: 0.4 }}
                              />
                            </>
                          )}
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="mt-5 md:mt-6"
                        initial={{ opacity: 0, x: slideOffset }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{
                          opacity: { duration: 2, delay: 0.18, ease: revealEase },
                          x: { duration: 0.8, delay: 0.18, ease: revealEase },
                        }}
                      >
                        <BtsFilmStripe images={project.btsImages} title={project.title} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 0.75, delay: 0.08, ease: revealEase }}
                      className={`flex w-full flex-col justify-center lg:w-2/5 ${
                        index % 2 === 1 ? "lg:text-right" : ""
                      }`}
                    >
                      {/* Client Tag */}
                      <p className="mb-4 text-xs tracking-[0.3em] text-muted-foreground">
                        {`Klient: ${project.client}`}
                      </p>

                      {/* Title */}
                      <h2 className="mb-3 font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-5xl lg:text-6xl">
                        {project.title}
                      </h2>
                      <p className="mb-8 text-sm uppercase tracking-[0.2em] text-foreground/60 md:text-base">
                        {project.subtitle}
                      </p>

                      {/* Challenge */}
                      <div className="mb-6">
                        <p className="mb-2 text-xs tracking-[0.2em] text-muted-foreground">
                          WYZWANIE:
                        </p>
                        <p className="font-sans text-sm leading-relaxed text-foreground/70 md:text-base">
                          {project.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <p className="mb-2 text-xs tracking-[0.2em] text-muted-foreground">
                          ROZWIĄZANIE:
                        </p>
                        <p className="font-sans text-sm leading-relaxed text-foreground/70 md:text-base">
                          {project.solution}
                        </p>
                      </div>
                    </motion.div>
                  </div>
              </article>
              )
            })}
          </section>

          {/* Footer */}
          <footer className="flex items-center justify-between px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
            <span>© 2024</span>
            <span>WARSAW, POLAND</span>
          </footer>
        </motion.div>

        <AnimatePresence
          onExitComplete={() => {
            setActiveProjectId(null)
            setUseSharedLayout(false)
          }}
        >
          {isVideoOpen && activeProject && activeProject.video && (
            <motion.div className="fixed inset-0 z-[70]">
              <motion.div
                className="absolute inset-0 bg-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: cinematicEase }}
              />

              <motion.div
                layoutId={useSharedLayout ? `project-media-${activeProject.id}` : undefined}
                transition={layoutSpring}
                className="absolute inset-0 overflow-hidden bg-black"
              >
                <button
                  type="button"
                  onClick={closeProjectVideo}
                  className="absolute right-6 top-6 z-[71] flex h-12 w-12 items-center justify-center text-white/80 transition-colors hover:text-white"
                  aria-label="Close video"
                >
                  <X size={24} />
                </button>

                <motion.video
                  className="h-full w-full object-contain"
                  src={activeProject.video}
                  controls
                  autoPlay
                  playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: cinematicEase }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  )
}
