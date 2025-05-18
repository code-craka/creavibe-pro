"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WebBookChapter } from "@/types/web-book"

interface NavigationControlsProps {
  chapters: WebBookChapter[]
  currentChapterIndex: number
  onNextChapter: () => void
  onPreviousChapter: () => void
  className?: string
}

export function NavigationControls({
  chapters,
  currentChapterIndex,
  onNextChapter,
  onPreviousChapter,
  className,
}: NavigationControlsProps) {
  const hasPrevious = currentChapterIndex > 0
  const hasNext = currentChapterIndex < chapters.length - 1

  const previousTitle = hasPrevious ? chapters[currentChapterIndex - 1].title : ""
  const nextTitle = hasNext ? chapters[currentChapterIndex + 1].title : ""

  return (
    <div className={`flex justify-between items-center p-4 border-t ${className}`}>
      <Button variant="ghost" onClick={onPreviousChapter} disabled={!hasPrevious} className="flex items-center">
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span className="hidden md:inline-block">Previous: {previousTitle}</span>
        <span className="md:hidden">Previous</span>
      </Button>

      <div className="text-sm text-muted-foreground">
        {currentChapterIndex + 1} of {chapters.length}
      </div>

      <Button variant="ghost" onClick={onNextChapter} disabled={!hasNext} className="flex items-center">
        <span className="hidden md:inline-block">Next: {nextTitle}</span>
        <span className="md:hidden">Next</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}
