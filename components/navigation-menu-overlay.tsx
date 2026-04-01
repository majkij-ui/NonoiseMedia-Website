"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NAV_LINK_KEYS } from "@/lib/nav-links"

type NavigationMenuOverlayProps = {
  onClose: () => void
}

function AnimatedMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const tReel = useTranslations("reel")
  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex h-10 w-10 items-center justify-center"
      aria-label={isOpen ? tReel("closeMenu") : tReel("openMenu")}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="overflow-visible"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={springTransition}
      >
        <motion.line
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-foreground"
          initial={false}
          animate={{
            x1: isOpen ? 4 : 0,
            y1: isOpen ? 4 : isHovered ? 12 : 8,
            x2: isOpen ? 20 : 24,
            y2: isOpen ? 20 : isHovered ? 12 : 8,
          }}
          transition={springTransition}
        />
        <motion.line
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-foreground"
          initial={false}
          animate={{
            x1: 0,
            y1: 8,
            x2: isHovered && !isOpen ? 24 : 16,
            y2: 8,
            opacity: isOpen ? 0 : isHovered ? 1 : 0,
          }}
          transition={springTransition}
        />
        <motion.line
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-foreground"
          initial={false}
          animate={{
            x1: isOpen ? 4 : 0,
            y1: isOpen ? 20 : 16,
            x2: isOpen ? 20 : isHovered ? 24 : 16,
            y2: isOpen ? 4 : 16,
          }}
          transition={springTransition}
        />
      </motion.svg>
    </button>
  )
}

export function NavigationMenuOverlay({ onClose }: NavigationMenuOverlayProps) {
  const tNav = useTranslations("nav")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
    >
      <div className="flex justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-4">
          <AnimatedMenuButton isOpen onClick={onClose} />
          <div className="flex items-center gap-2.5">
            <Image
              src="https://assets.nonoise.media/logos/logo-orb.png"
              alt="Nonoise Media"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-sm font-light tracking-[0.3em] text-foreground">NONOISE MEDIA</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>

      <nav className="flex flex-1 items-center">
        <div className="flex w-full flex-col gap-1 pl-[50%] pr-6 md:pr-12">
          {NAV_LINK_KEYS.map((link, index) => (
            <motion.div
              key={link.key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative w-fit"
            >
              <motion.div initial="initial" whileHover="hover" className="relative w-fit">
                <Link
                  href={link.href}
                  className="relative inline-flex isolate overflow-hidden px-1 py-0.5 font-[family-name:var(--font-display)] text-[1.95rem] uppercase leading-none tracking-[0.02em] text-foreground md:text-[2.45rem]"
                  onClick={onClose}
                >
                  <motion.span
                    className="absolute inset-0 z-0 bg-white"
                    variants={{
                      initial: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    style={{ originX: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  <span className="relative z-10 text-foreground mix-blend-difference">{tNav(link.key)}</span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </nav>
    </motion.div>
  )
}
