import { FileSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogEmptyStateProps {
  search?: string
  category?: string
}

export function BlogEmptyState({ search, category }: BlogEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-3">
        <FileSearch className="h-6 w-6" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">No articles found</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        {search && category
          ? `We couldn't find any articles matching "${search}" in the "${category}" category.`
          : search
            ? `We couldn't find any articles matching "${search}".`
            : category
              ? `We couldn't find any articles in the "${category}" category.`
              : "We couldn't find any articles. Check back soon for new content!"}
      </p>
      <Button asChild>
        <Link href="/blog">View All Articles</Link>
      </Button>
    </div>
  )
}
