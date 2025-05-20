"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function VideoScriptGenerator() {
  const [topic, setTopic] = useState("")
  const [length, setLength] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")

  const handleGenerate = async () => {
    if (!topic) return

    setIsGenerating(true)
    setGeneratedScript("")

    // Simulate API call with timeout
    setTimeout(() => {
      const script = generateMockVideoScript(topic, length)
      setGeneratedScript(script)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="video-topic">Video Topic</Label>
        <Input
          id="video-topic"
          placeholder="Enter the main topic of your video"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="video-length">Video Length</Label>
        <Select value={length} onValueChange={setLength}>
          <SelectTrigger id="video-length">
            <SelectValue placeholder="Select a length" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (1-2 minutes)</SelectItem>
            <SelectItem value="medium">Medium (3-5 minutes)</SelectItem>
            <SelectItem value="long">Long (6-10 minutes)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleGenerate} disabled={isGenerating || !topic} className="w-full md:w-auto">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Video Script"
        )}
      </Button>

      {generatedScript && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Generated Video Script</h3>
          <div className="rounded-md border p-4 bg-muted/50">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>{topic} - Video Script</h2>
              <div dangerouslySetInnerHTML={{ __html: generatedScript }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Mock function to generate video script content
function generateMockVideoScript(topic: string, length: string) {
  const scriptLength = length === "short" ? 2 : length === "medium" ? 4 : 6

  let script = `
    <h3>INTRO</h3>
    <p>[Opening Shot: Engaging visual related to ${topic}]</p>
    <p><strong>HOST:</strong> "Welcome to our video on ${topic}! Today, we're going to explore everything you need to know about this fascinating subject."</p>
    
    <h3>MAIN CONTENT</h3>
  `

  for (let i = 1; i <= scriptLength; i++) {
    script += `
      <p><strong>SECTION ${i}:</strong></p>
      <p>[B-roll: Relevant footage of ${topic} aspect ${i}]</p>
      <p><strong>HOST:</strong> "One important aspect of ${topic} is... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."</p>
    `
  }

  script += `
    <h3>CONCLUSION</h3>
    <p>[Closing Shot: Summary visual]</p>
    <p><strong>HOST:</strong> "And that's a wrap on ${topic}! If you found this video helpful, don't forget to like and subscribe for more content like this. Thanks for watching!"</p>
    
    <h3>CALL TO ACTION</h3>
    <p>[End Screen]</p>
    <p><strong>HOST:</strong> "Check out our other videos and visit our website at CreaVibe for more resources on ${topic}."</p>
  `

  return script
}
