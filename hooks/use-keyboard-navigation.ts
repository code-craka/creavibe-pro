"use client"

import { useEffect, useCallback } from "react"

export function useKeyboardNavigation({
  onNextChapter,
  onPreviousChapter,
}: {
  onNextChapter: () => void
  onPreviousChapter: () => void
}) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Arrow right or Page Down for next chapter
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        onNextChapter()
      }
      // Arrow left or Page Up for previous chapter
      else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        onPreviousChapter()
      }
    },
    [onNextChapter, onPreviousChapter],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}
