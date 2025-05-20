# Navbar Component

The Navbar component is a responsive navigation bar for the CreaVibe SaaS application. It includes branding, navigation links, notification bell, and user avatar with dropdown menu.

## Features

- **Responsive Design**: Adapts to different screen sizes with a mobile-friendly hamburger menu
- **Branding**: Displays the CreaVibe logo and name
- **Navigation Links**: Provides links to key dashboard sections
- **Notification Bell**: Shows unread notification count and dropdown menu
- **User Avatar**: Displays user profile picture with dropdown menu
- **Authentication**: Shows login/signup buttons for unauthenticated users
- **Admin Access**: Conditionally shows admin link based on user role
- **Scroll Effect**: Changes appearance when scrolling down the page

## Usage

\`\`\`tsx
import { Navbar } from "@/components/navbar"

// Mock notifications data
const notifications = [
  {
    id: "1",
    title: "New comment",
    message: "John commented on your post",
    timestamp: "2 min ago",
    read: false,
  },
  // More notifications...
]

export default function Layout() {
  const handleMarkAsRead = (id) => {
    // Implementation to mark notification as read
  }

  const handleMarkAllAsRead = () => {
    // Implementation to mark all notifications as read
  }

  const handleClearAll = () => {
    // Implementation to clear all notifications
  }

  return (
    <>
      <Navbar
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />
      {/* Page content */}
    </>
  )
}
\`\`\`

## Props

| Name | Type | Description |
|------|------|-------------|
| `notifications` | `Notification[]` | Array of notification objects |
| `onMarkAsRead` | `(id: string) => void` | Function to mark a notification as read |
| `onMarkAllAsRead` | `() => void` | Function to mark all notifications as read |
| `onClearAll` | `() => void` | Function to clear all notifications |

## Notification Object

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the notification |
| `title` | `string` | Title of the notification |
| `message` | `string` | Content of the notification |
| `timestamp` | `string` | Time when the notification was created |
| `read` | `boolean` | Whether the notification has been read |

## Authentication

The Navbar component uses the `useAuth` hook from the authentication context to determine the user's authentication status and role. It displays different UI elements based on whether the user is authenticated and their role.

## Accessibility

The Navbar component follows accessibility best practices:
- Proper ARIA attributes for interactive elements
- Keyboard navigation support
- Semantic HTML elements
- Screen reader friendly text and labels

## Mobile Responsiveness

On smaller screens:
- Navigation links are hidden and replaced with a hamburger menu
- The hamburger menu opens a side drawer with navigation links
- The notification bell is hidden on very small screens
- The logo text is hidden on very small screens
\`\`\`

Let's add the necessary UI components:
