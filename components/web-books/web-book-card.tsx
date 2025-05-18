"use client"

import { formatDistanceToNow } from "date-fns"
import { Edit, Eye, Trash2 } from "lucide-react"
import type { WebBook } from "@/types/web-book"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface WebBookCardProps {
  book: WebBook
  onEdit: (book: WebBook) => void
  onPreview: (book: WebBook) => void
  onDelete: (book: WebBook) => void
}

export function WebBookCard({ book, onEdit, onPreview, onDelete }: WebBookCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {book.coverImage ? (
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={`Cover for ${book.title}`}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <span className="text-4xl">📚</span>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
          <Badge variant={book.visibility === "public" ? "default" : "outline"}>
            {book.visibility === "public" ? "Public" : "Private"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>By {book.author.name}</span>
          <span className="mx-2">•</span>
          <span>
            {book.chapterCount} {book.chapterCount === 1 ? "chapter" : "chapters"}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {book.description || "No description provided."}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(book.updatedAt), { addSuffix: true })}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onPreview(book)} aria-label={`Preview ${book.title}`}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(book)}
            aria-label={`Delete ${book.title}`}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function WebBookCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  )
}
