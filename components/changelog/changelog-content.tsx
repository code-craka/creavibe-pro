"use client"

import { useState, useEffect } from "react"
import type { ChangelogFilter, ChangelogVersion } from "@/types/changelog"
import ChangelogSidebar from "./changelog-sidebar"
import ChangelogEntry from "./changelog-entry"
import ChangelogEmptyState from "./changelog-empty-state"
import { getMockChangelogData } from "@/lib/mock-changelog"

export default function ChangelogContent() {
  const [filter, setFilter] = useState<ChangelogFilter>({
    types: [],
    search: "",
  })

  const [versions, setVersions] = useState<ChangelogVersion[]>([])
  const [filteredVersions, setFilteredVersions] = useState<ChangelogVersion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const data = getMockChangelogData()
        setVersions(data)
        setFilteredVersions(data)
      } catch (error) {
        console.error("Error fetching changelog data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (versions.length === 0) return

    let filtered = [...versions]

    // Filter by type
    if (filter.types.length > 0) {
      filtered = filtered
        .map((version) => ({
          ...version,
          changes: version.changes.filter((change) => filter.types.includes(change.type)),
        }))
        .filter((version) => version.changes.length > 0)
    }

    // Filter by search
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      filtered = filtered
        .map((version) => ({
          ...version,
          changes: version.changes.filter(
            (change) =>
              change.title.toLowerCase().includes(searchLower) ||
              change.description.toLowerCase().includes(searchLower),
          ),
        }))
        .filter((version) => version.changes.length > 0)
    }

    // Filter by date range
    if (filter.startDate || filter.endDate) {
      filtered = filtered.filter((version) => {
        const versionDate = new Date(version.date)

        if (filter.startDate && filter.endDate) {
          return versionDate >= filter.startDate && versionDate <= filter.endDate
        }

        if (filter.startDate) {
          return versionDate >= filter.startDate
        }

        if (filter.endDate) {
          return versionDate <= filter.endDate
        }

        return true
      })
    }

    setFilteredVersions(filtered)
  }, [filter, versions])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
            <div className="h-40 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="md:col-span-3 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 w-full bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <div className="sticky top-8">
          <ChangelogSidebar filter={filter} onFilterChange={setFilter} />
        </div>
      </div>
      <div className="md:col-span-3">
        {filteredVersions.length > 0 ? (
          <div className="space-y-6">
            {filteredVersions.map((version) => (
              <ChangelogEntry key={version.version} version={version} />
            ))}
          </div>
        ) : (
          <ChangelogEmptyState onReset={() => setFilter({ types: [], search: "" })} />
        )}
      </div>
    </div>
  )
}
