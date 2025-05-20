"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"

// Mock notifications data
const initialNotifications = [
  {
    id: "1",
    title: "New comment on your post",
    message: "John Doe commented on your blog post",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Your export is ready",
    message: "Your content export has completed successfully",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Weekly summary",
    message: "Your weekly content performance summary is available",
    timestamp: "1 day ago",
    read: true,
  },
]

export default function NavbarExample() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6">Navbar Example</h1>
        <p className="text-muted-foreground mb-4">
          This page demonstrates the responsive navbar component for CreaVibe. The navbar includes branding,
          navigation links, notification bell, and user avatar with dropdown menu.
        </p>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Responsive design with mobile menu</li>
              <li>Conditional admin link based on user role</li>
              <li>Notification bell with badge</li>
              <li>User avatar with dropdown menu</li>
              <li>Login/Logout buttons based on authentication state</li>
              <li>Scroll effect with background blur</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
