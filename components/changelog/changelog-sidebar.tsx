"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { ChangeType, ChangelogFilter } from "@/types/changelog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"

interface ChangelogSidebarProps {
  filter: ChangelogFilter
  onFilterChange: (filter: ChangelogFilter) => void
}

export default function ChangelogSidebar({ filter, onFilterChange }: ChangelogSidebarProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: filter.startDate,
    to: filter.endDate,
  })

  const handleTypeChange = (type: ChangeType, checked: boolean) => {
    const newTypes = checked ? [...filter.types, type] : filter.types.filter((t) => t !== type)

    onFilterChange({
      ...filter,
      types: newTypes,
    })
  }

  const handleSearchChange = (search: string) => {
    onFilterChange({
      ...filter,
      search,
    })
  }

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range)
    onFilterChange({
      ...filter,
      startDate: range?.from,
      endDate: range?.to,
    })
  }

  const handleReset = () => {
    setDate(undefined)
    onFilterChange({
      types: [],
      search: "",
      startDate: undefined,
      endDate: undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search updates..."
          className="pl-8"
          value={filter.search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <Accordion type="single" collapsible defaultValue="types" className="w-full">
        <AccordionItem value="types">
          <AccordionTrigger className="text-sm font-medium">Filter by type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-new"
                  checked={filter.types.includes("new")}
                  onCheckedChange={(checked) => handleTypeChange("new", checked as boolean)}
                />
                <Label htmlFor="type-new" className="flex items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-full bg-green-100 px-2.5 text-xs font-medium text-green-800">
                    New
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-improvement"
                  checked={filter.types.includes("improvement")}
                  onCheckedChange={(checked) => handleTypeChange("improvement", checked as boolean)}
                />
                <Label htmlFor="type-improvement" className="flex items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-full bg-blue-100 px-2.5 text-xs font-medium text-blue-800">
                    Improvement
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-fix"
                  checked={filter.types.includes("fix")}
                  onCheckedChange={(checked) => handleTypeChange("fix", checked as boolean)}
                />
                <Label htmlFor="type-fix" className="flex items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-full bg-red-100 px-2.5 text-xs font-medium text-red-800">
                    Fix
                  </span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="date">
          <AccordionTrigger className="text-sm font-medium">Filter by date</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleDateChange}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="ghost" className="w-full text-sm" onClick={handleReset}>
        Reset filters
      </Button>
    </div>
  )
}
