"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WebBookChapter } from "@/types/web-book"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TableOfContentsProps {
  chapters: WebBookChapter[]
  currentChapterId: string
  onChapterSelect: (chapterId: string) => void
  className?: string
}

export function TableOfContents({ chapters, currentChapterId, onChapterSelect, className }: TableOfContentsProps) {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(
    chapters.reduce(
      (acc, chapter) => {
        acc[chapter.id] = chapter.id === currentChapterId
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }))
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Table of Contents</h2>
      </div>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="p-4">
          <ul className="space-y-1">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="text-sm">
                <div
                  className={cn(
                    "flex items-center py-2 px-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                    currentChapterId === chapter.id && "bg-muted font-medium",
                  )}
                >
                  {chapter.sections && chapter.sections.length > 0 ? (
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="mr-1 p-1 rounded-sm hover:bg-muted-foreground/10"
                      aria-label={expandedChapters[chapter.id] ? "Collapse chapter" : "Expand chapter"}
                    >
                      {expandedChapters[chapter.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <span className="w-6" />
                  )}
                  <button onClick={() => onChapterSelect(chapter.id)} className="flex-1 text-left">
                    {chapter.title}
                  </button>
                </div>
                {expandedChapters[chapter.id] && chapter.sections && chapter.sections.length > 0 && (
                  <ul className="ml-6 mt-1 space-y-1 border-l pl-2">
                    {chapter.sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => onChapterSelect(section.id)}
                          className={cn(
                            "w-full text-left py-1 px-2 rounded-md hover:bg-muted transition-colors text-sm",
                            currentChapterId === section.id && "bg-muted font-medium",
                          )}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </div>
  )
}
