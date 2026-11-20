/** The landing page's form section. Every call-to-action on the page leads here. */
export const LEAD_SECTION_ID = "lead"
/** The section's heading: receives focus so keyboard and screen-reader users arrive at the form too. */
export const LEAD_HEADING_ID = "lead-heading"

/** How close to the intended position counts as "arrived", in pixels. */
const TOLERANCE = 8
const CHECK_EVERY_MS = 120
const GIVE_UP_AFTER_MS = 5000

/** Stops the follow-up check of the scroll currently in flight, if any. */
let cancelPending: (() => void) | null = null

/**
 * Scrolls to the form instead of sending the visitor to another page.
 *
 * The page above the form changes height while it scrolls past (lazy images,
 * reveal animations), so a smooth scroll aimed at where the form *was* can
 * stop a little short or a little past it. Once the scroll has come to rest,
 * the position is checked and, if it is off, corrected with a second short scroll.
 *
 * The visitor always wins: any wheel, touch or key press during the scroll
 * cancels the follow-up, so the page never pulls them back.
 */
export function scrollToLead(): void {
  const section = document.getElementById(LEAD_SECTION_ID)
  if (!section) return

  cancelPending?.()

  // Move focus first, without scrolling: the next Tab then continues from the
  // form, not from the button that was pressed far above it.
  try {
    document.getElementById(LEAD_HEADING_ID)?.focus({ preventScroll: true })
  } catch {
    // Focus is a nicety.
  }

  let reduceMotion = false
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    // Old browsers: smooth scroll it is.
  }

  if (reduceMotion) {
    section.scrollIntoView({ behavior: "auto", block: "start" })
    return
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" })

  const startedAt = Date.now()
  let lastY = window.scrollY
  let stillFor = 0

  const stop = () => {
    window.clearInterval(timer)
    window.removeEventListener("wheel", stop)
    window.removeEventListener("touchstart", stop)
    window.removeEventListener("keydown", stop)
    if (cancelPending === stop) cancelPending = null
  }

  const timer = window.setInterval(() => {
    if (Date.now() - startedAt > GIVE_UP_AFTER_MS) {
      stop()
      return
    }

    const y = window.scrollY
    stillFor = Math.abs(y - lastY) < 1 ? stillFor + 1 : 0
    lastY = y
    if (stillFor < 2) return

    stop()
    // scroll-margin-top is already part of where scrollIntoView lands.
    const offset = section.getBoundingClientRect().top - parseFloat(getComputedStyle(section).scrollMarginTop || "0")
    // By now the page above has settled, so this short second pass lands exactly.
    if (Math.abs(offset) > TOLERANCE) section.scrollIntoView({ behavior: "smooth", block: "start" })
  }, CHECK_EVERY_MS)

  window.addEventListener("wheel", stop, { passive: true })
  window.addEventListener("touchstart", stop, { passive: true })
  window.addEventListener("keydown", stop)
  cancelPending = stop
}
