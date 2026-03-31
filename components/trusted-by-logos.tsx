"use client"

import { motion } from "framer-motion"
import { logoSizeClass, trustedBy } from "@/lib/projects"

const cinematicEase = [0.25, 0.1, 0.25, 1] as const

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase },
  },
}

type TrustedByLogosProps = {
  /** When false, only the logo row is rendered (e.g. below an existing “ZAUFALI NAM” heading). */
  withLabel?: boolean
  className?: string
}

/** Same logo strip pattern as the Work page trusted-by block. */
export function TrustedByLogos({ withLabel = true, className = "" }: TrustedByLogosProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={staggerContainer}
      className={className}
    >
      {withLabel ? (
        <motion.p
          variants={staggerItem}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          ZAUFALI NAM
        </motion.p>
      ) : null}
      <motion.div variants={staggerContainer} className="flex flex-wrap items-center gap-8 md:gap-12 lg:gap-16">
        {trustedBy.map((company) => (
          <motion.div key={company.id} variants={staggerItem} className="group cursor-default">
            <img
              src={company.src}
              alt={company.name}
              className={`w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${logoSizeClass(company.name)}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
