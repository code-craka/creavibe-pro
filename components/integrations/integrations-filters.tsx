"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

export function IntegrationsFilters() {
  const [category, setCategory] = useState("all")

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
            <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="productivity">Productivity</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="communication">Communication</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="analytics">Analytics</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="storage">Storage</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="payment">Payment</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuRadioGroup value="popular">
            <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="alphabetical">Alphabetical</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
