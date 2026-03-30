"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"

/** Phone / small tablet in landscape: short viewport; keeps desktop & portrait unchanged. */
export const LANDSCAPE_MOBILE_HERO =
  "[@media(orientation:landscape)_and_(max-height:500px)_and_(max-width:1024px)]"

export function AnimatedHomeButton({
  text,
  className,
  onClick,
  href,
  entranceDelay = 0.5,
  entranceFrom = "left",
  hoverFrom = "left",
}: {
  text: string
  className?: string
  onClick?: () => void
  href?: string
  entranceDelay?: number
  entranceFrom?: "left" | "right"
  hoverFrom?: "left" | "right"
}) {
  const letters = text.split("")
  const typingDuration = (letters.length - 1) * 0.04 + 0.15
  const sweepDelay = entranceDelay + typingDuration + 0.05

  const innerClassName = `group relative block overflow-hidden px-2 py-0.5 font-[family-name:var(--font-display)] text-[2.15rem] uppercase leading-none tracking-[0.02em] md:text-[2.7rem] ${LANDSCAPE_MOBILE_HERO}:!text-[1.5rem] ${className || ""}`
  const content = (
    <motion.div initial="initial" whileHover="hover" className={innerClassName}>
      <motion.div
        className="absolute inset-0 z-0 bg-white"
        initial={{ x: entranceFrom === "right" ? "100%" : "-100%" }}
        animate={{ x: 0 }}
        transition={{ delay: sweepDelay, duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        className="absolute inset-0 z-0 bg-black"
        variants={{
          initial: { x: hoverFrom === "right" ? "100%" : "-100%" },
          hover: { x: 0 },
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />

      <span className="relative z-10 flex whitespace-nowrap text-white mix-blend-difference">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{
              delay: entranceDelay + index * 0.04,
              duration: 0.15,
              times: [0, 0.4, 0.6, 1],
            }}
            className="whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )

  if (href) return <Link href={href}>{content}</Link>
  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  )
}
