"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarIcon, Filter, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { AuditLog, AuditLogFilters } from "@/types/audit-logs"

interface AuditLogsFiltersProps {
  filters: AuditLogFilters
  onFilterChange: (filters: Partial<AuditLogFilters>) => void
  onClearFilters: () => void
  auditLogs: AuditLog[]
}

export function AuditLogsFilters({ filters, onFilterChange, onClearFilters, auditLogs }: AuditLogsFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  // Extract unique users from logs
  const uniqueUsers = Array.from(
    new Map(
      auditLogs.map((log) => [log.user.id, { id: log.user.id, name: log.user.name, email: log.user.email }]),
    ).values(),
  )

  // Extract unique action types from logs
  const uniqueActionTypes = Array.from(new Set(auditLogs.map((log) => log.actionType)))

  // Handle date range selection
  const handleDateRangeSelect = (date: Date | undefined) => {
    if (!date) return

    const from = filters.dateRange.from
    const to = filters.dateRange.to

    if (!from) {
      onFilterChange({ dateRange: { from: date, to: null } })
    } else if (!to && date >= from) {
      onFilterChange({ dateRange: { from, to: date } })
      setDateOpen(false)
    } else {
      onFilterChange({ dateRange: { from: date, to: null } })
    }
  }

  // Handle user selection
  const handleUserSelect = (userId: string) => {
    const currentUsers = [...filters.users]
    const userIndex = currentUsers.indexOf(userId)

    if (userIndex === -1) {
      currentUsers.push(userId)
    } else {
      currentUsers.splice(userIndex, 1)
    }

    onFilterChange({ users: currentUsers })
  }

  // Handle action type selection
  const handleActionTypeSelect = (actionType: string) => {
    const currentActionTypes = [...filters.actionTypes]
    const actionTypeIndex = currentActionTypes.indexOf(actionType)

    if (actionTypeIndex === -1) {
      currentActionTypes.push(actionType)
    } else {
      currentActionTypes.splice(actionTypeIndex, 1)
    }

    onFilterChange({ actionTypes: currentActionTypes })
  }

  return (
    <div className="flex flex-wrap gap-2 items-center justify-end">
      {/* Date Range Filter */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              (filters.dateRange.from || filters.dateRange.to) && "text-primary",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateRange.from && filters.dateRange.to ? (
              <>
                {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
              </>
            ) : filters.dateRange.from ? (
              <>From {format(filters.dateRange.from, "LLL dd, y")}</>
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={{
              from: filters.dateRange.from || undefined,
              to: filters.dateRange.to || undefined,
            }}
            onSelect={(range) => {
              onFilterChange({
                dateRange: {
                  from: range?.from || null,
                  to: range?.to || null,
                },
              })
              if (range?.to) setDateOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* User Filter */}
      <Popover open={userOpen} onOpenChange={setUserOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={userOpen}
            className={cn("justify-between", filters.users.length > 0 && "text-primary")}
          >
            {filters.users.length > 0
              ? `${filters.users.length} user${filters.users.length > 1 ? "s" : ""} selected`
              : "Filter by User"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search users..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {uniqueUsers.map((user) => (
                  <CommandItem key={user.id} value={user.id} onSelect={() => handleUserSelect(user.id)}>
                    <Check
                      className={cn("mr-2 h-4 w-4", filters.users.includes(user.id) ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Action Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={cn(filters.actionTypes.length > 0 && "text-primary")}>
            <Filter className="mr-2 h-4 w-4" />
            {filters.actionTypes.length > 0
              ? `${filters.actionTypes.length} action${filters.actionTypes.length > 1 ? "s" : ""}`
              : "Action Types"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {uniqueActionTypes.map((actionType) => (
            <DropdownMenuCheckboxItem
              key={actionType}
              checked={filters.actionTypes.includes(actionType)}
              onCheckedChange={() => handleActionTypeSelect(actionType)}
            >
              {actionType}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {(filters.dateRange.from ||
        filters.dateRange.to ||
        filters.users.length > 0 ||
        filters.actionTypes.length > 0) && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  )
}
