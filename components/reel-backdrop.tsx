"use client"

import { useEffect, useState, type RefObject } from "react"
import Image from "next/image"

const REEL_SRC = "https://assets.nonoise.media/videos/my-reel.mp4"
/** A frame of the reel itself, taken at REEL_POSTER_TIME, where its opening fade from black has finished. */
const REEL_POSTER = "https://assets.nonoise.media/videos/reel-poster-v1.webp"
const REEL_POSTER_TIME = 1.46
/** If the poster has not arrived by then (blocked, offline cache miss), start the reel anyway. */
const POSTER_WAIT_MS = 2500

type ReelBackdropProps = {
  /** The page owns the ref: it drives play, mute and the progress bar. */
  videoRef: RefObject<HTMLVideoElement | null>
  /** The visitor opened the reel: full brightness instead of the dimmed backdrop. */
  isPlaying: boolean
  isMuted: boolean
  /** Opacity of the backdrop while it sits behind the hero text. */
  restOpacity: number
}

/**
 * The full-screen reel behind a hero, shared by the homepage and the landing page.
 *
 * Order of loading is the point: the poster (70 KB) is requested first and the
 * reel (53 MB) only once the poster is on screen. Requested together they share
 * the connection, and on a slow network the first screen stayed black for
 * seconds. The reel itself is untouched and still `preload="auto"` (owner's
 * decisions, see CLAUDE.md): only its start moves by a fraction of a second.
 *
 * The first play starts at the poster's own frame, so the hand-over from still
 * to moving picture cannot be seen. Later loops start from the reel's beginning.
 */
export function ReelBackdrop({ videoRef, isPlaying, isMuted, restOpacity }: ReelBackdropProps) {
  const [posterDone, setPosterDone] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setPosterDone(true), POSTER_WAIT_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // A visitor who presses "Play reel" before the poster has loaded should not wait for it.
  // Recorded in state, so closing the reel again cannot take the source away.
  if (isPlaying && !posterDone) setPosterDone(true)
  const started = posterDone || isPlaying

  useEffect(() => {
    const video = videoRef.current
    if (!video || !started) return

    let jumped = false
    const jumpToPosterFrame = () => {
      if (jumped) return
      jumped = true
      try {
        if (video.currentTime < REEL_POSTER_TIME) video.currentTime = REEL_POSTER_TIME
      } catch {
        // Seeking refused: the reel simply starts from its first frame.
      }
    }
    const markReady = () => {
      if (jumped && !video.seeking && video.readyState >= 2) setVideoReady(true)
    }

    video.addEventListener("loadedmetadata", jumpToPosterFrame)
    video.addEventListener("loadeddata", markReady)
    video.addEventListener("seeked", markReady)
    video.addEventListener("canplay", markReady)
    if (video.readyState >= 1) jumpToPosterFrame()
    markReady()

    return () => {
      video.removeEventListener("loadedmetadata", jumpToPosterFrame)
      video.removeEventListener("loadeddata", markReady)
      video.removeEventListener("seeked", markReady)
      video.removeEventListener("canplay", markReady)
    }
  }, [started, videoRef])

  return (
    <div
      aria-hidden
      className="reel-backdrop-in absolute inset-0 transition-opacity duration-700"
      style={{ opacity: isPlaying ? 1 : restOpacity }}
    >
      <Image
        src={REEL_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onLoad={() => setPosterDone(true)}
        onError={() => setPosterDone(true)}
      />
      {/* Opaque once ready, so it simply covers the poster: both show the same frame. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: videoReady ? 1 : 0 }}
        src={started ? REEL_SRC : undefined}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        preload="auto"
      />
    </div>
  )
}
