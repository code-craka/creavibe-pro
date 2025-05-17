"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface AuditLogsSearchProps {
  searchQuery: string
  onSearch: (query: string) => void
}

export function AuditLogsSearch({ searchQuery, onSearch }: AuditLogsSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localQuery)
  }

  const handleClear = () => {
    setLocalQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by user, action, or details..."
        className="w-full pl-8 pr-10"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      {localQuery && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-9 w-9 p-0"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  )
}
