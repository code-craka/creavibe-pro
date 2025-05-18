"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function IntegrationsSearch() {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search integrations..." className="w-full pl-8" />
    </div>
  )
}
