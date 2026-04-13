"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LayoutGroup, motion } from "framer-motion"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ProjectVideoModal } from "@/components/project-video-modal"
import type { Project } from "@/lib/projects"
import { projects } from "@/lib/projects"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const
const layoutSpring = { type: "spring" as const, stiffness: 250, damping: 25 }

type ProjectThumbnailGridProps = {
  projectsList?: Project[]
}

export function ProjectThumbnailGrid({ projectsList = projects }: ProjectThumbnailGridProps) {
  const t = useTranslations("lp.kampania")
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [useSharedLayout, setUseSharedLayout] = useState(false)

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

  const activeProject = projectsList.find((p) => p.id === activeProjectId)

  useEffect(() => {
    if (!isVideoOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false)
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
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div id="portfolio" className="mb-10 md:mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("portfolioLabel")}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground md:text-6xl lg:text-7xl">
            {t("portfolioTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3 md:gap-2">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: cinematicEase }}
              className="aspect-[4/5] md:aspect-[3/4]"
            >
              <button
                type="button"
                onClick={() => openProjectVideo(project.id, project.video)}
                className={`group relative block h-full w-full overflow-hidden border border-foreground/10 bg-neutral-950 text-left ${
                  activeProjectId === project.id && isVideoOpen ? "pointer-events-none opacity-40" : ""
                }`}
                aria-label={t("playVideoAria", { title: project.title })}
              >
                <motion.div
                  layoutId={`project-media-${project.id}`}
                  transition={layoutSpring}
                  className="relative h-full w-full"
                >
                  <motion.div
                    className="relative h-full w-full"
                    whileHover="hover"
                    initial="initial"
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-background/0"
                      variants={{
                        hover: { backgroundColor: "rgba(0,0,0,0.35)" },
                        initial: { backgroundColor: "rgba(0,0,0,0.12)" },
                      }}
                      transition={{ duration: 0.35 }}
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-3 md:p-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 md:text-[11px]">
                        {project.client}
                      </span>
                      <span className="mt-1 font-[family-name:var(--font-display)] text-lg uppercase leading-tight tracking-[0.02em] text-white md:text-xl">
                        {project.title}
                      </span>
                    </div>
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                      variants={{
                        hover: { opacity: 1, scale: 1 },
                        initial: { opacity: 0.85, scale: 0.94 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm md:h-14 md:w-14">
                        <Play size={22} fill="currentColor" />
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center md:mt-10">
          <Link
            href="/work"
            className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline py-2"
          >
            {t("moreWork")}
          </Link>
        </p>
      </section>

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
    </LayoutGroup>
  )
}
