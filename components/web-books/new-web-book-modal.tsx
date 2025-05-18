"use client"

import { useState } from "react"
import { WebBookForm } from "./web-book-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface NewWebBookModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void>
}

export function NewWebBookModal({ isOpen, onClose, onSubmit }: NewWebBookModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Web Book</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new web book. You can add chapters and content later.
          </DialogDescription>
        </DialogHeader>
        <WebBookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Create Book" />
      </DialogContent>
    </Dialog>
  )
}
