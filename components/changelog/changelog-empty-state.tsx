"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChangelogEmptyStateProps {
  onReset: () => void
}

export default function ChangelogEmptyState({ onReset }: ChangelogEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No matching updates found</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
        We couldn't find any changelog entries matching your current filters. Try adjusting your search or filters.
      </p>
      <Button onClick={onReset}>Reset filters</Button>
    </div>
  )
}
