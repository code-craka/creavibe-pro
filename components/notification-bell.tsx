"use client"

import { useState, useEffect, useRef } from "react"
import { Bell } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notification-item"
import { NotificationActions } from "@/components/notification-actions"
import { NotificationBadge } from "@/components/notification-badge"
import { useClickOutside } from "@/hooks/use-click-outside"
import type { Notification } from "@/types/notifications"

export interface NotificationBellProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
  onNotificationClick?: (notification: Notification) => void
  className?: string
}

export function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
  className,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Close dropdown when clicking outside
  useClickOutside(bellRef, () => {
    if (isOpen) setIsOpen(false)
  })

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }

    if (onNotificationClick) {
      onNotificationClick(notification)
    }
  }

  return (
    <div ref={bellRef} className={`relative ${className}`}>
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-10 w-10 rounded-full"
        onClick={toggleDropdown}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />

        {/* Notification Badge */}
        <AnimatePresence>{unreadCount > 0 && <NotificationBadge count={unreadCount} />}</AnimatePresence>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="notification-menu"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Notifications</h3>
                <NotificationActions
                  hasNotifications={notifications.length > 0}
                  hasUnread={unreadCount > 0}
                  onMarkAllAsRead={onMarkAllAsRead}
                  onClearAll={onClearAll}
                />
              </div>

              {notifications.length > 0 ? (
                <ScrollArea className="h-[300px] overflow-y-auto">
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
