"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Clock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { VersionHistoryProps, Version } from "@/types/version-history"

export function VersionHistory({
  versions,
  currentVersionId,
  isLoading = false,
  onRestore,
  className,
  maxHeight = "400px",
}: VersionHistoryProps) {
  const [restoringId, setRestoringId] = useState<string | null>(null)

  // Handle restore action with loading state
  const handleRestore = async (version: Version) => {
    if (version.id === currentVersionId) return

    setRestoringId(version.id)
    try {
      await onRestore(version)
    } finally {
      setRestoringId(null)
    }
  }

  // Format the timestamp for display
  const formatTimestamp = (timestamp: number | string | Date) => {
    const date = new Date(timestamp)
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>
            ))}
          </div>
        ) : versions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No version history available yet.</div>
        ) : (
          <ScrollArea
            className="h-full max-h-[--max-height]"
            style={{ "--max-height": maxHeight } as React.CSSProperties}
          >
            <div className="space-y-3">
              {versions.slice(0, 10).map((version) => {
                const isCurrent = version.id === currentVersionId

                return (
                  <div
                    key={version.id}
                    className={cn(
                      "flex items-center justify-between p-3 border rounded-md transition-colors",
                      isCurrent ? "bg-muted/50 border-primary/30" : "hover:bg-muted/30",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <span className="font-medium truncate">{formatTimestamp(version.timestamp)}</span>
                        {isCurrent && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      {version.description && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">{version.description}</p>
                      )}
                      {version.metadata && version.metadata.wordCount && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {version.metadata.wordCount} {version.metadata.wordCount === 1 ? "word" : "words"}
                        </div>
                      )}
                    </div>

                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestore(version)}
                            disabled={isCurrent || restoringId === version.id}
                            className="ml-2 min-w-[80px]"
                            aria-label={`Restore version from ${formatTimestamp(version.timestamp)}`}
                          >
                            {restoringId === version.id ? (
                              <span className="flex items-center">
                                <span className="animate-spin mr-1 h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                                Restoring
                              </span>
                            ) : (
                              <>
                                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                Restore
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          {isCurrent
                            ? "This is the current version"
                            : `Restore to version from ${formatTimestamp(version.timestamp)}`}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
