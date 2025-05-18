"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

interface DocGroup {
  title: string
  items: {
    title: string
    href: string
    items?: {
      title: string
      href: string
    }[]
  }[]
}

const docsConfig: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/getting-started",
      },
      {
        title: "Installation",
        href: "/docs/getting-started/installation",
      },
      {
        title: "Quick Start",
        href: "/docs/getting-started/quick-start",
      },
    ],
  },
  {
    title: "Authentication",
    items: [
      {
        title: "Overview",
        href: "/docs/authentication",
      },
      {
        title: "API Keys",
        href: "/docs/authentication/api-keys",
      },
      {
        title: "OAuth",
        href: "/docs/authentication/oauth",
      },
      {
        title: "JWT",
        href: "/docs/authentication/jwt",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Overview",
        href: "/docs/api-reference",
      },
      {
        title: "Content",
        href: "/docs/api-reference/content",
        items: [
          {
            title: "Create Content",
            href: "/docs/api-reference/content/create",
          },
          {
            title: "Retrieve Content",
            href: "/docs/api-reference/content/retrieve",
          },
          {
            title: "Update Content",
            href: "/docs/api-reference/content/update",
          },
          {
            title: "Delete Content",
            href: "/docs/api-reference/content/delete",
          },
        ],
      },
      {
        title: "Projects",
        href: "/docs/api-reference/projects",
        items: [
          {
            title: "Create Project",
            href: "/docs/api-reference/projects/create",
          },
          {
            title: "Retrieve Project",
            href: "/docs/api-reference/projects/retrieve",
          },
          {
            title: "Update Project",
            href: "/docs/api-reference/projects/update",
          },
          {
            title: "Delete Project",
            href: "/docs/api-reference/projects/delete",
          },
        ],
      },
      {
        title: "Templates",
        href: "/docs/api-reference/templates",
      },
      {
        title: "Users",
        href: "/docs/api-reference/users",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Overview",
        href: "/docs/configuration",
      },
      {
        title: "Environment Variables",
        href: "/docs/configuration/environment-variables",
      },
      {
        title: "Webhooks",
        href: "/docs/configuration/webhooks",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        title: "Common Issues",
        href: "/docs/troubleshooting",
      },
      {
        title: "Error Codes",
        href: "/docs/troubleshooting/error-codes",
      },
      {
        title: "Rate Limits",
        href: "/docs/troubleshooting/rate-limits",
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        title: "Overview",
        href: "/docs/examples",
      },
      {
        title: "React",
        href: "/docs/examples/react",
      },
      {
        title: "Node.js",
        href: "/docs/examples/nodejs",
      },
      {
        title: "Python",
        href: "/docs/examples/python",
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Check if a group should be open based on current path
  const isGroupOpen = (group: DocGroup) => {
    if (openGroups[group.title] !== undefined) {
      return openGroups[group.title]
    }

    // Auto-open if current path is in this group
    return group.items.some(
      (item) => pathname === item.href || (item.items && item.items.some((subItem) => pathname === subItem.href)),
    )
  }

  return (
    <div className="w-full">
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Documentation</h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {docsConfig.map((group) => (
            <Collapsible
              key={group.title}
              open={isGroupOpen(group)}
              onOpenChange={() => toggleGroup(group.title)}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between px-2 py-1 font-medium">
                  {group.title}
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isGroupOpen(group) && "rotate-90")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-4 space-y-1">
                  {group.items.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-accent text-accent-foreground font-medium",
                        )}
                      >
                        {item.title}
                      </Link>
                      {item.items && pathname.startsWith(item.href) && (
                        <div className="ml-4 space-y-1 pt-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground",
                                pathname === subItem.href && "bg-accent text-accent-foreground font-medium",
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}
