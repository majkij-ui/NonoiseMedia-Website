/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5e1edab0c3d54a17ad7456338b638e3a.r2.dev",
      },
    ],
  },
}

export default nextConfig
