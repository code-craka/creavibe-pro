import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function ProjectsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
        <p className="text-muted-foreground mt-1">Manage and organize all your creative content</p>
      </div>
      <Button asChild>
        <Link href="/projects/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </Button>
    </div>
  )
}
