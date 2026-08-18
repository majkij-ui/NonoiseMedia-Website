import type { Metadata } from 'next'

/** Canonical origin — the site serves on www (apex 308s here). */
export const SITE_URL = 'https://www.nonoise.media'

/**
 * Canonical + hreflang alternates for a route.
 * URL scheme follows localePrefix: 'as-needed' — PL (default locale) is
 * unprefixed, EN lives under /en. `path` is the route without any locale
 * prefix ('' for home, '/about', `/offer/${slug}`, ...).
 * x-default points at PL: it is the site's primary audience and what /
 * serves to undetermined visitors.
 */
export function buildAlternates(
  locale: string,
  path: string,
): Metadata['alternates'] {
  const pl = `${SITE_URL}${path || '/'}`
  const en = `${SITE_URL}/en${path}`
  return {
    canonical: locale === 'en' ? en : pl,
    languages: { pl, en, 'x-default': pl },
  }
}
