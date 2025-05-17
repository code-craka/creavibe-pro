"use client"

import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Notification } from "@/types/notifications"

interface NotificationItemProps {
  notification: Notification
  onClick: () => void
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const formattedTime = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex cursor-pointer rounded-md p-3 transition-colors hover:bg-muted",
        !notification.read && "bg-primary/5",
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${notification.title} - ${notification.message}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !notification.read && "text-primary")}>{notification.title}</p>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
      </div>
      {!notification.read && (
        <div className="ml-2 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
      )}
    </motion.div>
  )
}
