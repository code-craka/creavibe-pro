"use client"

import { Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

interface NotificationActionsProps {
  hasNotifications: boolean
  hasUnread: boolean
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

export function NotificationActions({
  hasNotifications,
  hasUnread,
  onMarkAllAsRead,
  onClearAll,
}: NotificationActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onMarkAllAsRead} disabled={!hasUnread} className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Mark all as read</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onClearAll}
          disabled={!hasNotifications}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear all</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
