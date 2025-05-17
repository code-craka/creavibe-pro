export interface User {
  id: string
  name: string
  email: string
}

export interface AuditLog {
  id: string
  timestamp: string
  user: User
  actionType: string
  details: string
  ipAddress: string
}

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface AuditLogFilters {
  dateRange: DateRange
  users: string[]
  actionTypes: string[]
}
