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
    domains: ["localhost"],
    unoptimized: true,
  },
  experimental: {
    // Disable static optimization for MDX pages to ensure server-side rendering
    mdxRs: false,
  },
  // This is the correct location for serverExternalPackages in Next.js 15
  serverExternalPackages: ["shiki"],
  // Configure webpack to handle MDX files
  webpack: (config) => {
    // Add MDX file handling
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
          },
        },
      ],
    });

    return config;
  },
  // PostHog rewrites
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // Other config options remain unchanged
};

export default nextConfig;
