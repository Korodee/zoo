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
  // Ensure static assets are properly served
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
