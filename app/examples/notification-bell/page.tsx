"use client"

import { useState } from "react"
import { NotificationBell } from "@/components/notification-bell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@/types/notifications"

// Mock notifications data
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    message: "Sarah commented on your blog post 'AI Trends 2023'",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "Project shared with you",
    message: "John shared the project 'Marketing Campaign Q2' with you",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: "3",
    title: "Task assigned to you",
    message: "Alex assigned you the task 'Create social media graphics'",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: true,
  },
  {
    id: "4",
    title: "New template available",
    message: "Check out the new 'Product Launch' template in the library",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
  },
]

export default function NotificationBellExample() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const { toast } = useToast()

  // Mark a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
    })
  }

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([])
    toast({
      title: "All notifications cleared",
    })
  }

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    toast({
      title: "Notification clicked",
      description: notification.title,
    })
  }

  // Add a new notification
  const addNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: "New notification",
      message: "This is a new notification that was just created",
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notification Bell Example</h1>
        <div className="flex items-center gap-4">
          <Button onClick={addNotification}>Add Notification</Button>
          <NotificationBell
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Bell Component</CardTitle>
          <CardDescription>A responsive bell icon button with a dropdown notification menu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This example demonstrates the NotificationBell component with the following features:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bell icon button with unread notification badge</li>
              <li>Dropdown menu with scrollable notification list</li>
              <li>Mark notifications as read individually or all at once</li>
              <li>Clear all notifications</li>
              <li>Smooth animations for badge and dropdown</li>
              <li>Fully responsive and accessible</li>
            </ul>
            <p>
              Click the "Add Notification" button to add a new notification, or interact with the bell icon to see the
              dropdown menu.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
