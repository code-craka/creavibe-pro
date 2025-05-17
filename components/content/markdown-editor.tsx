"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, Heading1, Heading2, Heading3, Code } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // Update word and character count
  useEffect(() => {
    setCharCount(value.length)
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length)
  }, [value])

  // Insert markdown syntax at cursor position
  const insertMarkdown = (syntax: string, placeholder = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText = ""
    let newCursorPos = 0

    if (selectedText) {
      // If text is selected, wrap it with the syntax
      newText = value.substring(0, start) + syntax.replace(placeholder, selectedText) + value.substring(end)
      newCursorPos = start + syntax.replace(placeholder, selectedText).length
    } else {
      // If no text is selected, insert syntax with placeholder
      newText = value.substring(0, start) + syntax + value.substring(end)
      newCursorPos = start + syntax.indexOf(placeholder) + placeholder.length
    }

    onChange(newText)

    // Set focus back to textarea and position cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(
          syntax.includes(placeholder) ? start + syntax.indexOf(placeholder) : newCursorPos,
          syntax.includes(placeholder) ? start + syntax.indexOf(placeholder) + placeholder.length : newCursorPos,
        )
      }
    }, 0)
  }

  const toolbar = [
    {
      icon: <Bold className="h-4 w-4" />,
      title: "Bold",
      action: () => insertMarkdown("**placeholder**", "placeholder"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      title: "Italic",
      action: () => insertMarkdown("*placeholder*", "placeholder"),
    },
    {
      icon: <Heading1 className="h-4 w-4" />,
      title: "Heading 1",
      action: () => insertMarkdown("# placeholder", "placeholder"),
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      title: "Heading 2",
      action: () => insertMarkdown("## placeholder", "placeholder"),
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      title: "Heading 3",
      action: () => insertMarkdown("### placeholder", "placeholder"),
    },
    {
      icon: <List className="h-4 w-4" />,
      title: "Bullet List",
      action: () => insertMarkdown("- placeholder", "placeholder"),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      title: "Numbered List",
      action: () => insertMarkdown("1. placeholder", "placeholder"),
    },
    {
      icon: <LinkIcon className="h-4 w-4" />,
      title: "Link",
      action: () => insertMarkdown("[placeholder](url)", "placeholder"),
    },
    {
      icon: <ImageIcon className="h-4 w-4" />,
      title: "Image",
      action: () => insertMarkdown("![placeholder](url)", "placeholder"),
    },
    {
      icon: <Code className="h-4 w-4" />,
      title: "Code",
      action: () => insertMarkdown("```\nplaceholder\n```", "placeholder"),
    },
  ]

  return (
    <Card className="flex flex-col h-full border rounded-md">
      <div className="flex items-center gap-1 p-2 border-b bg-muted/40">
        {toolbar.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={item.action}
            title={item.title}
            className="h-8 w-8 p-0"
          >
            {item.icon}
            <span className="sr-only">{item.title}</span>
          </Button>
        ))}

        <div className="ml-auto text-xs text-muted-foreground">
          {wordCount} words | {charCount} characters
        </div>
      </div>

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 resize-none p-4 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[400px]"
        placeholder="Start writing your content here..."
      />
    </Card>
  )
}
