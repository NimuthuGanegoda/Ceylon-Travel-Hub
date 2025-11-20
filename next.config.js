/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/glowing-happiness',
  assetPrefix: '/glowing-happiness',
}

module.exports = nextConfig
