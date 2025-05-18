"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { mockSearchResults } from "@/lib/mock-help-data"

export default function HelpCenterSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(mockSearchResults)

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

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length > 1) {
      // In a real app, this would be an API call
      const filtered = mockSearchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.content.toLowerCase().includes(value.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }

  return (
    <div className="relative max-w-3xl mx-auto mb-16">
      <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
        <Search className="ml-3 h-5 w-5 shrink-0 opacity-50" />
        <Input
          placeholder="Search for help..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-transparent"
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        />
        <Button variant="ghost" className="mr-2 text-xs text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for help..." value={query} onValueChange={handleSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {results.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => {
                  window.location.href = result.url
                  setOpen(false)
                }}
              >
                <div>
                  <h3 className="font-medium">{result.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{result.content}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
