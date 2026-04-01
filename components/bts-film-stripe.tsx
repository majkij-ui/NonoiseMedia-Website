"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type BtsFilmStripeProps = {
  images: string[]
  title: string
}

export function BtsFilmStripe({ images, title }: BtsFilmStripeProps) {
  const [stripeImages, setStripeImages] = useState(() => images.slice(0, 6))
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number | null>(null)
  const [scrollDirection, setScrollDirection] = useState<-1 | 0 | 1>(0)

  useEffect(() => {
    // Randomize BTS frames after mount to avoid server/client hydration mismatches.
    const copy = images.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setStripeImages(copy.slice(0, 6))
  }, [images])

  const startScroll = (direction: -1 | 1) => {
    lastFrameTimeRef.current = null
    setScrollDirection(direction)
  }

  const stopScroll = () => {
    setScrollDirection(0)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container || scrollDirection === 0) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      lastFrameTimeRef.current = null
      return
    }

    const speedPxPerSecond = 480

    const animate = (time: number) => {
      const node = scrollRef.current
      if (!node) return

      // Skip the math on the very first frame to establish a valid time baseline
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = time
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaSeconds = (time - lastFrameTimeRef.current) / 1000
      lastFrameTimeRef.current = time

      const maxScroll = node.scrollWidth - node.clientWidth
      if (maxScroll <= 0) {
        setScrollDirection(0)
        return
      }

      const next = node.scrollLeft + scrollDirection * speedPxPerSecond * deltaSeconds
      const clamped = Math.max(0, Math.min(maxScroll, next))
      node.scrollLeft = clamped

      // Only stop if we hit the boundary in our CURRENT direction of travel
      if (scrollDirection === 1 && clamped >= maxScroll) {
        setScrollDirection(0)
        return
      }
      if (scrollDirection === -1 && clamped <= 0) {
        setScrollDirection(0)
        return
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [scrollDirection])

  return (
    <div className="relative w-full max-w-full">
      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-row flex-nowrap gap-4 overflow-x-auto pr-10 md:gap-6 md:pr-14"
      >
        {stripeImages.map((src, index) => (
          <motion.div
            key={`${title}-${index}-${src}`}
            whileHover={{ scale: 1.01, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="shrink-0 border border-white/10 bg-black/30 opacity-60"
          >
            <Image
              src={src}
              alt={`${title} BTS frame ${index + 1}`}
              width={720}
              height={224}
              sizes="(max-width: 768px) 45vw, 360px"
              className="h-40 w-auto object-contain md:h-56"
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop hover zones for continuous directional scrolling */}
      <div
        className="pointer-events-auto absolute inset-y-0 left-0 z-30 hidden w-[15%] bg-gradient-to-r from-black/60 to-transparent md:block"
        onMouseEnter={() => startScroll(-1)}
        onMouseLeave={stopScroll}
      />
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 z-30 hidden w-[15%] bg-gradient-to-l from-black/60 to-transparent md:block"
        onMouseEnter={() => startScroll(1)}
        onMouseLeave={stopScroll}
      />
    </div>
  )
}
