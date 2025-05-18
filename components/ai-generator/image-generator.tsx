"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Loader2, RefreshCw, Download, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import type { Generation } from "@/types/ai-generator"

interface ImageGeneratorProps {
  addToHistory: (generation: Generation) => void
}

export function ImageGenerator({ addToHistory }: ImageGeneratorProps) {
  const [description, setDescription] = useState("")
  const [style, setStyle] = useState("photorealistic")
  const [size, setSize] = useState("1:1")
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
        `${description} in ${style} style`,
      )}`
      setGeneratedImage(imageUrl)

      // Add to history
      addToHistory({
        id: uuidv4(),
        type: "image",
        timestamp: new Date(),
        prompt: description,
        result: imageUrl,
        metadata: {
          style,
          size,
        },
      })

      setIsGenerating(false)
    }, 2000)
  }

  const handleClear = () => {
    setDescription("")
    setStyle("photorealistic")
    setSize("1:1")
    setGeneratedImage("")
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="image-style">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="image-style">
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="photorealistic">Photorealistic</SelectItem>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="3d">3D Render</SelectItem>
              <SelectItem value="watercolor">Watercolor</SelectItem>
              <SelectItem value="sketch">Sketch</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-size">Aspect Ratio</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="image-size">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="4:3">Standard (4:3)</SelectItem>
              <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
              <SelectItem value="9:16">Portrait (9:16)</SelectItem>
              <SelectItem value="3:2">Photo (3:2)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGenerate} disabled={isGenerating || !description} className="flex-1 md:flex-none">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Image"
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isGenerating || (!description && !generatedImage)}
          className="flex-1 md:flex-none"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {generatedImage && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Generated Image</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={generatedImage} download="generated-image.png">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted/50 flex justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-md">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt={description}
                className="h-full w-full object-cover"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
