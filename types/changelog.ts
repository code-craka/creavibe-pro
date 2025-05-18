export type ChangeType = "new" | "fix" | "improvement"

export interface ChangelogItem {
  title: string
  description: string
  type: ChangeType
}

export interface ChangelogVersion {
  version: string
  date: string
  changes: ChangelogItem[]
  isHighlighted?: boolean
  isExpanded?: boolean
}

export interface ChangelogFilter {
  types: ChangeType[]
  search: string
  startDate?: Date
  endDate?: Date
}
