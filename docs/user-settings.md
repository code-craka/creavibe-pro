# Advanced User Settings Page

The Advanced User Settings page provides a comprehensive interface for users to manage their account settings, customize the application appearance, and connect with external services within the Creavibe.pro application.

## Features

### Tabbed Interface
- **Profile Settings**: Manage personal information and profile picture
- **Theme Settings**: Customize application appearance with color palettes and typography
- **Connected Accounts**: Link and manage external service integrations
- **Notification Settings**: Control email, push, and in-app notifications
- **Security Settings**: Manage password, two-factor authentication, and security preferences

### Profile Management
- **Profile Picture Upload**: Upload, preview, and crop profile images
- **Personal Information**: Edit name, email, and bio
- **Account Deletion**: Secure process for account deletion with confirmation

### Theme Customization
- **Color Palette Selection**: Choose from predefined color schemes or create custom palettes
- **Dark/Light Mode Toggle**: Switch between light, dark, or system theme
- **Typography Settings**: Customize font family and size with live preview
- **Accessibility Options**: Settings for reduced motion and high contrast

### Connected Accounts
- **External Service Integration**: Connect with Google, Facebook, Twitter, GitHub, and LinkedIn
- **Authentication Flow**: Secure OAuth connection process
- **Account Management**: View, connect, and disconnect linked accounts

### Notification Preferences
- **Email Notifications**: Control email frequency and content types
- **Push Notifications**: Manage mobile and desktop push alerts
- **In-App Notifications**: Configure notifications within the application
- **Digest Settings**: Set frequency for notification summaries

### Security Features
- **Password Management**: Update password with strength requirements
- **Two-Factor Authentication**: Enable/disable 2FA with recovery codes
- **Security Settings**: Configure session timeout and login notifications

## Usage

\`\`\`tsx
import { UserSettingsPage } from "@/components/settings/user-settings-page"

export default function SettingsPage() {
  return <UserSettingsPage />
}
\`\`\`

## Components

### UserSettingsPage
The main component that renders the tabbed settings interface.

### ProfileSettings
Manages user profile information and profile picture upload.

### ThemeSettings
Handles theme customization including color palettes, dark mode, and typography.

### ConnectedAccountsSettings
Manages external service integrations and account connections.

### NotificationSettings
Controls notification preferences across different channels.

### SecuritySettings
Handles password management, two-factor authentication, and security options.

### DeleteAccountDialog
A modal dialog for account deletion confirmation.

## Customization

You can customize the settings page by:

1. Adding or removing tabs for different setting categories
2. Extending the theme options with additional color palettes
3. Integrating with your authentication and user management services
4. Adding more connected account providers
5. Customizing notification categories based on your application's features

## Accessibility

The settings page is built with accessibility in mind:
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for modals
- High contrast visual options
- Reduced motion settings

## Responsive Design

The settings page is fully responsive:
- Tabbed interface adapts to screen size
- Mobile-optimized controls
- Responsive form layouts
- Touch-friendly interactive elements
\`\`\`

Let's create the necessary UI components:
