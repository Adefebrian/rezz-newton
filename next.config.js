/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.rezz.com.au',
      },
      {
        protocol: 'https',
        hostname: '**.rezz.com.au',
      },
    ],
    // Allow unoptimized images as fallback for external URLs
    unoptimized: false,
  },
}

module.exports = nextConfig
