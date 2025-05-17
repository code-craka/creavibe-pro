import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function TemplateLibraryHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Template Library</h1>
        <p className="text-muted-foreground mt-1">
          Choose from our collection of templates to jumpstart your content creation
        </p>
      </div>
      <Button asChild>
        <Link href="/templates/create">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Template
        </Link>
      </Button>
    </div>
  )
}
