# User Settings Page

The User Settings page provides a comprehensive interface for users to manage their account settings and preferences within the Creavibe.pro application.

## Features

### Profile Information Display
- Shows the user's name, role, and email address
- Displays the user's avatar or initials
- Includes a link to edit profile details
- Shows account creation date

### Logout Functionality
- Prominent logout button in the profile card
- Secure logout process with confirmation toast
- Redirects to login page after logout

### Additional Settings
- **Change Password**: Form to update password with current and new password fields
- **Notification Preferences**: Toggles for different notification types
- **Security Settings**: Placeholder for future security features
- **Account Deletion**: Dialog with confirmation process for account deletion

## Usage

\`\`\`tsx
import { UserSettingsPage } from "@/components/settings/user-settings-page"

export default function SettingsPage() {
  return <UserSettingsPage />
}
\`\`\`

## Components

### UserSettingsPage
The main component that renders the entire settings page.

### DeleteAccountDialog
A modal dialog that appears when the user attempts to delete their account. Requires typing "delete my account" to confirm.

### ChangePasswordForm
A form component for updating the user's password with current password verification.

### NotificationPreferences
A component with toggle switches for managing notification settings.

## Props

The `UserSettingsPage` component doesn't accept any props as it's designed to work with the authenticated user from your auth context.

## Customization

You can customize the appearance and behavior of the settings page by:

1. Modifying the card layouts and styling
2. Adding or removing settings sections
3. Connecting to your actual authentication and user management services
4. Extending the notification preferences with additional options

## Accessibility

The settings page is built with accessibility in mind:
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for modals
- High contrast visual elements

## Responsive Design

The settings page is fully responsive:
- Stacked layout on mobile devices
- Side-by-side layout on larger screens
- Properly sized touch targets for mobile
- Responsive typography and spacing
