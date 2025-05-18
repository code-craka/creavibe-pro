"use client"

import { useState } from "react"
import type { WebBook } from "@/types/web-book"
import { WebBookForm } from "./web-book-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EditWebBookModalProps {
  book: WebBook | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void>
}

export function EditWebBookModal({ book, isOpen, onClose, onSubmit }: EditWebBookModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!book) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Web Book</DialogTitle>
          <DialogDescription>Update the details of your web book.</DialogDescription>
        </DialogHeader>
        <WebBookForm book={book} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Save Changes" />
      </DialogContent>
    </Dialog>
  )
}
