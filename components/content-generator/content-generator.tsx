"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ContentGeneratorProps {
  type?: "blog" | "image" | "video"
  topic?: string
}

export function ContentGenerator({ type = "blog", topic = "" }: ContentGeneratorProps) {
  const [contentType, setContentType] = React.useState(type)
  const [contentTopic, setContentTopic] = React.useState(topic)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedContent, setGeneratedContent] = React.useState("")

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate content generation
    setTimeout(() => {
      setGeneratedContent(
        contentType === "blog"
          ? `# ${contentTopic}\n\nThis is a sample generated blog post about ${contentTopic}. In a real implementation, this would be AI-generated content based on your topic and preferences.\n\n## Key Points\n\n- Point 1 about ${contentTopic}\n- Point 2 about ${contentTopic}\n- Point 3 about ${contentTopic}`
          : contentType === "image"
            ? "Image generation placeholder. In a real implementation, this would generate an image based on your topic."
            : "Video script generation placeholder. In a real implementation, this would generate a video script based on your topic.",
      )
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
        <CardDescription>Generate content using AI based on your topic</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content-type">Content Type</Label>
          <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
            <SelectTrigger id="content-type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">Blog Post</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video Script</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Textarea
            id="topic"
            placeholder="Enter your content topic or description"
            value={contentTopic}
            onChange={(e) => setContentTopic(e.target.value)}
            className="min-h-20"
          />
        </div>

        {generatedContent && (
          <div className="space-y-2 mt-4">
            <Label>Generated Content</Label>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap font-mono text-sm">{generatedContent}</div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isGenerating || !contentTopic.trim()} className="w-full">
          {isGenerating ? "Generating..." : "Generate Content"}
        </Button>
      </CardFooter>
    </Card>
  )
}
