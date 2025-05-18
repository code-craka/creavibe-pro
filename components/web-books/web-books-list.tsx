import type { WebBook } from "@/types/web-book"
import { WebBookCard, WebBookCardSkeleton } from "./web-book-card"

interface WebBooksListProps {
  books: WebBook[]
  isLoading?: boolean
  onEdit?: (book: WebBook) => void
  onPreview?: (book: WebBook) => void
  onDelete?: (book: WebBook) => void
}

export function WebBooksList({
  books,
  isLoading = false,
  onEdit = () => {},
  onPreview = () => {},
  onDelete = () => {},
}: WebBooksListProps) {
  // If loading, show skeleton cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <WebBookCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <WebBookCard key={book.id} book={book} onEdit={onEdit} onPreview={onPreview} onDelete={onDelete} />
      ))}
    </div>
  )
}
