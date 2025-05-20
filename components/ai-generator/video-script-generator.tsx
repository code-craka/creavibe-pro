"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Loader2, RefreshCw, Copy, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import type { ToneStyle, Generation } from "@/types/ai-generator"
import { useToast } from "@/hooks/use-toast"

interface VideoScriptGeneratorProps {
  addToHistory: (generation: Generation) => void
}

export function VideoScriptGenerator({ addToHistory }: VideoScriptGeneratorProps) {
  const [topic, setTopic] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [duration, setDuration] = useState("medium")
  const [tone, setTone] = useState<ToneStyle>("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!topic) return

    setIsGenerating(true)
    setGeneratedScript("")

    // Simulate API call with timeout
    setTimeout(() => {
      const script = generateMockVideoScript(topic, duration, tone, targetAudience)
      setGeneratedScript(script)

      // Add to history
      addToHistory({
        id: uuidv4(),
        type: "video",
        timestamp: new Date(),
        prompt: `Topic: ${topic}, Duration: ${duration}`,
        tone,
        result: script,
        metadata: {
          targetAudience,
          duration,
        },
      })

      setIsGenerating(false)
    }, 2000)
  }

  const handleClear = () => {
    setTopic("")
    setTargetAudience("")
    setDuration("medium")
    setTone("professional")
    setGeneratedScript("")
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript.replace(/<[^>]*>/g, ""))
    toast({
      title: "Copied to clipboard",
      description: "The script has been copied to your clipboard.",
    })
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
        <Label htmlFor="target-audience">Target Audience (optional)</Label>
        <Input
          id="target-audience"
          placeholder="Who is this video for?"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="video-duration">Video Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="video-duration">
              <SelectValue placeholder="Select a duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (1-2 minutes)</SelectItem>
              <SelectItem value="medium">Medium (3-5 minutes)</SelectItem>
              <SelectItem value="long">Long (6-10 minutes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="video-tone">Tone</Label>
          <Select value={tone} onValueChange={(value) => setTone(value as ToneStyle)}>
            <SelectTrigger id="video-tone">
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
        <Button onClick={handleGenerate} disabled={isGenerating || !topic} className="flex-1 md:flex-none">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Video Script"
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isGenerating || (!topic && !targetAudience && !generatedScript)}
          className="flex-1 md:flex-none"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {generatedScript && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Generated Video Script</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted/50">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>{topic} - Video Script</h2>
              <div dangerouslySetInnerHTML={{ __html: generatedScript }} />
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Mock function to generate video script content
function generateMockVideoScript(topic: string, duration: string, tone: ToneStyle, targetAudience?: string) {
  const scriptLength = duration === "short" ? 2 : duration === "medium" ? 4 : 6
  const audienceText = targetAudience ? ` for ${targetAudience}` : ""
  const toneAdjective = {
    professional: "professional",
    casual: "casual",
    technical: "technical",
    friendly: "friendly",
    persuasive: "persuasive",
  }[tone]

  let script = `
    <h3>INTRO</h3>
    <p>[Opening Shot: Engaging visual related to ${topic}]</p>
    <p><strong>HOST:</strong> "Welcome to our ${toneAdjective} video on ${topic}${audienceText}! Today, we're going to explore everything you need to know about this fascinating subject."</p>
    
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
