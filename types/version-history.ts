export interface Version {
  id: string
  timestamp: number | string | Date
  description?: string
  metadata?: {
    wordCount?: number
    characterCount?: number
    [key: string]: any
  }
}

export interface VersionHistoryProps {
  versions: Version[]
  currentVersionId: string
  isLoading?: boolean
  onRestore: (version: Version) => Promise<void>
  className?: string
  maxHeight?: string
}
