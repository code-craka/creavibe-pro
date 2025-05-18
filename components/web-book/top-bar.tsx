"use client"
import { Book, Edit, Menu, Moon, Sun, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { WebBook } from "@/types/web-book"

interface TopBarProps {
  book: WebBook
  onToggleSidebar: () => void
  onToggleTheme: () => void
  isDarkTheme: boolean
  onTogglePublish: () => void
  onEditClick: () => void
  className?: string
}

export function TopBar({
  book,
  onToggleSidebar,
  onToggleTheme,
  isDarkTheme,
  onTogglePublish,
  onEditClick,
  className,
}: TopBarProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 border-b", className)}>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Book className="h-5 w-5 mr-2 text-primary" />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">{book.title}</h1>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 mr-4">
          <Switch id="publish-mode" checked={book.isPublished} onCheckedChange={onTogglePublish} />
          <Label htmlFor="publish-mode" className="hidden md:inline-block">
            {book.isPublished ? (
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                Public
              </span>
            ) : (
              <span className="flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Private
              </span>
            )}
          </Label>
          {!book.isPublished && <Lock className="h-4 w-4 md:hidden" />}
          {book.isPublished && <Globe className="h-4 w-4 md:hidden" />}
        </div>

        <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="outline" onClick={onEditClick} className="hidden md:flex">
          <Edit className="h-4 w-4 mr-2" />
          Edit in Editor
        </Button>

        <Button variant="ghost" size="icon" onClick={onEditClick} className="md:hidden" aria-label="Edit in editor">
          <Edit className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
