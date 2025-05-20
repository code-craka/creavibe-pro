# CreaVibe Directory Structure

This document provides an overview of the CreaVibe project's directory structure, explaining the purpose of each directory and key files.

## Root Directory

\`\`\`
creavibe-pro/
├── app/                  # Next.js App Router
├── components/           # React components
├── content/              # MDX content
├── docs/                 # Documentation
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript type definitions
├── .env.local.example    # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── pnpm-lock.yaml        # pnpm lock file
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project README
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## App Directory (Next.js App Router)

\`\`\`
app/
├── (company)/            # Company-related pages
│   ├── about/            # About page
│   ├── careers/          # Careers page
│   ├── contact/          # Contact page
│   └── layout.tsx        # Layout for company pages
├── (support)/            # Support-related pages
│   ├── help-center/      # Help center page
│   ├── community/        # Community page
│   └── layout.tsx        # Layout for support pages
├── ai-generator/         # AI generator page
├── api/                  # API routes
│   ├── auth/             # Authentication API routes
│   ├── generate/         # Content generation API routes
│   ├── projects/         # Projects API routes
│   ├── webbooks/         # WebBooks API routes
│   └── webhook/          # Webhook API routes
├── auth/                 # Authentication pages
│   ├── callback/         # Auth callback route
│   ├── reset-password/   # Password reset page
│   └── route.ts          # Auth API route
├── blog/                 # Blog pages
│   ├── [slug]/           # Individual blog post page
│   └── page.tsx          # Blog listing page
├── changelog/            # Changelog page
├── dashboard/            # Dashboard page
├── docs/                 # Documentation pages
│   ├── [...slug]/        # Dynamic documentation page
│   └── page.tsx          # Documentation home page
├── examples/             # Example pages
│   ├── content-generator/# Content generator example
│   ├── navbar/           # Navbar example
│   ├── notification-bell/# Notification bell example
│   ├── settings/         # Settings example
│   └── version-history/  # Version history example
├── forgot-password/      # Forgot password page
├── help-center/          # Help center page
├── integrations/         # Integrations page
├── login/                # Login page
├── pricing/              # Pricing page
├── privacy-policy/       # Privacy policy page
├── profile/              # User profile page
├── projects/             # Projects pages
│   ├── [id]/             # Individual project page
│   ├── new/              # New project page
│   └── page.tsx          # Projects listing page
├── roadmap/              # Roadmap page
├── settings/             # Settings page
├── signup/               # Signup page
├── templates/            # Templates page
├── terms-of-service/     # Terms of service page
├── web-book/             # WebBook page
├── web-books/            # WebBooks listing page
├── favicon.ico           # Favicon
├── globals.css           # Global CSS
├── layout.tsx            # Root layout
└── page.tsx              # Home page
\`\`\`

## Components Directory

\`\`\`
components/
├── about/                # About page components
├── admin/                # Admin components
│   └── audit-logs/       # Audit logs components
├── ai-generator/         # AI generator components
├── blog/                 # Blog components
├── careers/              # Careers components
├── changelog/            # Changelog components
├── community/            # Community components
├── contact/              # Contact components
├── content/              # Content components
├── content-generator/    # Content generator components
├── dashboard/            # Dashboard components
├── docs/                 # Documentation components
├── feedback/             # Feedback components
├── help-center/          # Help center components
├── integrations/         # Integrations components
├── pricing/              # Pricing components
├── projects/             # Projects components
├── roadmap/              # Roadmap components
├── settings/             # Settings components
├── templates/            # Templates components
├── ui/                   # UI components (shadcn/ui)
├── web-book/             # WebBook components
├── web-books/            # WebBooks components
├── breadcrumb.tsx        # Breadcrumb component
├── dashboard-nav.tsx     # Dashboard navigation component
├── footer.tsx            # Footer component
├── navbar.tsx            # Navbar component
├── notification-badge.tsx# Notification badge component
├── notification-bell.tsx # Notification bell component
├── notification-item.tsx # Notification item component
├── supabase-warning.tsx  # Supabase warning component
├── theme-provider.tsx    # Theme provider component
└── user-nav.tsx          # User navigation component
\`\`\`

## Content Directory

\`\`\`
content/
├── authentication.mdx    # Authentication documentation
└── getting-started.mdx   # Getting started documentation
\`\`\`

## Docs Directory

\`\`\`
docs/
├── api-analytics.md              # API analytics documentation
├── audit-logs-dashboard.md       # Audit logs dashboard documentation
├── content-editor.md             # Content editor documentation
├── content-generator.md          # Content generator documentation
├── deployment-guide.md           # Deployment guide
├── directory-structure.md        # Directory structure documentation
├── environment-variables-guide.md# Environment variables guide
├── navbar.md                     # Navbar documentation
├── notification-bell.md          # Notification bell documentation
├── template-library.md           # Template library documentation
├── user-settings.md              # User settings documentation
├── version-history.md            # Version history documentation
└── windsurf-guide.md             # Windsurf guide
\`\`\`

## Hooks Directory

\`\`\`
hooks/
├── use-click-outside.ts  # Hook for detecting clicks outside an element
├── use-keyboard-navigation.ts # Hook for keyboard navigation
├── use-local-storage.ts  # Hook for local storage
├── use-media-query.ts    # Hook for media queries
├── use-mobile.ts         # Hook for detecting mobile devices
└── use-toast.ts          # Hook for toast notifications
\`\`\`

## Lib Directory

\`\`\`
lib/
├── api-analytics-advanced-service.ts # Advanced API analytics service
├── api-analytics-service.ts      # API analytics service
├── api.ts                        # API utilities
├── blog-service.ts               # Blog service
├── client-env.ts                 # Client environment utilities
├── docs.ts                       # Documentation utilities
├── env.ts                        # Environment utilities
├── fetch-wrapper.ts              # Fetch wrapper
├── integrations.ts               # Integrations utilities
├── json-utils.ts                 # JSON utilities
├── mock-changelog.ts             # Mock changelog data
├── mock-community-data.ts        # Mock community data
├── mock-data.ts                  # Mock data
├── mock-help-data.ts             # Mock help data
├── mock-web-books.ts             # Mock web books data
├── roadmap-service.ts            # Roadmap service
├── server-api-analytics-service.ts # Server API analytics service
├── supabase-schema.sql           # Supabase schema
├── supabase.ts                   # Supabase client
├── syntax-highlighter.ts         # Syntax highlighter
└── utils.ts                      # Utility functions
\`\`\`

## Public Directory

\`\`\`
public/
├── abstract-profile.png          # Abstract profile image
├── authors/                      # Author images
├── blog/                         # Blog images
├── content-marketing-guide.png   # Content marketing guide image
├── diverse-professional-woman-headshots.png # Professional headshots
├── email-marketing-concept.png   # Email marketing concept image
├── email-newsletter-template.png # Email newsletter template image
├── favicon-32x32.png             # Favicon
├── icons/                        # Icon images
├── integrations/                 # Integration images
├── logo.png                      # Logo
├── modern-content-dashboard.png  # Dashboard image
├── professional-man-headshot.png # Professional headshot
├── professional-woman-headshot.png # Professional headshot
├── seo-best-practices.png        # SEO best practices image
├── social-media-strategy.png     # Social media strategy image
└── video-production-team.png     # Video production team image
\`\`\`

## Types Directory

\`\`\`
types/
├── ai-generator.ts               # AI generator types
├── api-analytics-advanced.ts     # Advanced API analytics types
├── api-analytics.ts              # API analytics types
├── audit-logs.ts                 # Audit logs types
├── blog.ts                       # Blog types
├── changelog.ts                  # Changelog types
├── integrations.ts               # Integrations types
├── notifications.ts              # Notifications types
├── roadmap.ts                    # Roadmap types
├── supabase.ts                   # Supabase types
├── templates.ts                  # Templates types
├── version-history.ts            # Version history types
└── web-book.ts                   # WebBook types
\`\`\`

## Key Configuration Files

### next.config.mjs

The Next.js configuration file, which includes settings for the Next.js application.

\`\`\`javascript
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
    mdxRs: false,
    serverExternalPackages: ["shiki"],
  },
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
}

export default nextConfig
\`\`\`

### tailwind.config.ts

The Tailwind CSS configuration file, which includes settings for the Tailwind CSS framework.

\`\`\`typescript
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
\`\`\`

### tsconfig.json

The TypeScript configuration file, which includes settings for the TypeScript compiler.

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

## Understanding the Project Structure

### App Router Structure

CreaVibe uses Next.js App Router, which follows a file-system based routing approach. Each folder in the `app` directory represents a route segment, and each `page.tsx` file represents a page that is accessible at that route.

Special folders like `(company)` and `(support)` are route groups, which allow you to organize routes without affecting the URL structure. These groups share a common layout defined in their respective `layout.tsx` files.

### Component Organization

Components are organized by feature or page, with common UI components in the `components/ui` directory. This approach makes it easy to find and maintain components related to specific features.

### Data Flow

The application uses a combination of server-side and client-side data fetching:

1. Server Components: Used for initial data fetching and rendering
2. Client Components: Used for interactive elements and real-time updates
3. Server Actions: Used for form submissions and data mutations

### State Management

The application uses React's built-in state management (useState, useContext) for local state and server components for global state. For more complex state management, custom hooks are used to encapsulate logic and provide a clean API.

### Styling Approach

CreaVibe uses Tailwind CSS for styling, with shadcn/ui components providing a consistent design system. Global styles are defined in `app/globals.css`, and component-specific styles are applied using Tailwind utility classes.

## Conclusion

This directory structure is designed to be scalable, maintainable, and easy to navigate. By organizing files by feature and following Next.js App Router conventions, the project remains clean and understandable even as it grows in complexity.

For more detailed information about specific components or features, refer to the corresponding documentation files in the `docs` directory.
\`\`\`

Finally, let's create the Windsurf guide:
