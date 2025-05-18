"use client"

import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function SearchForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentSearch = searchParams.get("search") || ""

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get("search") as string

    const params = new URLSearchParams(searchParams.toString())

    if (search) {
      params.set("search", search)
    } else {
      params.delete("search")
    }

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input name="search" placeholder="Search articles..." className="pl-10" defaultValue={currentSearch} />
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  )
}

export function BlogSearch() {
  return (
    <Suspense
      fallback={
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 bg-muted-foreground/30 rounded" />
          <div className="h-10 w-full bg-muted/50 rounded-md" />
        </div>
      }
    >
      <SearchForm />
    </Suspense>
  )
}
