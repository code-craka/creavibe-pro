"use client"

import { useState } from "react"

export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, duration = 3000 }: Omit<Toast, "id">) => {
    const id = Date.now().toString()
    const newToast = { id, title, description, duration }

    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)

    return id
  }

  return { toast, toasts }
}
