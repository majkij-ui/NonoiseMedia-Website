import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  // PL (default) serves unprefixed at /, /about, ... — EN keeps /en prefix.
  localePrefix: 'as-needed',
  // No Accept-Language sniffing: / must always serve PL, for users and
  // crawlers alike (Googlebot sends English headers and would otherwise
  // get bounced to /en). EN is reachable via the language switcher.
  localeDetection: false,
})
