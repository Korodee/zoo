/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-cf-east.streamable.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Temporarily disabled redirects to fix sitemap access
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.chevreuilblanc.ca',
  //         },
  //       ],
  //       destination: 'https://chevreuilblanc.ca/:path*',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig