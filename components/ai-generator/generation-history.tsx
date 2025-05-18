"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Generation } from "@/types/ai-generator"
import { FileText, ImageIcon, Video, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface GenerationHistoryProps {
  history: Generation[]
}

export function GenerationHistory({ history }: GenerationHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <p>No generations yet</p>
            <p className="text-sm">Your recent generations will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generation History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {item.type === "blog" && <FileText className="h-4 w-4 text-blue-500" />}
                {item.type === "image" && <ImageIcon className="h-4 w-4 text-purple-500" />}
                {item.type === "video" && <Video className="h-4 w-4 text-green-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium truncate">
                    {item.type === "blog" && item.metadata?.title}
                    {item.type === "image" && "Image: " + item.prompt.substring(0, 20) + "..."}
                    {item.type === "video" && "Video: " + item.prompt.substring(0, 20) + "..."}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
