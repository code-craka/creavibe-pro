"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Info, ArrowUp, ArrowDown } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDistanceToNow, format } from "date-fns"
import type { AuditLog } from "@/types/audit-logs"
import { getActionTypeColor } from "@/lib/utils"

interface AuditLogsTableProps {
  logs: AuditLog[]
  loading: boolean
}

export function AuditLogsTable({ logs, loading }: AuditLogsTableProps) {
  const [sortField, setSortField] = useState<keyof AuditLog>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Handle sort
  const handleSort = (field: keyof AuditLog) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Sort logs
  const sortedLogs = [...logs].sort((a, b) => {
    if (sortField === "timestamp") {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortField === "user") {
      const nameA = a.user.name.toLowerCase()
      const nameB = b.user.name.toLowerCase()
      return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    }

    if (sortField === "actionType") {
      return sortDirection === "asc"
        ? a.actionType.localeCompare(b.actionType)
        : b.actionType.localeCompare(a.actionType)
    }

    return 0
  })

  // Render sort indicator
  const renderSortIndicator = (field: keyof AuditLog) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
  }

  // Render loading skeletons
  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action Type</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Skeleton className="h-5 w-28" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Render empty state
  if (logs.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action Type</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No audit logs found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold -ml-3 flex items-center"
                onClick={() => handleSort("timestamp")}
              >
                Timestamp
                {renderSortIndicator("timestamp")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold -ml-3 flex items-center"
                onClick={() => handleSort("user")}
              >
                User
                {renderSortIndicator("user")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold -ml-3 flex items-center"
                onClick={() => handleSort("actionType")}
              >
                Action Type
                {renderSortIndicator("actionType")}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Details</TableHead>
            <TableHead className="hidden lg:table-cell">IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{format(new Date(log.timestamp), "PPpp")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{log.user.name}</span>
                  <span className="text-xs text-muted-foreground">{log.user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getActionTypeColor(log.actionType)}>
                  {log.actionType}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-xs">
                <div className="flex items-start">
                  <span className="text-sm truncate">{log.details}</span>
                  {log.details.length > 50 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View full details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p className="text-sm">{log.details}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell font-mono text-xs">{log.ipAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
