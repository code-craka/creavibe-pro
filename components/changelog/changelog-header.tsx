import { CalendarIcon } from "lucide-react"

export default function ChangelogHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarIcon className="h-4 w-4" />
        <span>Last updated: May 15, 2025</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
      <p className="text-xl text-muted-foreground max-w-3xl">
        Stay up to date with all the latest features, improvements, and bug fixes for CreaVibe.
      </p>
    </div>
  )
}
