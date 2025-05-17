"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, RefreshCw } from "lucide-react"

export function ImageGenerator() {
  const [description, setDescription] = useState("")
  const [style, setStyle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState("")

  const handleGenerate = async () => {
    if (!description) return

    setIsGenerating(true)
    setGeneratedImage("")

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a placeholder image based on the description
      const imageUrl = `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(
        `${description} in ${style || "photorealistic"} style`,
      )}`
      setGeneratedImage(imageUrl)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image-description">Image Description</Label>
        <Textarea
          id="image-description"
          placeholder="Describe the image you want to generate in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-style">Style Preferences</Label>
        <Input
          id="image-style"
          placeholder="e.g., Photorealistic, Abstract, Cartoon, Watercolor"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </div>

      <Button onClick={handleGenerate} disabled={isGenerating || !description} className="w-full md:w-auto">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Image"
        )}
      </Button>

      {generatedImage && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Generated Image</h3>
          <div className="flex flex-col items-center rounded-md border p-4 bg-muted/50">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-md">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt={description}
                className="h-full w-full object-cover"
              />
            </div>
            <Button variant="outline" size="sm" className="mt-4" onClick={handleGenerate} disabled={isGenerating}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
