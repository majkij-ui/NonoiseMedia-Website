"use client"

import { motion } from "framer-motion"
import { X, Volume2, VolumeX } from "lucide-react"

type HomeReelPlayingUIProps = {
  progress: number
  currentTime: number
  formatTime: (seconds: number) => string
  isMuted: boolean
  onToggleMute: () => void
  onClose: () => void
  playLabel: string
  closeLabel: string
  muteLabel: string
  unmuteLabel: string
}

/** Progress rail + controls when reel is playing — not needed for first paint. */
export function HomeReelPlayingUI({
  progress,
  currentTime,
  formatTime,
  isMuted,
  onToggleMute,
  onClose,
  playLabel,
  closeLabel,
  muteLabel,
  unmuteLabel,
}: HomeReelPlayingUIProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-20"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-auto fixed right-8 top-0 h-full w-px bg-foreground/20"
      >
        <motion.div
          className="w-full bg-foreground"
          style={{ height: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />

        <motion.div
          className="absolute right-1 origin-top-right rotate-90 whitespace-nowrap font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.02em] text-foreground/80"
          style={{ top: `${progress}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{formatTime(currentTime)}</span>
          <span className="mx-1 text-[8px]">▶</span>
          <span>{playLabel}</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-auto fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6"
      >
        <button
          type="button"
          onClick={onToggleMute}
          className="flex h-12 w-12 items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
          aria-label={isMuted ? unmuteLabel : muteLabel}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="group relative flex h-12 items-center gap-2 overflow-hidden border border-foreground/30 px-6 text-sm tracking-widest text-foreground transition-colors hover:border-foreground"
        >
          <span className="relative z-10 flex items-center gap-2">
            <X size={16} />
            {closeLabel}
          </span>
        </button>
      </motion.div>
    </motion.div>
  )
}
