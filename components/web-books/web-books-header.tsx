"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebBooksHeaderProps {
  onNewBook: () => void
  visibilityFilter: "all" | "public" | "private"
  onVisibilityFilterChange: (value: "all" | "public" | "private") => void
  sortOption: "updated" | "title" | "visibility"
  onSortOptionChange: (value: "updated" | "title" | "visibility") => void
}

export function WebBooksHeader({
  onNewBook,
  visibilityFilter,
  onVisibilityFilterChange,
  sortOption,
  onSortOptionChange,
}: WebBooksHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold tracking-tight">📚 Web Books</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            value={visibilityFilter}
            onValueChange={(value) => onVisibilityFilterChange(value as "all" | "public" | "private")}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="public">Public Only</SelectItem>
              <SelectItem value="private">Private Only</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOption}
            onValueChange={(value) => onSortOptionChange(value as "updated" | "title" | "visibility")}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="visibility">Visibility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onNewBook} className="w-full sm:w-auto ml-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Book
        </Button>
      </div>
    </div>
  )
}
