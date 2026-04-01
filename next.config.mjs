import createNextIntlPlugin from 'next-intl/plugin'

/**
 * Site-wide CSP (no prior CSP in repo — set here so GTM / GA / Vercel scripts align with policy).
 * script-src includes 'unsafe-eval' and https://www.googletagmanager.com per GTM requirements.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://www.google-analytics.com",
    "https://ssl.google-analytics.com",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
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
    "https://va.vercel-scripts.com",
    "https://vercel.live",
  ].join(" "),
  "media-src 'self' blob: https://assets.nonoise.media",
  "frame-src 'self' https://www.googletagmanager.com https://tagmanager.google.com",
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
