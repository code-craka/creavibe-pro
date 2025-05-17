import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Sparkles, FileText, Zap } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Create New Project",
      description: "Start a new creative project",
      icon: <PlusCircle className="h-5 w-5" />,
      href: "/projects/new",
      variant: "default" as const,
    },
    {
      title: "Generate Content",
      description: "Create content with AI",
      icon: <Sparkles className="h-5 w-5" />,
      href: "/ai-tools/generate",
      variant: "outline" as const,
    },
    {
      title: "Draft Blog Post",
      description: "Write a new blog article",
      icon: <FileText className="h-5 w-5" />,
      href: "/ai-tools/blog",
      variant: "outline" as const,
    },
    {
      title: "Quick Image",
      description: "Generate an image",
      icon: <Zap className="h-5 w-5" />,
      href: "/ai-tools/image",
      variant: "outline" as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto flex-col gap-2 p-4 justify-start items-center text-center"
              asChild
            >
              <Link href={action.href}>
                {action.icon}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{action.title}</span>
                  <span className="text-xs text-muted-foreground">{action.description}</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
