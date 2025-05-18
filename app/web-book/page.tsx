"use client"

import { WebBookRenderer } from "@/components/web-book/web-book-renderer"

export default function WebBookPage() {
  return (
    <WebBookRenderer
      onEditClick={() => {
        console.log("Navigate to editor")
        // In a real app, this would navigate to the editor
        // router.push(`/editor/${bookId}`)
      }}
    />
  )
}
