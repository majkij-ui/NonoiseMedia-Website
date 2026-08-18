import { SITE_URL } from './seo'
import type { ServicePageData } from './service-pages'
import type { Project } from './projects'

/** Locale-aware absolute URL. Mirrors localePrefix 'as-needed': PL unprefixed, EN under /en. */
function url(locale: string, path: string): string {
  return locale === 'en' ? `${SITE_URL}/en${path}` : `${SITE_URL}${path || '/'}`
}

const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Nonoise Media',
  url: SITE_URL,
} as const

/** Public profiles — confirms the entity to search/AI systems. */
export const SAME_AS = [
  'https://www.instagram.com/nonoise_media/',
  'https://www.youtube.com/@nonoisemedia991',
]

type Crumb = { name: string; path: string }

export function breadcrumbList(locale: string, crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: url(locale, crumb.path),
    })),
  }
}

/** FAQPage from the service page's own visible Q&A — schema must match rendered content. */
export function faqPage(page: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function serviceSchema(page: ServicePageData, locale: string) {
  const meta = locale === 'en' ? page.meta.en : page.meta.pl
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta.title,
    description: meta.description,
    serviceType: page.hero.label,
    url: url(locale, `/offer/${page.slug}`),
    provider: { ...ORGANIZATION, sameAs: SAME_AS },
    areaServed: { '@type': 'Country', name: 'Poland' },
  }
}

/**
 * VideoObject per portfolio piece. `uploadDate` is required for Google video rich
 * results — emitted only for projects that carry a real date (see Project.uploadDate);
 * never invent one.
 */
export function videoObject(project: Project, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: project.title,
    description: `${project.subtitle} — ${project.client}. ${project.challenge}`,
    thumbnailUrl: project.image,
    contentUrl: project.video,
    ...(project.uploadDate ? { uploadDate: project.uploadDate } : {}),
    creator: ORGANIZATION,
    productionCompany: ORGANIZATION,
    inLanguage: locale === 'en' ? 'en' : 'pl',
    isFamilyFriendly: true,
  }
}
