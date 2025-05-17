"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogGenerator } from "./blog-generator"
import { ImageGenerator } from "./image-generator"
import { VideoScriptGenerator } from "./video-script-generator"
import { FileText, ImageIcon, Video } from "lucide-react"

export function ContentGenerator() {
  const [activeTab, setActiveTab] = useState("blog")

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
        <p className="text-muted-foreground">Create high-quality content with our AI-powered generation tools.</p>
      </div>

      <Tabs defaultValue="blog" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Blog</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Image</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Video Script</span>
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
              <BlogGenerator />
            </TabsContent>
            <TabsContent value="image" className="mt-0">
              <ImageGenerator />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <VideoScriptGenerator />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
