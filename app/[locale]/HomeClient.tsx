"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { X, Volume2, VolumeX } from "lucide-react"
import { Navigation } from "@/components/navigation"
import {
  AnimatedHomeButton,
  LANDSCAPE_MOBILE_HERO,
} from "@/components/animated-home-button"

export default function HomeClient() {
  const tCta = useTranslations("cta")
  const tHome = useTranslations("home")
  const tReel = useTranslations("reel")
  const tFooter = useTranslations("footer")
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle video progress with smooth RAF updates
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationId: number

    const updateProgress = () => {
      if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100
        setProgress(percentage)
        setCurrentTime(video.currentTime)
      }
      animationId = requestAnimationFrame(updateProgress)
    }

    const handlePlay = () => {
      animationId = requestAnimationFrame(updateProgress)
    }

    const handlePause = () => {
      cancelAnimationFrame(animationId)
    }

    const handleEnded = () => {
      cancelAnimationFrame(animationId)
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      video.currentTime = 0
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    // Start RAF if video is already playing
    if (!video.paused) {
      animationId = requestAnimationFrame(updateProgress)
    }

    return () => {
      cancelAnimationFrame(animationId)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const handlePlayReel = () => {
    const video = videoRef.current
    if (!video) return

    setIsPlaying(true)
    setIsMuted(false)
    video.muted = false
    // Keep playback seamless; only resume if browser had paused it.
    if (video.paused) {
      void video.play().catch(() => {})
    }
  }

  const handleCloseReel = () => {
    const video = videoRef.current
    if (!video) return

    setIsPlaying(false)
    setIsMuted(true)
    video.muted = true
    // Do not pause/reset; keep the reel running in the background.
    if (video.paused) {
      void video.play().catch(() => {})
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    setIsMuted(!isMuted)
    video.muted = !isMuted
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: isPlaying ? 1 : 0.6 }}
        src="https://assets.nonoise.media/videos/my-reel.mp4"
        loop
        muted={isMuted}
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-background/40 transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
      />

      {/* UI Layer - Fades out when playing */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-full flex-col overflow-y-auto"
          >
            {/* Header */}
            <Navigation />

            {/* Center Content - Anchored at 50% from left */}
            <div className="flex flex-1 items-center">
              <div className="w-full pl-[50%] pr-6 md:pr-12">
                {/* Hero Statement - Stacked tall condensed typography in narrow column */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`mb-5 w-48 text-left font-[family-name:var(--font-display)] text-[2.15rem] uppercase leading-none tracking-[0.02em] text-foreground md:mb-6 md:w-56 md:text-[2.7rem] ${LANDSCAPE_MOBILE_HERO}:!mb-3 ${LANDSCAPE_MOBILE_HERO}:!w-40 ${LANDSCAPE_MOBILE_HERO}:!text-[1.5rem]`}
                >
                  {tHome("hero")}
                </motion.p>

                {/* CTA Buttons - Diagonal checkerboard */}
                <div
                  className={`relative mt-[3.5rem] flex w-fit md:mt-[3.1rem] ${LANDSCAPE_MOBILE_HERO}:!mt-5`}
                >
                  <div className="absolute bottom-full right-full m-0 p-0">
                    <AnimatedHomeButton text={tCta("quote")} href="/contact" entranceDelay={0.05} entranceFrom="left" />
                  </div>
                  <AnimatedHomeButton text={tCta("playReel")} onClick={handlePlayReel} entranceDelay={0.45} entranceFrom="right" hoverFrom="right" />
                </div>

                {/* Horizontal Timer - Under the button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`mt-0.5 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.02em] text-foreground/50 ${LANDSCAPE_MOBILE_HERO}:!text-sm`}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-xs">▶</span>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <footer
              className={`flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12 ${LANDSCAPE_MOBILE_HERO}:!py-4`}
            >
              <span>{tFooter("copyright")}</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playing UI */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {/* Progress Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed right-8 top-0 z-20 h-full w-px bg-foreground/20"
            >
              <motion.div
                className="w-full bg-foreground"
                style={{ height: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />

              {/* Rotated Timer - Anchored to progress point */}
              <motion.div
                className="absolute right-1 origin-top-right rotate-90 whitespace-nowrap font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.02em] text-foreground/80"
                style={{ top: `${progress}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-[8px]">▶</span>
                <span>{tReel("play")}</span>
              </motion.div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6"
            >
              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className="flex h-12 w-12 items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
                aria-label={isMuted ? tReel("unmute") : tReel("mute")}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* Close Button */}
              <button
                onClick={handleCloseReel}
                className="group relative flex h-12 items-center gap-2 overflow-hidden border border-foreground/30 px-6 text-sm tracking-widest text-foreground transition-colors hover:border-foreground"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <X size={16} />
                  {tReel("close")}
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
