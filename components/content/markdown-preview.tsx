"use client"

import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { cn } from "@/lib/utils"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <Card className={cn("p-6 overflow-auto h-full markdown-preview", className)}>
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          className="prose prose-sm max-w-none dark:prose-invert"
        >
          {content}
        </ReactMarkdown>
      ) : (
        <div className="text-muted-foreground italic">No content to preview</div>
      )}
    </Card>
  )
}
