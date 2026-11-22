// ---------------------------------------------------------------------------
// Service Landing Page — data types & content
// ---------------------------------------------------------------------------
// Each entry drives one /offer/[slug] page: one per offer tile that has a page.
// Four older pages (filmy-wizerunkowe, filmy-produktowe, video-linkedin,
// video-case-studies) were folded into these; next.config.mjs redirects them.
// Copywriting lives in lib/services-content/ — one file per service.
// ---------------------------------------------------------------------------

import type { LpServiceId } from "./lp-services"

export type ServiceBenefit = {
  label: string
  title: string
  body: string
}

export type ProcessStep = {
  number: string
  title: string
  body: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServicePageData = {
  slug: string
  /**
   * The offer tile this page details. Price, scope points and sample films are
   * read from the tile (messages `lp.kampania.services`, lib/lp-services.ts), so
   * the page cannot disagree with it.
   */
  tile: LpServiceId
  meta: {
    pl: { title: string; description: string }
    en: { title: string; description: string }
  }
  hero: {
    label: string
    headline: string
    subheadline: string
    ctaText: string
  }
  benefits: {
    sectionLabel: string
    sectionHeadline: string
    items: ServiceBenefit[]
  }
  process: {
    sectionLabel: string
    sectionHeadline: string
    steps: ProcessStep[]
  }
  /** id matching a project from lib/projects.ts — omit to hide the case study section */
  featuredProjectId?: number
  caseStudy: {
    sectionLabel: string
    sectionHeadline: string
    linkText: string
  }
  faqs: {
    sectionLabel: string
    sectionHeadline: string
    items: ServiceFaq[]
  }
  cta: {
    headline: string
    body: string
    buttonText: string
  }
}

// ---------------------------------------------------------------------------
// Page data — imported from lib/services-content/
// ---------------------------------------------------------------------------

import { filmyKorporacyjne } from "./services-content/filmy-korporacyjne"
import { filmyReklamowe } from "./services-content/filmy-reklamowe"
import { reportazEventowy } from "./services-content/reportaz-eventowy"
import { wideoSocialMedia } from "./services-content/wideo-social-media"
import { wywiadyEksperckie } from "./services-content/wywiady-eksperckie"

export const servicePages: ServicePageData[] = [
  filmyKorporacyjne,
  filmyReklamowe,
  reportazEventowy,
  wideoSocialMedia,
  wywiadyEksperckie,
]

/** Look up a service page by its URL slug. */
export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages.find((p) => p.slug === slug)
}
