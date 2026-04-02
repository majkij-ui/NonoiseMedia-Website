import type { MetadataRoute } from 'next'

const baseUrl = 'https://nonoise.media'
const locales = ['pl', 'en'] as const

type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

/** Public routes to include in the sitemap.
 *  Excludes: /lp/kampania (noindex paid-traffic LP), /about-old (archived). */
const routes: Route[] = [
  { path: '',              priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about',        priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work',         priority: 0.9, changeFrequency: 'monthly' },
  { path: '/offer',        priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact',      priority: 0.8, changeFrequency: 'yearly'  },
  { path: '/questionnaire',priority: 0.6, changeFrequency: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      // Slightly lower priority for non-default (EN) locale pages
      const priority = locale === 'pl' ? route.priority : Math.round(route.priority * 0.9 * 10) / 10
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority,
      })
    }
  }

  return entries
}
