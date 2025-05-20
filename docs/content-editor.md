# Content Editor Component Documentation

The Content Editor is a full-featured markdown editor component for the CreaVibe SaaS application. It provides a tabbed interface with editor, preview, and history functionality, along with AI content regeneration capabilities.

## Features

- **Tabbed Interface**: Switch between Editor, Preview, and History views
- **Markdown Editor**: Rich text editing with toolbar for common markdown syntax
- **Live Preview**: Real-time rendering of markdown content
- **Version History**: Track and restore previous versions of content
- **Autosave**: Automatically saves content after 5 seconds of inactivity
- **AI Regeneration**: Button to trigger AI-powered content enhancement
- **Word/Character Count**: Display of word and character counts
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Keyboard navigation and proper ARIA attributes
- **Unsaved Changes Warning**: Prevents accidental navigation away from unsaved content

## Installation

Ensure you have the required dependencies installed:

\`\`\`bash
npm install react-markdown remark-gfm rehype-raw rehype-sanitize @tailwindcss/typography
\`\`\`

Add the typography plugin to your `tailwind.config.js`:

\`\`\`js
module.exports = {
  // ...
  plugins: [
    // ...
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

## Usage

\`\`\`tsx
import { ContentEditor } from "@/components/content/content-editor"

// Basic usage
function MyEditor() {
  return (
    <ContentEditor
      projectId="project-123"
      initialContent="# Hello World"
    />
  )
}

// With save and AI regeneration handlers
function MyEditorWithHandlers() {
  const handleSave = async (content: string) => {
    // Save content to your backend
    await saveToDatabase(content)
  }

  const handleAIRegenerate = async (content: string) => {
    // Call your AI service
    const enhancedContent = await callAIService(content)
    return enhancedContent
  }

  return (
    <ContentEditor
      projectId="project-123"
      initialContent="# Hello World"
      onSave={handleSave}
      onAIRegenerate={handleAIRegenerate}
    />
  )
}
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| `projectId` | `string` | Unique identifier for the project (used for local storage) |
| `initialContent` | `string` | Initial markdown content to display |
| `onSave` | `(content: string) => Promise<void>` | Function called when content is saved |
| `onAIRegenerate` | `(content: string) => Promise<string>` | Function called when AI regeneration is triggered |
| `className` | `string` | Additional CSS classes to apply to the component |

## Component Structure

The Content Editor is composed of several sub-components:

- `ContentEditor`: Main component that manages state and coordinates sub-components
- `MarkdownEditor`: Editor interface with toolbar and textarea
- `MarkdownPreview`: Renders markdown content as HTML
- `HistoryPanel`: Displays version history with restore functionality
- `ContentSaveStatus`: Shows current save status (saved, saving, unsaved)

## Local Storage

The component uses local storage to maintain version history. Each project has its own history stored under the key `creavibe-content-history-{projectId}`.

## Accessibility

The component supports keyboard navigation and includes proper ARIA attributes for screen readers. The editor can be fully operated using keyboard shortcuts.

## Customization

You can customize the appearance of the markdown preview by modifying the CSS in `globals.css`. The component uses Tailwind's typography plugin for styling the rendered markdown.

## Error Handling

The component includes error handling for save operations and AI regeneration. Errors are displayed using toast notifications.

## Browser Compatibility

The component is compatible with all modern browsers. It uses standard browser APIs for local storage and text editing.
