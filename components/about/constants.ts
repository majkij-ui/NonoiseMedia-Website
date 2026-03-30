export const cinematicEase = [0.25, 0.1, 0.25, 1] as const

export const gridImages = Array.from(
  { length: 30 },
  (_, i) => `https://assets.nonoise.media/about/collage${i + 1}.png`
)

export const gridItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.floor(i / 6) * 0.2,
      duration: 0.8,
      ease: cinematicEase,
    },
  }),
}

export const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
}

export const wordFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase },
  },
}
