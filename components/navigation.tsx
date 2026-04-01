"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NAV_LINK_KEYS } from "@/lib/nav-links"

const NavigationMenuOverlay = dynamic(
  () =>
    import("@/components/navigation-menu-overlay").then((m) => ({
      default: m.NavigationMenuOverlay,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        aria-busy
        aria-label="Loading menu"
      />
    ),
  }
)

type NavigationProps = {
  fixed?: boolean
}

export function Navigation({ fixed = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const showCta = pathname === "/work" || pathname === "/offer" || pathname === "/about"

  useEffect(() => {
    if (!showCta) {
      setHasScrolled(false)
      return
    }

    const onScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [showCta])

  return (
    <>
      <header
        className={`${fixed ? "fixed left-0 right-0 top-0 z-40" : ""} flex items-center justify-between px-6 py-6 md:px-12`}
      >
        <div className="flex items-center gap-4">
          <AnimatedMenuButton isOpen={false} onClick={() => setIsMenuOpen(true)} />
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="https://assets.nonoise.media/logos/logo-orb.png"
              alt="Nonoise Media"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-sm font-light tracking-[0.3em] text-foreground">NONOISE MEDIA</span>
          </Link>
        </div>
        <div className="flex w-10 items-center justify-end gap-4 md:w-auto">
          {showCta && hasScrolled && (
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.5 }}
            >
              <HeaderCtaButton />
            </motion.div>
          )}
          <LanguageSwitcher />
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? <NavigationMenuOverlay onClose={() => setIsMenuOpen(false)} /> : null}
      </AnimatePresence>

      {showCta && hasScrolled && (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-3 md:hidden">
          <div className="pointer-events-auto w-max shrink-0">
            <HeaderCtaButton />
          </div>
        </div>
      )}
    </>
  )
}

function HeaderCtaButton() {
  const tCta = useTranslations("cta")
  const text = tCta("headerCta")
  const letters = text.split("")

  return (
    <motion.div whileHover="hover" initial="initial" animate="animate">
      <Link
        href="/contact"
        className="group relative isolate block overflow-hidden px-[2.07px] py-[0.518px] font-[family-name:var(--font-display)] text-[2.22525rem] uppercase leading-none tracking-[0.02em] md:px-[1.44px] md:py-[0.36px] md:text-[1.944rem]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 bg-white"
          variants={{
            initial: { scaleX: 0, originX: 1 },
            animate: { scaleX: 1, originX: 1 },
          }}
          transition={{ delay: 1.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        <motion.div
          className="absolute inset-0 z-10 bg-black"
          variants={{
            initial: { x: "-100%" },
            hover: { x: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        />

        <span className="relative z-20 flex whitespace-pre text-white mix-blend-difference transition-colors duration-300 group-hover:text-white">
          {letters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: [0, 1, 0, 1],
                  transition: {
                    delay: index * 0.06,
                    duration: 0.3,
                    times: [0, 0.4, 0.6, 1],
                  },
                },
              }}
              className="whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </span>
      </Link>
    </motion.div>
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
  const tReel = useTranslations("reel")

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
