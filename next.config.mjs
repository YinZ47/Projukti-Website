/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // allow loading LinkedIn-hosted images used in timeline posts
    domains: ["media.licdn.com"],
  },
}

export default nextConfig
