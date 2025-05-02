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
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3006',
    'http://192.168.1.90:3000',
    'http://209.38.72.198:3006',
  ],
}

export default nextConfig
