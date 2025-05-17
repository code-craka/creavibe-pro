import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getActionTypeColor(actionType: string): string {
  const colorMap: Record<string, string> = {
    Create: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Update: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Delete: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    Login: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    Logout: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    Export: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Import: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    Share: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    Publish: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    Unpublish: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  }

  return colorMap[actionType] || "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
}

export function getCategoryColor(categoryId: string): string {
  const colorMap: Record<string, string> = {
    blog: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    social: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    email: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    ads: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return colorMap[categoryId] || "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
}
