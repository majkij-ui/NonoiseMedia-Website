"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import {
  AnimatedHomeButton,
  LANDSCAPE_MOBILE_HERO,
} from "@/components/animated-home-button"
import { cinematicEase } from "@/components/about/constants"
import { sendGTMEvent } from "@/lib/gtm"

const HomeReelPlayingUI = dynamic(
  () =>
    import("@/components/home/home-reel-playing-ui").then((m) => ({
      default: m.HomeReelPlayingUI,
    })),
  { ssr: false }
)

// Same copy as the original LP hero (AboutHero defaults)
const LABEL = "Produkcja Filmowa i Wideo Dla Biznesu"
const BODY =
  "Jesteśmy polskim studiem produkcyjnym, realizującym projekty wideo od A do Z. Tworzymy wysokiej klasy filmy korporacyjne, wideo produktowe oraz angażujące spoty do kampanii reklamowych. Odpowiadamy również na dzisiejsze tempo rynku, dostarczając dynamiczny, krótki kontent na social media, który realnie wspiera sprzedaż."

export function LpHero() {
  const tCta = useTranslations("cta")
  const tReel = useTranslations("reel")

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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
    sendGTMEvent("lp_reel_click")
    setIsPlaying(true)
    setIsMuted(false)
    video.muted = false
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background video — ambient low opacity; goes full when reel is open */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: isPlaying ? 1 : 0.55 }}
        src="https://assets.nonoise.media/videos/my-reel.mp4"
        loop
        muted={isMuted}
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Dark overlay — fades away when reel is playing */}
      <div
        className="absolute inset-0 bg-background/45 transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
      />

      {/* Hero content — exits when reel is playing */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-full min-h-screen flex-col"
          >
            {/* Center content — anchored at 50% from left, same as homepage */}
            <div className="flex flex-1 items-center">
              <div className="w-full pl-[50%] pr-6 md:pr-12">
                {/* Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`mb-3 w-48 font-mono text-[10px] uppercase leading-snug tracking-[0.2em] text-muted-foreground md:mb-4 md:w-56 ${LANDSCAPE_MOBILE_HERO}:!mb-2 ${LANDSCAPE_MOBILE_HERO}:!w-40 ${LANDSCAPE_MOBILE_HERO}:!text-[8px]`}
                >
                  {LABEL}
                </motion.p>

                {/* Headline — exactly two lines; fluid size so neither line wraps to a third */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
                  className={`w-full max-w-[min(100%,22rem)] text-left font-[family-name:var(--font-display)] text-[clamp(1.65rem,7vw+0.85rem,4.48rem)] uppercase leading-[0.92] tracking-[0.02em] text-foreground md:max-w-[24rem] md:text-[clamp(3.35rem,4.2vw+2rem,6.23rem)] ${LANDSCAPE_MOBILE_HERO}:!max-w-[11rem] ${LANDSCAPE_MOBILE_HERO}:!text-[clamp(1.35rem,5vh,2.18rem)]`}
                >
                  <span className="block whitespace-nowrap">WYBIJ SIĘ</span>
                  <span className="block whitespace-nowrap">PONAD&nbsp;SZUM</span>
                </motion.h1>

                {/* Body — compact narrow column */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`mt-4 max-w-xs text-pretty font-sans text-xs leading-relaxed text-foreground/50 md:mt-5 md:text-sm ${LANDSCAPE_MOBILE_HERO}:!mt-2 ${LANDSCAPE_MOBILE_HERO}:!text-[10px]`}
                >
                  {BODY}
                </motion.p>

                {/* Diagonal button pair — compact vs home; extra top margin vs body */}
                <div
                  className={`relative mt-24 flex w-fit md:mt-20 ${LANDSCAPE_MOBILE_HERO}:!mt-6`}
                >
                  <div className="absolute bottom-full right-full m-0 p-0">
                    <AnimatedHomeButton
                      text={tCta("quote")}
                      href="/contact"
                      entranceDelay={0.05}
                      entranceFrom="left"
                      className={`!text-[1.85rem] md:!text-[2.33rem] ${LANDSCAPE_MOBILE_HERO}:!text-[1.28rem]`}
                    />
                  </div>
                  <AnimatedHomeButton
                    text={tCta("playReel")}
                    onClick={handlePlayReel}
                    entranceDelay={0.45}
                    entranceFrom="right"
                    hoverFrom="right"
                    className={`!text-[1.85rem] md:!text-[2.33rem] ${LANDSCAPE_MOBILE_HERO}:!text-[1.28rem]`}
                  />
                </div>

                {/* Timecode */}
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

            {/* Scroll cue — bottom center, horizontal layout */}
            <div className={`pointer-events-none flex justify-center pb-6 md:pb-8 ${LANDSCAPE_MOBILE_HERO}:!pb-3`}>
              <motion.div
                aria-label="Przewiń niżej"
                className="inline-flex items-center gap-2 text-foreground/40"
              >
                <motion.span
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-[9px] uppercase tracking-[0.25em]"
                >
                  Scroll
                </motion.span>
                <div className="flex items-center -space-x-1">
                  <motion.span
                    animate={{ opacity: [0.75, 0.25, 0.75] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="leading-none"
                  >
                    <ChevronDown size={14} strokeWidth={1.8} />
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.25, 0.8, 0.25] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="leading-none"
                  >
                    <ChevronDown size={14} strokeWidth={1.8} />
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reel playing overlay */}
      <AnimatePresence>
        {isPlaying ? (
          <HomeReelPlayingUI
            progress={progress}
            currentTime={currentTime}
            formatTime={formatTime}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            onClose={handleCloseReel}
            playLabel={tReel("play")}
            closeLabel={tReel("close")}
            muteLabel={tReel("mute")}
            unmuteLabel={tReel("unmute")}
          />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
