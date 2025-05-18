"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContentRendererProps {
  content: string
  className?: string
  fontSize?: string
  fontFamily?: string
}

export function ContentRenderer({ content, className, fontSize = "16px", fontFamily = "serif" }: ContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to top when content changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [content])

  return (
    <ScrollArea className={cn("h-full w-full", className)}>
      <div
        ref={contentRef}
        className={cn("markdown-preview p-6 md:p-8 lg:p-10", {
          "font-serif": fontFamily === "serif",
          "font-sans": fontFamily === "sans",
          "font-mono": fontFamily === "mono",
        })}
        style={{ fontSize }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </ScrollArea>
  )
}
