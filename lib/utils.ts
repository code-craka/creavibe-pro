import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
