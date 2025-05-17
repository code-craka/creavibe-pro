"use client"

import { useState, useEffect, useRef } from "react"
import { Bell } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface NotificationBellProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
  className?: string
}

export function NotificationBell({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  className,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

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
  }

  return (
    <div ref={bellRef} className={cn("relative", className)}>
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 rounded-full"
        onClick={toggleDropdown}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-4 w-4" />

        {/* Notification Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="h-7 px-2 text-xs">
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={onClearAll} className="h-7 px-2 text-xs">
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              {notifications.length > 0 ? (
                <ScrollArea className="h-[300px] overflow-y-auto">
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex flex-col gap-1 rounded-md p-3 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                          !notification.read && "bg-gray-50 dark:bg-gray-700/50",
                        )}
                        onClick={() => handleNotificationClick(notification)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{notification.timestamp}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                        {!notification.read && <div className="mt-1 h-2 w-2 rounded-full bg-purple-500 self-end" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
