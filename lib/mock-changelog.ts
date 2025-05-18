import type { ChangelogVersion } from "@/types/changelog"

export function getMockChangelogData(): ChangelogVersion[] {
  return [
    {
      version: "2.5.0",
      date: "May 15, 2025",
      isHighlighted: true,
      isExpanded: true,
      changes: [
        {
          type: "new",
          title: "Web Book Creator",
          description:
            "Create and publish interactive web books directly from your content. Includes chapter management, custom styling, and public/private visibility controls.",
        },
        {
          type: "new",
          title: "AI-powered content recommendations",
          description:
            "Our AI now analyzes your content and suggests improvements for engagement, readability, and SEO optimization.",
        },
        {
          type: "improvement",
          title: "Enhanced dashboard analytics",
          description:
            "Completely redesigned analytics dashboard with more detailed insights, custom date ranges, and exportable reports.",
        },
        {
          type: "fix",
          title: "Image upload reliability",
          description: "Fixed issues with image uploads failing on certain browsers and improved upload speed by 40%.",
        },
      ],
    },
    {
      version: "2.4.2",
      date: "April 28, 2025",
      changes: [
        {
          type: "fix",
          title: "Authentication token refresh",
          description:
            "Fixed an issue where authentication tokens weren't properly refreshing, causing unexpected logouts.",
        },
        {
          type: "fix",
          title: "Mobile navigation menu",
          description:
            "Resolved a bug where the mobile navigation menu would sometimes remain open after selecting an item.",
        },
        {
          type: "improvement",
          title: "API response times",
          description: "Optimized database queries resulting in 30% faster API response times across the platform.",
        },
      ],
    },
    {
      version: "2.4.0",
      date: "April 15, 2025",
      changes: [
        {
          type: "new",
          title: "Team collaboration features",
          description:
            "Introduced real-time collaboration tools including simultaneous editing, comments, and role-based permissions.",
        },
        {
          type: "new",
          title: "Integration marketplace",
          description: "New marketplace featuring 20+ integrations with popular tools like Notion, Slack, and Figma.",
        },
        {
          type: "improvement",
          title: "Content editor performance",
          description: "Rewrote the content editor for better performance with large documents and complex formatting.",
        },
        {
          type: "fix",
          title: "Template rendering",
          description: "Fixed template rendering issues when using certain special characters in template variables.",
        },
      ],
    },
    {
      version: "2.3.5",
      date: "March 22, 2025",
      changes: [
        {
          type: "improvement",
          title: "Dark mode refinements",
          description: "Enhanced dark mode with better contrast ratios and improved readability across all screens.",
        },
        {
          type: "improvement",
          title: "Keyboard shortcuts",
          description: "Added comprehensive keyboard shortcuts throughout the application for power users.",
        },
        {
          type: "fix",
          title: "Export functionality",
          description: "Fixed issues with PDF exports not properly rendering complex tables and charts.",
        },
      ],
    },
    {
      version: "2.3.0",
      date: "March 1, 2025",
      changes: [
        {
          type: "new",
          title: "Advanced AI image generation",
          description:
            "Introduced AI image generation capabilities with style controls, aspect ratio options, and batch processing.",
        },
        {
          type: "new",
          title: "Custom branding options",
          description: "Added the ability to customize colors, logos, and fonts throughout your workspace.",
        },
        {
          type: "improvement",
          title: "Search functionality",
          description: "Completely rebuilt search with filters, saved searches, and natural language processing.",
        },
        {
          type: "fix",
          title: "Calendar sync",
          description: "Resolved issues with Google Calendar and Outlook calendar synchronization.",
        },
      ],
    },
    {
      version: "2.2.0",
      date: "February 10, 2025",
      changes: [
        {
          type: "new",
          title: "Video content generation",
          description: "New video script generation tool with customizable templates and export options.",
        },
        {
          type: "improvement",
          title: "User onboarding",
          description: "Redesigned user onboarding flow with interactive tutorials and sample content.",
        },
        {
          type: "improvement",
          title: "Billing management",
          description:
            "Enhanced billing interface with usage tracking, invoice history, and payment method management.",
        },
        {
          type: "fix",
          title: "Notification delivery",
          description: "Fixed issues with delayed or missing email and in-app notifications.",
        },
      ],
    },
    {
      version: "2.1.0",
      date: "January 15, 2025",
      changes: [
        {
          type: "new",
          title: "API token management",
          description: "Introduced comprehensive API token management with usage analytics and rate limiting controls.",
        },
        {
          type: "new",
          title: "Template library",
          description: "Added a library of 50+ professional templates for various content types and industries.",
        },
        {
          type: "improvement",
          title: "Mobile responsiveness",
          description: "Improved mobile experience with touch-optimized controls and better small-screen layouts.",
        },
        {
          type: "fix",
          title: "Content versioning",
          description: "Fixed issues with version history not properly tracking certain types of changes.",
        },
      ],
    },
  ]
}
