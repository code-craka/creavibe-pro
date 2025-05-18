"use client"

import type { WebBook, WebBookFormValues } from "@/types/web-book"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebBookFormProps {
  book?: WebBook
  onSubmit: (formData: FormData) => Promise<void>
  isSubmitting: boolean
  submitLabel: string
}

export function WebBookForm({ book, onSubmit, isSubmitting, submitLabel }: WebBookFormProps) {
  const defaultValues: WebBookFormValues = {
    title: book?.title || "",
    description: book?.description || "",
    coverImage: book?.coverImage || "",
    visibility: book?.visibility || "private",
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaultValues.title} placeholder="Enter book title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues.description}
          placeholder="Enter a brief description of your book"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
        <Input
          id="coverImage"
          name="coverImage"
          defaultValue={defaultValues.coverImage}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visibility">Visibility</Label>
        <Select name="visibility" defaultValue={defaultValues.visibility}>
          <SelectTrigger id="visibility">
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Public books can be viewed by anyone with the link. Private books are only visible to you.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
