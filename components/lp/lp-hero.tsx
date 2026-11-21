"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { AnimatedHomeButton } from "@/components/animated-home-button"
import { cinematicEase } from "@/components/about/constants"
import { sendGTMEvent } from "@/lib/gtm"
import { scrollToLead } from "@/components/lp/scroll-to-lead"

const HomeReelPlayingUI = dynamic(
  () =>
    import("@/components/home/home-reel-playing-ui").then((m) => ({
      default: m.HomeReelPlayingUI,
    })),
  { ssr: false }
)

/**
 * First thing painted, before the reel has loaded: a still that is already on
 * the CDN. The reel fades in over it once it can play, so a slow connection
 * sees a picture instead of a black screen. (A frame of the reel itself would
 * make the hand-over seamless; swap this URL when one is uploaded.)
 */
const HERO_POSTER = "https://assets.nonoise.media/videos/PHH.webp"

type LpHeroProps = {
  /** Tells the page when the reel takes over the screen, so nothing else sits on its controls. */
  onPlayingChange?: (playing: boolean) => void
}

export function LpHero({ onPlayingChange }: LpHeroProps) {
  const t = useTranslations("lp.kampania")
  const tCta = useTranslations("cta")
  const tReel = useTranslations("reel")

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  /** False until the reel has a frame to show; the poster covers the wait. */
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    onPlayingChange?.(isPlaying)
  }, [isPlaying, onPlayingChange])

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

    // The video is in the server HTML, so it may already have data before this runs.
    const markReady = () => setVideoReady(true)
    video.addEventListener("loadeddata", markReady)
    if (video.readyState >= 2) markReady()

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    if (!video.paused) {
      animationId = requestAnimationFrame(updateProgress)
    }

    return () => {
      cancelAnimationFrame(animationId)
      video.removeEventListener("loadeddata", markReady)
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
      {/* Poster — painted first, fades out once the reel has a frame */}
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover transition-opacity duration-700"
        style={{ opacity: videoReady ? 0 : 0.55 }}
      />

      {/* Background video — ambient low opacity; goes full when reel is open */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: !videoReady ? 0 : isPlaying ? 1 : 0.55 }}
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
            {/* Content — full width on a phone, anchored at 50% from the left on desktop */}
            <div
              className={`flex flex-1 items-center pt-16 md:pt-14 landscape-phone:!pt-6`}
            >
              <div className="w-full px-6 md:pl-[50%] md:pr-12">
                {/* What and where, in the words people search for */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`mb-3 font-mono text-[11px] uppercase leading-snug tracking-[0.2em] text-foreground/70 md:mb-4 landscape-phone:!mb-2 landscape-phone:!text-[10px]`}
                >
                  {t("label")}
                </motion.p>

                {/* Headline — exactly two lines; fluid size so neither line wraps to a third */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
                  className={`w-full max-w-[min(100%,22rem)] text-left font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw+0.85rem,4.48rem)] uppercase leading-[0.92] tracking-[0.02em] text-foreground landscape-phone:!text-[clamp(1.2rem,4.2vw+0.35rem,2.05rem)]`}
                >
                  <span className="block whitespace-nowrap">WYBIJ SIĘ</span>
                  <span className="block whitespace-nowrap">PONAD&nbsp;SZUM</span>
                </motion.h1>

                {/* One sentence: who we are, where, what we make */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`mt-4 max-w-sm text-pretty font-sans text-base leading-relaxed text-foreground/85 md:mt-5 md:text-lg landscape-phone:!mt-2 landscape-phone:!text-sm`}
                >
                  {t("body")}
                </motion.p>

                {/* One line of proof */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className={`mt-4 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-foreground/60 landscape-phone:hidden`}
                >
                  {t("proof")}
                </motion.p>

                {/* One primary action; the reel is a quiet second choice */}
                <div
                  className={`mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8 landscape-phone:!mt-4`}
                >
                  <AnimatedHomeButton
                    text={tCta("quote")}
                    onClick={() => {
                      sendGTMEvent("lp_quote_click")
                      scrollToLead()
                    }}
                    entranceDelay={0.05}
                    entranceFrom="left"
                    className={`!text-[1.85rem] md:!text-[2.33rem] landscape-phone:!text-[1.28rem]`}
                  />
                  <motion.button
                    type="button"
                    onClick={handlePlayReel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="group flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <span aria-hidden className="text-[10px]">
                      ▶
                    </span>
                    <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-foreground">
                      {tCta("playReel")}
                    </span>
                    <span aria-hidden className="text-foreground/40">
                      {formatTime(currentTime)}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Scroll cue — label + double chevron stacked (bounce) */}
            <div className={`pointer-events-none flex justify-center pb-6 md:pb-8 landscape-phone:!pb-3`}>
              <div
                aria-label="Przewiń niżej"
                className="inline-flex items-center gap-3 text-foreground/50"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  Scroll
                </span>
                <motion.div
                  className="inline-flex flex-col items-center leading-none"
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown size={18} strokeWidth={1.8} />
                  <span className="-mt-1.5">
                    <ChevronDown size={18} strokeWidth={1.8} />
                  </span>
                </motion.div>
              </div>
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
