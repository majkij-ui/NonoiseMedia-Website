"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

type NavigationProps = {
  fixed?: boolean
}

export function Navigation({ fixed = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header
        className={`${fixed ? "fixed left-0 right-0 top-0 z-40" : ""} flex items-center justify-between px-6 py-6 md:px-12`}
      >
        <div className="flex items-center gap-4">
          <AnimatedMenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
          <Link href="/" className="flex items-center gap-2.5">
            <img src="https://assets.nonoise.media/logos/logo-orb.png" alt="Nonoise Media" className="h-5 w-5" />
            <span className="text-sm font-light tracking-[0.3em] text-foreground">NONOISE MEDIA</span>
          </Link>
        </div>
        <div className="w-10" />
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          >
            <div className="flex justify-between px-6 py-6 md:px-12">
              <div className="flex items-center gap-4">
                <AnimatedMenuButton isOpen={true} onClick={() => setIsMenuOpen(false)} />
                <div className="flex items-center gap-2.5">
                  <img src="https://assets.nonoise.media/logos/logo-orb.png" alt="Nonoise Media" className="h-5 w-5" />
                  <span className="text-sm font-light tracking-[0.3em] text-foreground">NONOISE MEDIA</span>
                </div>
              </div>
              <div className="w-10" />
            </div>

            <nav className="flex flex-1 items-center">
              <div className="flex w-full flex-col gap-1 pl-[50%] pr-6 md:pr-12">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
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
                        onClick={() => setIsMenuOpen(false)}
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
                        <span className="relative z-10 text-foreground mix-blend-difference">{link.label}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AnimatedMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex h-10 w-10 items-center justify-center"
      aria-label={isOpen ? "Close menu" : "Open menu"}
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
