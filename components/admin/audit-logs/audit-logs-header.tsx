import { Shield } from "lucide-react"

export function AuditLogsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Monitor user actions and system events across the platform</p>
        </div>
      </div>
    </div>
  )
}
