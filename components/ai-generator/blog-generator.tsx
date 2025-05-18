"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, RefreshCw, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { ToneStyle, Generation } from "@/types/ai-generator"
import { v4 as uuidv4 } from "uuid"

interface BlogGeneratorProps {
  addToHistory: (generation: Generation) => void
}

export function BlogGenerator({ addToHistory }: BlogGeneratorProps) {
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState<ToneStyle>("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = async () => {
    if (!title || !topic) return

    setIsGenerating(true)
    setGeneratedContent("")

    // Simulate API call with timeout
    setTimeout(() => {
      const content = generateMockBlogPost(title, topic, tone)
      setGeneratedContent(content)

      // Add to history
      addToHistory({
        id: uuidv4(),
        type: "blog",
        timestamp: new Date(),
        prompt: `Title: ${title}, Topic: ${topic}`,
        tone,
        result: content,
        metadata: {
          title,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        },
      })

      setIsGenerating(false)
    }, 2000)
  }

  const handleClear = () => {
    setTitle("")
    setTopic("")
    setKeywords("")
    setTone("professional")
    setGeneratedContent("")
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="blog-title">Blog Title</Label>
          <Input
            id="blog-title"
            placeholder="Enter a title for your blog post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="blog-topic">Blog Topic</Label>
          <Input
            id="blog-topic"
            placeholder="Enter the main topic of your blog"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="blog-keywords">Keywords (optional)</Label>
          <Input
            id="blog-keywords"
            placeholder="Enter keywords separated by commas"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="blog-tone">Tone</Label>
          <Select value={tone} onValueChange={(value) => setTone(value as ToneStyle)}>
            <SelectTrigger id="blog-tone">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGenerate} disabled={isGenerating || !title || !topic} className="flex-1 md:flex-none">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Blog Post"
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isGenerating || (!title && !topic && !keywords && !generatedContent)}
          className="flex-1 md:flex-none"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {generatedContent && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Generated Blog Post</h3>
            <Button variant="ghost" size="sm" onClick={handleRegenerate} disabled={isGenerating}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
          <Card className="p-4 bg-muted/50">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Mock function to generate blog content
function generateMockBlogPost(title: string, topic: string, tone: ToneStyle) {
  const toneAdjective = {
    professional: "authoritative",
    casual: "conversational",
    technical: "detailed",
    friendly: "approachable",
    persuasive: "compelling",
  }[tone]

  return `
    <p>This is a ${toneAdjective} blog post about <strong>${topic}</strong>.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    <h3>Why ${topic} Matters</h3>
    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h3>Key Insights</h3>
    <ul>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
      <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
      <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
    </ul>
    <p>In conclusion, ${topic} represents a significant opportunity for growth and innovation in today's rapidly evolving landscape.</p>
  `
}
