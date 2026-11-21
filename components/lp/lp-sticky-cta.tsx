"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { CONTACT_EMAIL } from "@/lib/contact-info"
import { readConsentRaw, subscribeConsent } from "@/lib/consent"
import { sendGTMEvent } from "@/lib/gtm"
import { LEAD_SECTION_ID, scrollToLead } from "@/components/lp/scroll-to-lead"

const NOT_MOUNTED = "ssr"
const getServerSnapshot = () => NOT_MOUNTED

/**
 * Phone-only bar that keeps "write to us" and "get a quote" one tap away for
 * the whole scroll. E-mail, not a call: the owner's leads come by e-mail and
 * almost nobody phones.
 *
 * It stays out of the way whenever something else needs the bottom of the
 * screen: on the first screen (the hero has its own button), while the form
 * itself is in view, while the reel is playing (its controls live there), and
 * until the visitor has answered the cookie bar. Two bars stacked would take
 * a fifth of a phone screen.
 */
export function LpStickyCta({ hidden = false }: { hidden?: boolean }) {
  const t = useTranslations("lp.kampania")
  const consent = useSyncExternalStore(subscribeConsent, readConsentRaw, getServerSnapshot)
  const [pastHero, setPastHero] = useState(false)
  const [formInView, setFormInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener("scroll", onScroll, { passive: true })
    // A reload can restore the page mid-scroll, with no scroll event to follow.
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const section = document.getElementById(LEAD_SECTION_ID)
    if (!section || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const cookieBarOpen = consent === NOT_MOUNTED || consent === ""
  if (hidden || cookieBarOpen || !pastHero || formInView) return null

  return (
    <div className="fixed inset-x-0 bottom-[var(--consent-offset,0px)] z-50 grid grid-cols-2 gap-2 border-t border-white/20 bg-background/95 px-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm md:hidden">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        data-gaw-contact="email-sticky"
        aria-label={`${t("stickyEmail")}: ${CONTACT_EMAIL}`}
        className="flex h-11 items-center justify-center gap-2 border border-white/40 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground"
      >
        <Mail size={15} strokeWidth={1.5} />
        {t("stickyEmail")}
      </a>
      <button
        type="button"
        onClick={() => {
          sendGTMEvent("lp_sticky_quote_click")
          scrollToLead()
        }}
        className="flex h-11 items-center justify-center border border-foreground bg-foreground font-mono text-[11px] uppercase tracking-[0.18em] text-background"
      >
        {t("stickyQuote")}
      </button>
    </div>
  )
}
