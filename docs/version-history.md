# Version History Component Documentation

The Version History component provides a clean, organized interface for tracking and managing document revisions in the Creavibe.pro SaaS application.

## Features

- Displays up to 10 recent document versions in a vertical list
- Each version includes timestamp, description, and metadata (e.g., word count)
- "Restore" button for each version to revert to that specific document state
- Visual indication of the current active version
- Loading states for initial data fetching and restoration actions
- Empty state handling when no versions are available
- Responsive design that adapts to different screen sizes
- Accessible with proper ARIA attributes and keyboard navigation
- Customizable height with scrollable content area

## Installation

The component uses shadcn/ui components. Ensure you have the following components installed:

- Button
- Card (CardContent, CardHeader, CardTitle)
- ScrollArea
- Skeleton
- Tooltip

## Usage

\`\`\`tsx
import { VersionHistory } from "@/components/version-history/version-history"
import { Version } from "@/types/version-history"

// Example versions data
const versions: Version[] = [
  {
    id: "v1",
    timestamp: new Date(2023, 5, 15, 14, 30),
    description: "Initial draft",
    metadata: { wordCount: 500 }
  },
  {
    id: "v2",
    timestamp: new Date(2023, 5, 16, 10, 15),
    description: "Added introduction",
    metadata: { wordCount: 750 }
  }
]

// Current version ID
const currentVersionId = "v2"

// Handler for restoring a version
const handleRestore = async (version: Version) => {
  // Implement your restoration logic here
  console.log(`Restoring to version: ${version.id}`)
  
  // Example: Fetch the content of this version from your API
  const content = await fetchVersionContent(version.id)
  
  // Example: Update your document state with this content
  updateDocumentContent(content)
}

// Component implementation
function MyDocument() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {/* Document editor goes here */}
      </div>
      <div>
        <VersionHistory
          versions={versions}
          currentVersionId={currentVersionId}
          onRestore={handleRestore}
          maxHeight="500px"
        />
      </div>
    </div>
  )
}
\`\`\`

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `versions` | `Version[]` | Yes | Array of version objects to display |
| `currentVersionId` | `string` | Yes | ID of the currently active version |
| `onRestore` | `(version: Version) => Promise<void>` | Yes | Function called when a version is restored |
| `isLoading` | `boolean` | No | Whether the component is in a loading state |
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `maxHeight` | `string` | No | Maximum height of the scrollable area (default: "400px") |

## Version Object Structure

\`\`\`typescript
interface Version {
  id: string;                  // Unique identifier for the version
  timestamp: number | string | Date;  // When the version was created
  description?: string;        // Optional description of the changes
  metadata?: {                 // Optional metadata about the version
    wordCount?: number;        // Number of words in this version
    characterCount?: number;   // Number of characters in this version
    [key: string]: any;        // Any other metadata
  };
}
\`\`\`

## Accessibility

The Version History component is built with accessibility in mind:

- Proper labeling for interactive elements
- ARIA attributes for dynamic content
- Keyboard navigation support
- Loading states with appropriate indicators
- High contrast visual elements for current version

## Customization

The component uses Tailwind CSS for styling and can be customized by:

1. Passing additional classes via the `className` prop
2. Modifying the component's internal styles
3. Adjusting the maximum height via the `maxHeight` prop

## Best Practices

- Limit the number of versions displayed to improve performance
- Provide meaningful descriptions for each version
- Include relevant metadata to help users identify versions
- Handle loading and error states appropriately
\`\`\`

Let's add the necessary UI components:
