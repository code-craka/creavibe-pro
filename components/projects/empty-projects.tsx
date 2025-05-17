import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FolderKanban, PlusCircle } from "lucide-react"
import Link from "next/link"

export function EmptyProjects() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <FolderKanban className="h-16 w-16 text-muted-foreground/50 mb-6" />
        <h3 className="text-xl font-medium mb-2">No projects yet</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Create your first project to start generating AI-powered content and collaborating with your team.
        </p>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Project
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
