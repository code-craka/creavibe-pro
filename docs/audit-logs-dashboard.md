# Audit Logs Dashboard Documentation

The Audit Logs Dashboard is a comprehensive component for the CreaVibe SaaS application that allows administrators to monitor user actions and system events. It provides a clear and efficient way to view, filter, and search audit logs.

## Features

- **Data Display**: Displays audit logs in a sortable table with columns for timestamp, user, action type, details, and IP address.
- **Filtering**: Filter logs by date range, user, and action type.
- **Sorting**: Sort logs by timestamp, user, or action type.
- **Search**: Search logs by keyword across all fields.
- **Pagination**: Navigate through large sets of logs with pagination controls.
- **Visual Indicators**: Color-coded badges for different action types.
- **Responsive Design**: Adapts to different screen sizes with appropriate column visibility.
- **Loading States**: Skeleton loaders for a smooth user experience.
- **Error Handling**: Graceful error display when logs cannot be loaded.

## Components

### Main Components

1. **AuditLogsHeader**: Displays the page title and description.
2. **AuditLogsFilters**: Contains date range, user, and action type filters.
3. **AuditLogsSearch**: Provides a search input for filtering logs by keyword.
4. **AuditLogsTable**: Displays the logs in a sortable table.
5. **AuditLogsPagination**: Provides pagination controls for navigating through logs.

### Usage

\`\`\`tsx
import { AuditLogsHeader } from "@/components/admin/audit-logs/audit-logs-header"
import { AuditLogsFilters } from "@/components/admin/audit-logs/audit-logs-filters"
import { AuditLogsSearch } from "@/components/admin/audit-logs/audit-logs-search"
import { AuditLogsTable } from "@/components/admin/audit-logs/audit-logs-table"
import { AuditLogsPagination } from "@/components/admin/audit-logs/audit-logs-pagination"

// Basic usage
function AuditLogsPage() {
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    users: [],
    actionTypes: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // Fetch logs and handle filtering logic...

  return (
    <main>
      <AuditLogsHeader />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <AuditLogsSearch searchQuery={searchQuery} onSearch={setSearchQuery} />
        </div>
        <div className="flex-1">
          <AuditLogsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            auditLogs={logs}
          />
        </div>
      </div>
      
      <AuditLogsTable logs={getCurrentLogs()} loading={loading} />
      
      <div className="mt-6">
        <AuditLogsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  )
}
\`\`\`

## Audit Log Data Structure

The audit logs dashboard uses the following data structure:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: User
  actionType: string
  details: string
  ipAddress: string
}

interface DateRange {
  from: Date | null
  to: Date | null
}

interface AuditLogFilters {
  dateRange: DateRange
  users: string[]
  actionTypes: string[]
}
\`\`\`

## Styling

The component uses Tailwind CSS for styling with the following key features:

- **Responsive Table**: Hides less important columns on smaller screens
- **Color-coded Badges**: Different colors for different action types
- **Tooltips**: For displaying full timestamps and truncated details
- **Skeleton Loaders**: For a smooth loading experience

## Accessibility

The audit logs dashboard follows accessibility best practices:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Sufficient contrast for text and UI elements
- **Focus States**: Visible focus indicators for keyboard users

## Error Handling

The dashboard includes error handling for API failures:

- **Error Display**: Shows a user-friendly error message when logs cannot be loaded
- **Retry Mechanism**: Allows users to retry failed requests
- **Graceful Degradation**: Maintains UI integrity even when data is unavailable

## Performance Considerations

To ensure optimal performance with large datasets:

- **Pagination**: Limits the number of logs displayed at once
- **Efficient Filtering**: Applies filters client-side for immediate feedback
- **Debounced Search**: Prevents excessive filtering during typing
- **Virtualization**: Consider implementing virtualization for very large datasets

## API Integration

The dashboard is designed to work with a RESTful API:

- **Fetch Logs**: `GET /api/audit-logs` with optional query parameters for filtering
- **Expected Response**: Array of audit log objects with pagination metadata
- **Error Handling**: Gracefully handles API errors with user-friendly messages
