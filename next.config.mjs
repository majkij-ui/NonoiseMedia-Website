import createNextIntlPlugin from 'next-intl/plugin'

/**
 * Site-wide CSP — GTM / GA / Google Ads / Vercel; script-src includes 'unsafe-eval' for GTM.
 * connect-src / frame-src / img-src include explicit Google hosts used by Ads, pixels, reCAPTCHA, Maps.
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
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://*.googlesyndication.com",
    "https://*.doubleclick.net",
    "https://adservice.google.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
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
    "https://*.googletagmanager.com",
    "https://*.g.doubleclick.net",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
  ].join(" "),
  "media-src 'self' blob: https://assets.nonoise.media",
  [
    "frame-src",
    "'self'",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://td.doubleclick.net",
    "https://*.google.com",
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
