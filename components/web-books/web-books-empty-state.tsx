"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebBooksEmptyStateProps {
  onNewBook: () => void
  hasBooks: boolean
}

export function WebBooksEmptyState({ onNewBook, hasBooks }: WebBooksEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <span className="text-4xl">📚</span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight">
        {hasBooks ? "No books match your filters" : "No web books found"}
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        {hasBooks
          ? "Try changing your filter settings or create a new web book to get started."
          : "Create your first web book to start organizing and publishing your content."}
      </p>
      <Button onClick={onNewBook} className="mt-6">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Book
      </Button>
    </div>
  )
}
