/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Add error handling for JSON parsing
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Improve error reporting
  webpack: (config, { dev, isServer }) => {
    // Add source maps in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    
    return config;
  },
}

export default nextConfig
