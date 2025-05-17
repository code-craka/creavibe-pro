"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, RotateCcw } from "lucide-react"
import type { ContentVersion } from "./content-editor"

interface HistoryPanelProps {
  history: ContentVersion[]
  currentContent: string
  onRestore: (version: ContentVersion) => void
}

export function HistoryPanel({ history, currentContent, onRestore }: HistoryPanelProps) {
  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Check if a version can be restored (not the current content)
  const canRestore = (version: ContentVersion) => {
    return version.content !== currentContent
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full">
        <div className="flex items-center mb-4">
          <History className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Version History</h3>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No history available yet. Changes will appear here as you save.
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="space-y-3">
              {history.map((version) => (
                <div
                  key={version.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{formatDate(version.timestamp)}</span>
                      {version.id === history[0].id && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Latest</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {version.wordCount} {version.wordCount === 1 ? "word" : "words"}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore(version)}
                    disabled={!canRestore(version)}
                    className="ml-2"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
