"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileIcon as FileTemplate, Search, Filter, PlusCircle } from "lucide-react"
import Link from "next/link"

interface EmptyTemplatesProps {
  searchQuery: string
  selectedCategory: string
  onClearFilters: () => void
}

export function EmptyTemplates({ searchQuery, selectedCategory, onClearFilters }: EmptyTemplatesProps) {
  // Determine which empty state to show
  const isFiltering = searchQuery || selectedCategory !== "all"

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {isFiltering ? (
          <>
            <Search className="h-16 w-16 text-muted-foreground/50 mb-6" />
            <h3 className="text-xl font-medium mb-2">No matching templates found</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              We couldn't find any templates matching your current filters. Try adjusting your search or category
              selection.
            </p>
            <Button onClick={onClearFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </>
        ) : (
          <>
            <FileTemplate className="h-16 w-16 text-muted-foreground/50 mb-6" />
            <h3 className="text-xl font-medium mb-2">No templates yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Create your first template to jumpstart your content creation process and save time on repetitive tasks.
            </p>
            <Button asChild>
              <Link href="/templates/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Template
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
