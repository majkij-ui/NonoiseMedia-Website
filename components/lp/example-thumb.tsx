"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"
import type { LpExample } from "@/lib/lp-services"

/** Slow in, slow out. */
const curtainEase = [0.76, 0, 0.24, 1] as const
/** Fast in, long settle. */
const settleEase = [0.16, 1, 0.3, 1] as const

/** A playable film still. It wipes in from the left while the picture settles from a slight zoom. */
export function ExampleThumb({
  example,
  delay,
  onPlay,
  label,
  sizes,
  reveal = "mount",
}: {
  example: LpExample
  delay: number
  onPlay: (example: LpExample) => void
  label: string
  sizes: string
  /**
   * "mount": plays as soon as it is rendered (inside a panel the visitor has just opened).
   * "inView": waits until it is scrolled to (on a normal page section).
   */
  reveal?: "mount" | "inView"
}) {
  const reduceMotion = useReducedMotion()
  const wipeIn = { clipPath: "inset(0% 0% 0% 0%)" }
  const settle = { scale: 1 }
  const whenSeen = { once: true, amount: "some" } as const
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(example)}
      aria-label={label}
      initial={reduceMotion ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
      {...(reveal === "inView" ? { whileInView: wipeIn, viewport: whenSeen } : { animate: wipeIn })}
      transition={{ duration: 0.9, delay, ease: curtainEase }}
      className={`group/thumb relative block w-full overflow-hidden border border-white/15 bg-neutral-950 text-left ${
        example.vertical ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.18 }}
        {...(reveal === "inView" ? { whileInView: settle, viewport: whenSeen } : { animate: settle })}
        transition={{ duration: 1.4, delay, ease: settleEase }}
      >
        <Image src={example.image} alt="" fill sizes={sizes} className="object-cover" />
      </motion.div>
      <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover/thumb:bg-black/45" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col p-3 md:p-4">
        {/* A reel still is too narrow for the client's name; the tile already says whose it is. */}
        {example.vertical ? null : (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">{example.client}</span>
        )}
        <span
          className={`mt-1 font-[family-name:var(--font-display)] uppercase leading-tight tracking-[0.02em] text-white ${
            example.vertical ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {example.title}
        </span>
      </span>
      <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center ${example.vertical ? "h-9 w-9" : "h-12 w-12"} justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm transition-transform duration-300 group-hover/thumb:scale-110`}>
        <Play size={18} fill="currentColor" />
      </span>
    </motion.button>
  )
}
