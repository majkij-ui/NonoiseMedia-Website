import createNextIntlPlugin from 'next-intl/plugin'

/**
 * Shared HTTPS allowlist for Google (GTM / GA4 / Ads / reCAPTCHA / DoubleClick).
 * Keeps script-src and worker-src aligned — GTM often spawns workers; blob: is required for some tag flows.
 */
const GOOGLE_HTTPS =
  [
    "https://www.googletagmanager.com",
    "https://*.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://ssl.google-analytics.com",
    "https://analytics.google.com",
    "https://www.google.com",
    "https://*.google.com",
    "https://www.gstatic.com",
    "https://*.gstatic.com",
    "https://www.googleadservices.com",
    "https://*.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://*.g.doubleclick.net",
    "https://*.doubleclick.net",
    "https://*.googlesyndication.com",
    "https://adservice.google.com",
  ].join(" ")

const VERCEL_SCRIPTS = "https://va.vercel-scripts.com https://vercel.live"

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    GOOGLE_HTTPS,
    VERCEL_SCRIPTS,
    // Some GTM / tag flows load dynamic script workers from blob: URLs
    "blob:",
  ].join(" "),
  // Dedicated workers / shared workers — not inherited safely for blob workers; mirror Google + blob
  ["worker-src", "'self'", "blob:", GOOGLE_HTTPS, VERCEL_SCRIPTS].join(" "),
  [
    "style-src",
    "'self'",
    "'unsafe-inline'",
    "https://tagmanager.google.com",
    "https://www.googletagmanager.com",
    "https://fonts.googleapis.com",
    "https://www.gstatic.com",
    "https://*.gstatic.com",
    "https://www.google.com",
    "https://*.google.com",
  ].join(" "),
  [
    "img-src",
    "'self'",
    "data:",
    "blob:",
    "https:",
    "https://*.google-analytics.com",
    "https://*.googletagmanager.com",
    "https://www.google.com",
  ].join(" "),
  ["font-src", "'self'", "data:", "https://fonts.gstatic.com", "https://*.gstatic.com"].join(" "),
  [
    "connect-src",
    "'self'",
    "https://assets.nonoise.media",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://*.googletagmanager.com",
    "https://www.google.com",
    "https://*.google.com",
    "https://www.googleadservices.com",
    "https://*.googleadservices.com",
    "https://*.g.doubleclick.net",
    "https://*.doubleclick.net",
    "https://*.googlesyndication.com",
    VERCEL_SCRIPTS,
  ].join(" "),
  "media-src 'self' blob: https://assets.nonoise.media",
  [
    "frame-src",
    "'self'",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://td.doubleclick.net",
    "https://www.google.com",
    "https://*.google.com",
    "https://www.gstatic.com",
    "https://*.gstatic.com",
  ].join(" "),
  // Not frame-ancestors 'none': same-origin + Vercel preview/toolbar; add other parent origins if needed.
  "frame-ancestors 'self' https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.nonoise.media",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
