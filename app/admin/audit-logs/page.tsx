"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/header"
import { AuditLogsHeader } from "@/components/admin/audit-logs/audit-logs-header"
import { AuditLogsTable } from "@/components/admin/audit-logs/audit-logs-table"
import { AuditLogsFilters } from "@/components/admin/audit-logs/audit-logs-filters"
import { AuditLogsSearch } from "@/components/admin/audit-logs/audit-logs-search"
import { AuditLogsPagination } from "@/components/admin/audit-logs/audit-logs-pagination"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Card } from "@/components/ui/card"
import { fetchAuditLogs } from "@/lib/api"
import type { AuditLog, AuditLogFilters } from "@/types/audit-logs"

export default function AuditLogsPage() {
  const { user, signOut } = useAuth()
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<AuditLogFilters>({
    dateRange: { from: null, to: null },
    users: [],
    actionTypes: [],
  })

  const logsPerPage = 10

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Fetch audit logs
  useEffect(() => {
    const getAuditLogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAuditLogs()
        setAuditLogs(data)
        setTotalPages(Math.ceil(data.length / logsPerPage))
      } catch (err) {
        console.error("Error fetching audit logs:", err)
        setError("Failed to load audit logs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getAuditLogs()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...auditLogs]

    // Apply date range filter
    if (filters.dateRange.from && filters.dateRange.to) {
      const fromDate = new Date(filters.dateRange.from)
      const toDate = new Date(filters.dateRange.to)
      toDate.setHours(23, 59, 59, 999) // Set to end of day

      result = result.filter((log) => {
        const logDate = new Date(log.timestamp)
        return logDate >= fromDate && logDate <= toDate
      })
    }

    // Apply user filter
    if (filters.users.length > 0) {
      result = result.filter((log) => filters.users.includes(log.user.id))
    }

    // Apply action type filter
    if (filters.actionTypes.length > 0) {
      result = result.filter((log) => filters.actionTypes.includes(log.actionType))
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (log) =>
          log.user.name.toLowerCase().includes(query) ||
          log.user.email.toLowerCase().includes(query) ||
          log.actionType.toLowerCase().includes(query) ||
          log.details.toLowerCase().includes(query) ||
          log.ipAddress.includes(query),
      )
    }

    setFilteredLogs(result)
    setTotalPages(Math.ceil(result.length / logsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [auditLogs, filters, searchQuery])

  // Get current logs for pagination
  const getCurrentLogs = () => {
    const indexOfLastLog = currentPage * logsPerPage
    const indexOfFirstLog = indexOfLastLog - logsPerPage
    return filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<AuditLogFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      dateRange: { from: null, to: null },
      users: [],
      actionTypes: [],
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <DashboardHeader
        displayName={user?.email?.split("@")[0] || "Admin"}
        avatarUrl={null}
        currentTime={currentTime}
        onSignOut={signOut}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <AuditLogsHeader />

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <AuditLogsSearch searchQuery={searchQuery} onSearch={handleSearch} />
            </div>
            <div className="flex-1">
              <AuditLogsFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                auditLogs={auditLogs}
              />
            </div>
          </div>

          {error ? (
            <ErrorAlert title="Error loading audit logs" description={error} />
          ) : (
            <>
              <AuditLogsTable logs={getCurrentLogs()} loading={loading} />

              <div className="mt-6">
                <AuditLogsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
