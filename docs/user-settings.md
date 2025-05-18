# Advanced User Settings Page

The Advanced User Settings page provides a comprehensive interface for users to manage their account settings, customize the application appearance, connect with external services, export data, and manage API tokens within the Creavibe.pro application.

## Features

### API Token Analytics
- **Usage Dashboard**: Comprehensive dashboard showing key API usage metrics
- **Request Visualization**: Interactive charts showing API usage patterns over time
- **Detailed Request Logs**: Searchable and filterable logs of all API requests
- **Error Analysis**: Breakdown of error rates and common error types
- **Usage Alerts**: Configurable thresholds for usage notifications
- **Performance Metrics**: Response time and data transfer analytics
- **Usage Recommendations**: AI-powered suggestions for optimizing API usage

### Data Export
- **Multiple Export Formats**: Export data in JSON, CSV, and Excel (XLSX) formats
- **Selective Data Export**: Choose specific data types to export
- **Date Range Filtering**: Filter exported data by date range
- **Export Progress Tracking**: Visual progress indicator during export
- **Recent Exports History**: View and download previous exports

### API Token Management
- **Token Generation**: Create API tokens with specific permissions
- **Token Security**: Secure token display and copy functionality
- **Permission Management**: Granular control over token permissions
- **Token Revocation**: Easily revoke tokens when no longer needed
- **Usage Tracking**: View when tokens were created and last used

### Tabbed Interface
- **Profile Settings**: Manage personal information and profile picture
- **Theme Settings**: Customize application appearance with color palettes and typography
- **Connected Accounts**: Link and manage external service integrations
- **Notification Settings**: Control email, push, and in-app notifications
- **Security Settings**: Manage password, two-factor authentication, and security preferences

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

### ApiTokenAnalytics
Provides detailed analytics and insights for API token usage.

### DataExportSettings
Manages data export functionality with format selection, data type filtering, and export history.

### ApiTokenSettings
Handles API token generation, permission management, and token revocation.

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

## API Token Analytics

The API token analytics functionality provides:

1. **Usage Overview**: Dashboard with key metrics (total requests, success rate, response time, data transfer)
2. **Usage Trends**: Charts showing API usage patterns over time
3. **Request Logs**: Detailed, searchable logs of all API requests
4. **Endpoint Analysis**: Insights into most frequently used endpoints
5. **Error Analysis**: Breakdown of error rates by status code
6. **Usage Alerts**: Configurable thresholds for usage notifications
7. **Performance Insights**: Response time and data transfer analytics
8. **Usage Recommendations**: AI-powered suggestions for optimizing API usage

## Data Export

The data export functionality allows users to:

1. Select specific data types to export (Projects, Templates, Content, etc.)
2. Choose the export format (JSON, CSV, Excel)
3. Filter data by date range
4. Track export progress
5. Download completed exports

## API Token Management

The API token system provides:

1. Secure token generation with descriptive names
2. Granular permission control for different API endpoints
3. Token usage tracking (creation date, last used)
4. Secure token display and copy functionality
5. Easy token revocation

## Customization

You can customize the settings page by:

1. Adding or removing tabs for different setting categories
2. Extending the data export options with additional formats
3. Adding more API token permissions based on your API endpoints
4. Customizing the export data types based on your application's data model
5. Integrating with your authentication and user management services

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

Let's create an example usage page:
