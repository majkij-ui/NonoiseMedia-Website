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

/**
 * Default social share card. 1200x630 JPEG (~70 KB) — JPEG rather than the source
 * WebP because some scrapers (notably LinkedIn) handle WebP unreliably, and small
 * enough for WhatsApp's preview threshold.
 */
export const OG_IMAGE = {
  url: 'https://assets.nonoise.media/og/nonoise-media-og.jpg',
  width: 1200,
  height: 630,
  alt: 'Nonoise Media — studio produkcji filmowej i wideo, Warszawa',
}
