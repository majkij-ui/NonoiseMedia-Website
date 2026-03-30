"use client"

import { useEffect, useState } from "react"
import { LayoutGroup, motion } from "framer-motion"
import { Play } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BtsFilmStripe } from "@/components/bts-film-stripe"
import { ProjectVideoModal } from "@/components/project-video-modal"
import { logoSizeClass, projects, trustedBy } from "@/lib/projects"

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
        delayChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cinematicEase },
    },
  }

  const openProjectVideo = (projectId: number, videoSrc?: string) => {
    if (!videoSrc) return
    setActiveProjectId(projectId)
    setUseSharedLayout(true)
    setIsVideoOpen(true)
  }

  const closeProjectVideo = () => {
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
      <main className="relative min-h-screen w-full overflow-x-clip bg-background">
        <div
          className={`transition-opacity duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            isVideoOpen ? "opacity-[0.08]" : "opacity-100"
          }`}
        >
          <Navigation fixed />

          <section className="flex min-h-[70vh] items-end px-6 pb-24 pt-32 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:mb-6">
                Zobacz nasze realizacje
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
                WYBRANE
                <br />
                PROJEKTY
              </h1>
            </motion.div>
          </section>

          <section className="px-6 py-16 md:px-12 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: "some" }}
              variants={staggerContainer}
            >
              <motion.p
                variants={staggerItem}
                className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
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
                      className={`w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${logoSizeClass(company.name)}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section className="px-6 pb-32 md:px-12">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0
              const slideOffset = isEven ? -80 : 80

              return (
                <article key={project.id} className="py-24 md:py-32 lg:py-48">
                  <div
                    className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
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
                                activeProjectId === project.id && isVideoOpen
                                  ? "pointer-events-none opacity-0"
                                  : "opacity-100"
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

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 0.75, delay: 0.08, ease: revealEase }}
                      className={`flex w-full flex-col justify-center lg:w-2/5 ${
                        index % 2 === 1 ? "lg:text-right" : ""
                      }`}
                    >
                      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {`Klient: ${project.client}`}
                      </p>

                      <h2 className="mb-3 font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-5xl lg:text-6xl">
                        {project.title}
                      </h2>
                      <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 md:text-sm">
                        {project.subtitle}
                      </p>

                      <div className="mb-6">
                        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          WYZWANIE:
                        </p>
                        <p className="font-sans text-sm leading-relaxed text-foreground/70 md:text-base">
                          {project.challenge}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
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

          <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12">
            <span>© 2026 NONOISE MEDIA</span>
          </footer>
        </div>

        <ProjectVideoModal
          isOpen={isVideoOpen}
          activeProject={activeProject}
          useSharedLayout={useSharedLayout}
          onClose={closeProjectVideo}
          onExitComplete={() => {
            setActiveProjectId(null)
            setUseSharedLayout(false)
          }}
        />
      </main>
    </LayoutGroup>
  )
}
