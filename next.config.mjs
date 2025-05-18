/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  experimental: {
    // Disable static optimization for MDX pages to ensure server-side rendering
    mdxRs: false,
    serverExternalPackages: ["shiki"],
  },
  // Configure webpack to handle MDX files
  webpack: (config) => {
    // Add MDX file handling
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })
    
    return config
  },
  // Other config options remain unchanged
}

export default nextConfig
