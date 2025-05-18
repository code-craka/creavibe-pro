"use client"

import { useState, useEffect } from "react"
import { WebBooksHeader } from "@/components/web-books/web-books-header"
import { WebBooksList } from "@/components/web-books/web-books-list"
import { WebBooksEmptyState } from "@/components/web-books/web-books-empty-state"
import { NewWebBookModal } from "@/components/web-books/new-web-book-modal"
import { EditWebBookModal } from "@/components/web-books/edit-web-book-modal"
import { DeleteWebBookModal } from "@/components/web-books/delete-web-book-modal"
import { useToast } from "@/hooks/use-toast"
import type { WebBook } from "@/types/web-book"
import { mockWebBooks } from "@/lib/mock-web-books"

export default function WebBooksPage() {
  const [books, setBooks] = useState<WebBook[]>([])
  const [filteredBooks, setFilteredBooks] = useState<WebBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "public" | "private">("all")
  const [sortOption, setSortOption] = useState<"updated" | "title" | "visibility">("updated")
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false)
  const [bookToEdit, setBookToEdit] = useState<WebBook | null>(null)
  const [bookToDelete, setBookToDelete] = useState<WebBook | null>(null)
  const { toast } = useToast()

  // Fetch books (simulated)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setBooks(mockWebBooks)
      } catch (error) {
        toast({
          title: "Error fetching books",
          description: "There was a problem loading your web books.",
          duration: 3000,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [toast])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...books]

    // Apply visibility filter
    if (visibilityFilter !== "all") {
      result = result.filter((book) =>
        visibilityFilter === "public" ? book.visibility === "public" : book.visibility === "private",
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title)
      } else if (sortOption === "visibility") {
        return a.visibility.localeCompare(b.visibility)
      }
      return 0
    })

    setFilteredBooks(result)
  }, [books, visibilityFilter, sortOption])

  // Handle creating a new book
  const handleCreateBook = async (formData: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newBook: WebBook = {
        id: `book-${Date.now()}`,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        coverImage: (formData.get("coverImage") as string) || undefined,
        author: {
          id: "current-user",
          name: "Current User",
          avatar: "/abstract-profile.png",
        },
        chapterCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: false,
        visibility: formData.get("visibility") as "public" | "private",
      }

      setBooks((prev) => [newBook, ...prev])
      setIsNewBookModalOpen(false)

      toast({
        title: "Book created",
        description: "Your new web book has been created successfully.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error creating book",
        description: "There was a problem creating your web book.",
        duration: 3000,
      })
    }
  }

  // Handle updating a book
  const handleUpdateBook = async (formData: FormData) => {
    if (!bookToEdit) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedBook: WebBook = {
        ...bookToEdit,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        coverImage: (formData.get("coverImage") as string) || undefined,
        visibility: formData.get("visibility") as "public" | "private",
        updatedAt: new Date().toISOString(),
      }

      setBooks((prev) => prev.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
      setBookToEdit(null)

      toast({
        title: "Book updated",
        description: "Your web book has been updated successfully.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error updating book",
        description: "There was a problem updating your web book.",
        duration: 3000,
      })
    }
  }

  // Handle deleting a book
  const handleDeleteBook = async () => {
    if (!bookToDelete) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setBooks((prev) => prev.filter((book) => book.id !== bookToDelete.id))
      setBookToDelete(null)

      toast({
        title: "Book deleted",
        description: "Your web book has been deleted successfully.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error deleting book",
        description: "There was a problem deleting your web book.",
        duration: 3000,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <WebBooksHeader
        onNewBook={() => setIsNewBookModalOpen(true)}
        visibilityFilter={visibilityFilter}
        onVisibilityFilterChange={setVisibilityFilter}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      {isLoading ? (
        <WebBooksList isLoading={true} books={[]} />
      ) : filteredBooks.length > 0 ? (
        <WebBooksList
          books={filteredBooks}
          onEdit={setBookToEdit}
          onPreview={(book) => {
            // In a real app, this would navigate to the preview page
            console.log("Preview book:", book.id)
          }}
          onDelete={setBookToDelete}
        />
      ) : (
        <WebBooksEmptyState onNewBook={() => setIsNewBookModalOpen(true)} hasBooks={books.length > 0} />
      )}

      <NewWebBookModal
        isOpen={isNewBookModalOpen}
        onClose={() => setIsNewBookModalOpen(false)}
        onSubmit={handleCreateBook}
      />

      <EditWebBookModal
        book={bookToEdit}
        isOpen={!!bookToEdit}
        onClose={() => setBookToEdit(null)}
        onSubmit={handleUpdateBook}
      />

      <DeleteWebBookModal
        book={bookToDelete}
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onDelete={handleDeleteBook}
      />
    </div>
  )
}
