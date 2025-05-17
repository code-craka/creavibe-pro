"use client"

import { useState } from "react"
import { VersionHistory } from "@/components/version-history/version-history"
import type { Version } from "@/types/version-history"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock data for version history
const generateMockVersions = (): Version[] => {
  const now = new Date()

  return [
    {
      id: "v10",
      timestamp: new Date(now.getTime() - 5 * 60000), // 5 minutes ago
      description: "Final edits before submission",
      metadata: { wordCount: 1250 },
    },
    {
      id: "v9",
      timestamp: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
      description: "Added conclusion section",
      metadata: { wordCount: 1180 },
    },
    {
      id: "v8",
      timestamp: new Date(now.getTime() - 2 * 3600000), // 2 hours ago
      description: "Expanded main arguments",
      metadata: { wordCount: 950 },
    },
    {
      id: "v7",
      timestamp: new Date(now.getTime() - 5 * 3600000), // 5 hours ago
      description: "Restructured introduction",
      metadata: { wordCount: 720 },
    },
    {
      id: "v6",
      timestamp: new Date(now.getTime() - 24 * 3600000), // 1 day ago
      description: "Added supporting evidence",
      metadata: { wordCount: 650 },
    },
    {
      id: "v5",
      timestamp: new Date(now.getTime() - 2 * 24 * 3600000), // 2 days ago
      description: "Initial draft completion",
      metadata: { wordCount: 520 },
    },
    {
      id: "v4",
      timestamp: new Date(now.getTime() - 3 * 24 * 3600000), // 3 days ago
      description: "Outlined key points",
      metadata: { wordCount: 320 },
    },
    {
      id: "v3",
      timestamp: new Date(now.getTime() - 4 * 24 * 3600000), // 4 days ago
      description: "Started writing introduction",
      metadata: { wordCount: 180 },
    },
    {
      id: "v2",
      timestamp: new Date(now.getTime() - 5 * 24 * 3600000), // 5 days ago
      description: "Created document structure",
      metadata: { wordCount: 50 },
    },
    {
      id: "v1",
      timestamp: new Date(now.getTime() - 7 * 24 * 3600000), // 7 days ago
      description: "Initial document creation",
      metadata: { wordCount: 10 },
    },
  ]
}

// Sample document content for each version
const versionContent: Record<string, string> = {
  v10: "# Final Document\n\nThis is the final version of the document with all edits and revisions incorporated. The conclusion has been strengthened and all feedback has been addressed.\n\n## Introduction\n\nThe introduction provides context and sets up the main arguments.\n\n## Main Content\n\nThe main content is fully developed with supporting evidence and examples.\n\n## Conclusion\n\nThe conclusion summarizes the key points and provides a call to action.",
  v9: "# Document Draft\n\nThis version includes the newly added conclusion section.\n\n## Introduction\n\nThe introduction provides context and sets up the main arguments.\n\n## Main Content\n\nThe main content is fully developed with supporting evidence and examples.\n\n## Conclusion\n\nThe conclusion summarizes the key points.",
  v8: "# Document Draft\n\nThis version has expanded main arguments but is missing a proper conclusion.\n\n## Introduction\n\nThe introduction provides context and sets up the main arguments.\n\n## Main Content\n\nThe main content is now fully developed with supporting evidence and examples.",
  v7: "# Document Draft\n\nThis version has a restructured introduction.\n\n## Introduction\n\nThe introduction has been rewritten to better set up the main arguments.\n\n## Main Content\n\nThe main content needs further development.",
  v6: "# Document Draft\n\nThis version includes additional supporting evidence.\n\n## Introduction\n\nBasic introduction to the topic.\n\n## Main Content\n\nAdded supporting evidence to strengthen arguments.",
  v5: "# Initial Draft\n\nThis is the first complete draft of the document.\n\n## Introduction\n\nBasic introduction to the topic.\n\n## Main Content\n\nOutline of main arguments.",
  v4: "# Document Outline\n\nThis version contains the outlined key points.\n\n## Key Points\n\n- Point 1\n- Point 2\n- Point 3",
  v3: "# Document Start\n\nThis version has the beginning of the introduction.\n\n## Introduction\n\nStarted writing the introduction.",
  v2: "# Document Structure\n\n## Introduction\n\n## Main Content\n\n## Conclusion",
  v1: "# New Document\n\nInitial creation.",
}

export default function VersionHistoryExample() {
  const [versions] = useState<Version[]>(generateMockVersions())
  const [currentVersionId, setCurrentVersionId] = useState<string>("v10")
  const [content, setContent] = useState<string>(versionContent["v10"])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRestore = async (version: Version) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setContent(versionContent[version.id])
    setCurrentVersionId(version.id)
    setIsLoading(false)

    toast({
      title: "Version restored",
      description: `Restored to version from ${new Date(version.timestamp).toLocaleString()}`,
    })
  }

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Version History Example</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] font-mono"
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={handleLoadingDemo} variant="outline" className="mr-2">
                  Demo Loading State
                </Button>
                <Button>Save New Version</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <VersionHistory
            versions={versions}
            currentVersionId={currentVersionId}
            isLoading={isLoading}
            onRestore={handleRestore}
            maxHeight="600px"
          />
        </div>
      </div>
    </div>
  )
}
