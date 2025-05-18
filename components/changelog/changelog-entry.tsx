"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { ChangelogVersion, ChangeType } from "@/types/changelog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChangelogEntryProps {
  version: ChangelogVersion
}

export default function ChangelogEntry({ version }: ChangelogEntryProps) {
  const [isExpanded, setIsExpanded] = useState(version.isExpanded || false)

  const getBadgeColor = (type: ChangeType) => {
    switch (type) {
      case "new":
        return "bg-green-100 text-green-800"
      case "improvement":
        return "bg-blue-100 text-blue-800"
      case "fix":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-6 transition-all",
        version.isHighlighted ? "border-primary/50 bg-primary/5" : "border-border",
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Version {version.version}</h3>
          <p className="text-sm text-muted-foreground">{version.date}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`changelog-${version.version}`}
        >
          {isExpanded ? (
            <span className="flex items-center">
              Hide changes <ChevronUp className="ml-2 h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center">
              Show changes <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>

      {isExpanded && (
        <div id={`changelog-${version.version}`} className="mt-4 space-y-4 animate-in fade-in-50 duration-300">
          {version.changes.map((change, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full px-2.5 text-xs font-medium",
                    getBadgeColor(change.type),
                  )}
                >
                  {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                </span>
                <h4 className="font-medium">{change.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-0 sm:pl-[calc(2.5rem+0.5rem)]">{change.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
