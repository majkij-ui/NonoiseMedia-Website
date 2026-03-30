"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import type { Project } from "@/lib/projects"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const
const layoutSpring = { type: "spring" as const, stiffness: 250, damping: 25 }

type ProjectVideoModalProps = {
  isOpen: boolean
  activeProject: Project | null | undefined
  useSharedLayout: boolean
  onClose: () => void
  onExitComplete: () => void
}

export function ProjectVideoModal({
  isOpen,
  activeProject,
  useSharedLayout,
  onClose,
  onExitComplete,
}: ProjectVideoModalProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && activeProject?.video && (
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
              onClick={onClose}
              className="absolute right-6 top-6 z-[71] flex h-12 w-12 items-center justify-center text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              <X size={24} />
            </button>

            <motion.video
              className="h-full w-full object-contain"
              src={activeProject.video}
              controls
              controlsList="nodownload"
              autoPlay
              playsInline
              preload="metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: cinematicEase }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
