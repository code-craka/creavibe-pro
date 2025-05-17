"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TemplateCategory } from "@/types/templates"

interface TemplateFiltersProps {
  categories: TemplateCategory[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearch: (query: string) => void
}

export function TemplateFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearch,
}: TemplateFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full md:w-auto">
        <TabsList className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 md:flex">
          <TabsTrigger value="all" className="px-3">
            All Templates
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-3">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative w-full md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="w-full pl-8 pr-8"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchQuery && (
          <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-9 w-9 p-0" onClick={() => onSearch("")}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}
