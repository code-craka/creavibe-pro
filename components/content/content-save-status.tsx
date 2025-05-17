import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ContentSaveStatusProps {
  status: "saved" | "saving" | "unsaved"
}

export function ContentSaveStatus({ status }: ContentSaveStatusProps) {
  return (
    <div className="flex items-center text-xs">
      {status === "saved" && (
        <div className="flex items-center text-green-600 dark:text-green-500">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          <span>Saved</span>
        </div>
      )}

      {status === "saving" && (
        <div className="flex items-center text-amber-600 dark:text-amber-500">
          <Clock className="h-3.5 w-3.5 mr-1 animate-pulse" />
          <span>Saving...</span>
        </div>
      )}

      {status === "unsaved" && (
        <div className="flex items-center text-red-600 dark:text-red-500">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          <span>Unsaved changes</span>
        </div>
      )}
    </div>
  )
}
