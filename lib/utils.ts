import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(categoryId: string): string {
  switch (categoryId) {
    case "blog":
      return "text-blue-500"
    case "social":
      return "text-green-500"
    case "email":
      return "text-yellow-500"
    case "ads":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

export function getActionTypeColor(actionType: string): string {
  switch (actionType) {
    case "Login":
      return "text-green-500"
    case "Create":
      return "text-blue-500"
    case "Update":
      return "text-yellow-500"
    case "Delete":
      return "text-red-500"
    case "Share":
      return "text-purple-500"
    case "Publish":
      return "text-teal-500"
    case "Export":
      return "text-orange-500"
    case "Import":
      return "text-lime-500"
    case "Logout":
      return "text-gray-500"
    default:
      return "text-gray-500"
  }
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  if (!isValid(date)) return ""

  return format(date, "MMM d, yyyy")
}
