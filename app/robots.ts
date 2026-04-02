import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Paid-traffic LP is noindex in metadata; also block crawlers at robots level
        disallow: ['/pl/lp/', '/en/lp/'],
      },
    ],
    sitemap: 'https://nonoise.media/sitemap.xml',
  }
}
