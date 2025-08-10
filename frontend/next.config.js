/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, // This is deprecated in Next.js 14
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
