/** @type {import('next').NextConfig} */
const nextConfig = {
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