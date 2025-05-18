"use client"

import { useState } from "react"
import type { WebBook } from "@/types/web-book"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteWebBookModalProps {
  book: WebBook | null
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
}

export function DeleteWebBookModal({ book, isOpen, onClose, onDelete }: DeleteWebBookModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  if (!book) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Delete Web Book</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{book.title}</span>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This will permanently delete the web book and all of its chapters and content.
        </p>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
