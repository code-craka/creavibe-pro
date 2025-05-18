"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogGenerator } from "./blog-generator"
import { ImageGenerator } from "./image-generator"
import { VideoScriptGenerator } from "./video-script-generator"
import { GenerationHistory } from "./generation-history"
import { FileText, ImageIcon, Video } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import type { Generation } from "@/types/ai-generator"

export function AIGenerator() {
  const [activeTab, setActiveTab] = useState("blog")
  const [history, setHistory] = useState<Generation[]>([])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const addToHistory = (generation: Generation) => {
    setHistory((prev) => [generation, ...prev].slice(0, 5))
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
        <p className="text-muted-foreground">Create high-quality content with our AI-powered generation tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="blog" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className={cn(isDesktop ? "" : "sr-only")}>Blog</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className={cn(isDesktop ? "" : "sr-only")}>Image</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className={cn(isDesktop ? "" : "sr-only")}>Video Script</span>
              </TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "blog" && "Blog Generator"}
                  {activeTab === "image" && "Image Generator"}
                  {activeTab === "video" && "Video Script Generator"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "blog" && "Generate engaging blog posts with AI assistance."}
                  {activeTab === "image" && "Create custom images based on your descriptions."}
                  {activeTab === "video" && "Craft compelling video scripts for your content."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="blog" className="mt-0">
                  <BlogGenerator addToHistory={addToHistory} />
                </TabsContent>
                <TabsContent value="image" className="mt-0">
                  <ImageGenerator addToHistory={addToHistory} />
                </TabsContent>
                <TabsContent value="video" className="mt-0">
                  <VideoScriptGenerator addToHistory={addToHistory} />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        <div className="hidden lg:block">
          <GenerationHistory history={history} />
        </div>
      </div>

      <div className="mt-6 lg:hidden">
        <GenerationHistory history={history} />
      </div>
    </div>
  )
}
