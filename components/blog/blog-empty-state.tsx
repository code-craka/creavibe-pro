import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BlogEmptyState({
  search,
  category,
}: {
  search: string
  category: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No articles found</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {search && category
          ? `We couldn't find any articles matching "${search}" in the "${category}" category.`
          : search
            ? `We couldn't find any articles matching "${search}".`
            : category
              ? `We couldn't find any articles in the "${category}" category.`
              : "We don't have any articles published yet. Check back soon!"}
      </p>
      <Link href="/blog">
        <Button variant="outline">View All Articles</Button>
      </Link>
    </div>
  )
}
