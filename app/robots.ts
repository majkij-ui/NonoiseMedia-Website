import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /lp/* and /about-old are kept out of search via robots noindex metadata.
        // Don't also disallow them here — a robots.txt block would stop crawlers
        // from ever seeing the noindex tag.
      },
    ],
    sitemap: 'https://www.nonoise.media/sitemap.xml',
  }
}
