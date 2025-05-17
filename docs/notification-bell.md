# NotificationBell Component Documentation

The NotificationBell component is a responsive bell icon button with a dropdown notification menu for the Creavibe.pro application. It provides a clean and intuitive way for users to view and manage their notifications.

## Features

- **Bell Icon Button**: Triggers the display of a dropdown notification menu upon click
- **Notification Badge**: Displays the number of unread notifications with a red badge
- **Dropdown Menu**: Shows a list of notifications with timestamps, titles, and messages
- **Notification Actions**: Mark all as read and clear all notifications
- **Animations**: Smooth animations for badge, dropdown, and notifications
- **Accessibility**: Fully accessible with keyboard navigation and ARIA attributes
- **Responsive Design**: Adapts to different screen sizes

## Installation

The NotificationBell component uses the following dependencies:

- React
- Tailwind CSS
- shadcn/ui components
- Framer Motion (for animations)
- date-fns (for date formatting)

Make sure these dependencies are installed in your project.

## Usage

\`\`\`tsx
import { NotificationBell } from "@/components/notification-bell"
import type { Notification } from "@/types/notifications"

// Example notifications
const notifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    message: "Sarah commented on your blog post 'AI Trends 2023'",
    timestamp: new Date().toISOString(),
    read: false,
  },
  // More notifications...
]

// Example component
function Header() {
  // Handlers for notification actions
  const handleMarkAsRead = (id: string) => {
    // Mark notification as read logic
  }
  
  const handleMarkAllAsRead = () => {
    // Mark all notifications as read logic
  }
  
  const handleClearAll = () => {
    // Clear all notifications logic
  }
  
  const handleNotificationClick = (notification: Notification) => {
    // Handle notification click logic
  }
  
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Creavibe.pro</h1>
      <div className="flex items-center gap-4">
        <NotificationBell
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
          onNotificationClick={handleNotificationClick}
        />
        {/* Other header elements */}
      </div>
    </header>
  )
}
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| `notifications` | `Notification[]` | Array of notification objects |
| `onMarkAsRead` | `(id: string) => void` | Function to mark a notification as read |
| `onMarkAllAsRead` | `() => void` | Function to mark all notifications as read |
| `onClearAll` | `() => void` | Function to clear all notifications |
| `onNotificationClick` | `(notification: Notification) => void` | Optional function to handle notification click |
| `className` | `string` | Optional additional CSS classes |

## Notification Type

\`\`\`typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  link?: string; // Optional link to navigate to
}
\`\`\`

## Accessibility

The NotificationBell component follows accessibility best practices:

- Proper ARIA attributes for the bell button and dropdown menu
- Keyboard navigation support (Tab, Enter, Space, Escape)
- Screen reader friendly text and descriptions
- Focus management for interactive elements

## Customization

The NotificationBell component uses Tailwind CSS for styling and can be customized by:

1. Modifying the Tailwind classes in the component
2. Extending the component with additional props
3. Customizing the shadcn/ui theme variables

## Animation

The component uses Framer Motion for animations:

- Badge appears with a spring animation
- Dropdown menu slides in and fades in
- Notifications have a subtle entrance animation
- Smooth transitions for all interactive elements

## Best Practices

- Keep notification messages concise and informative
- Limit the number of notifications to prevent overwhelming the user
- Provide clear actions for notifications when applicable
- Consider implementing real-time notifications with WebSockets
\`\`\`

Let's make sure we have the necessary UI components:
