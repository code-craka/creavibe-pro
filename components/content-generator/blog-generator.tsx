"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function BlogGenerator() {
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("engaging")
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
      setIsGenerating(false)
    }, 2000)
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

      <div className="space-y-2">
        <Label htmlFor="blog-tone">Tone</Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger id="blog-tone">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="informal">Informal</SelectItem>
            <SelectItem value="engaging">Engaging</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="conversational">Conversational</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleGenerate} disabled={isGenerating || !title || !topic} className="w-full md:w-auto">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Blog Post"
        )}
      </Button>

      {generatedContent && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Generated Blog Post</h3>
          <div className="rounded-md border p-4 bg-muted/50">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Mock function to generate blog content
function generateMockBlogPost(title: string, topic: string, tone: string) {
  return `
    <p>This is a generated blog post about <strong>${topic}</strong> with a <em>${tone}</em> tone.</p>
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
