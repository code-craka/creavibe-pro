"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

interface SearchResult {
  title: string
  href: string
  content: string
}

export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSearch = useCallback(async (search: string) => {
    if (search.length === 0) {
      setResults([])
      return
    }

    setLoading(true)

    // In a real implementation, this would be an API call to a search endpoint
    // For demo purposes, we'll simulate a search with mock data
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          title: "Getting Started",
          href: "/docs/getting-started",
          content: "Learn how to get started with CreaVibe API and SDK.",
        },
        {
          title: "Authentication",
          href: "/docs/authentication",
          content: "Learn how to authenticate with the CreaVibe API.",
        },
        {
          title: "API Keys",
          href: "/docs/authentication/api-keys",
          content: "Generate and manage API keys for your CreaVibe account.",
        },
      ].filter(
        (result) =>
          result.title.toLowerCase().includes(search.toLowerCase()) ||
          result.content.toLowerCase().includes(search.toLowerCase()),
      )

      setResults(mockResults)
      setLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    onSearch(query)
  }, [query, onSearch])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          <Search className="mr-2 h-4 w-4" />
          Search docs...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {results.map((result) => (
              <CommandItem key={result.href} onSelect={() => handleSelect(result.href)}>
                <div className="text-sm">
                  <p className="font-medium">{result.title}</p>
                  <p className="text-muted-foreground line-clamp-1">{result.content}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
