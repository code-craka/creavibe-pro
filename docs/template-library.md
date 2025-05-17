# Template Library Component Documentation

The Template Library is a comprehensive component for the Creavibe.pro SaaS application that allows users to browse, search, and use content templates. It provides a visually appealing grid layout with filtering and search capabilities.

## Features

- **Responsive Grid Layout**: Adapts to different screen sizes (3 columns on desktop, 2 on tablet, 1 on mobile)
- **Category Filtering**: Filter templates by category using tabs
- **Search Functionality**: Search templates by title, description, or category
- **Visual Template Cards**: Each card displays a preview image, title, category badge, and description
- **Empty States**: Custom empty states for no templates and no search results
- **Loading States**: Skeleton loaders for a smooth user experience

## Components

### Main Components

1. **TemplateLibraryHeader**: Displays the page title and "Create Template" button
2. **TemplateFilters**: Contains category tabs and search input
3. **TemplateGrid**: Displays templates in a responsive grid layout
4. **EmptyTemplates**: Shows appropriate empty states based on context

### Usage

\`\`\`tsx
import { TemplateLibraryHeader } from "@/components/templates/template-library-header"
import { TemplateFilters } from "@/components/templates/template-filters"
import { TemplateGrid } from "@/components/templates/template-grid"
import { EmptyTemplates } from "@/components/templates/empty-templates"
import { templateCategories } from "@/lib/mock-data"

// Basic usage
function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch templates and handle filtering logic...

  return (
    <main>
      <TemplateLibraryHeader />
      
      <TemplateFilters
        categories={templateCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      
      {loading ? (
        <TemplateGrid loading={true} templates={[]} onUseTemplate={handleUseTemplate} />
      ) : templates.length > 0 ? (
        <TemplateGrid loading={false} templates={templates} onUseTemplate={handleUseTemplate} />
      ) : (
        <EmptyTemplates
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onClearFilters={() => {
            setSelectedCategory("all")
            setSearchQuery("")
          }}
        />
      )}
    </main>
  )
}
\`\`\`

## Template Data Structure

The template library uses the following data structure:

\`\`\`typescript
interface TemplateCategory {
  id: string
  name: string
  description?: string
}

interface Template {
  id: string
  title: string
  description: string
  content: string
  category: TemplateCategory
  imageUrl: string
  createdAt: string
  updatedAt: string
}
\`\`\`

## Styling

The component uses Tailwind CSS for styling with the following key features:

- **Responsive Grid**: Uses CSS Grid with responsive column counts
- **Card Design**: Clean cards with subtle hover effects and shadows
- **Category Badges**: Color-coded badges for different template categories
- **Visual Hierarchy**: Proper spacing and typography for readability

## Accessibility

The template library follows accessibility best practices:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Sufficient contrast for text and UI elements
- **Focus States**: Visible focus indicators for keyboard users

## Customization

You can customize the template library by:

1. **Adding Categories**: Extend the `templateCategories` array in `mock-data.ts`
2. **Changing Colors**: Modify the `getCategoryColor` function in `utils.ts`
3. **Adjusting Layout**: Update the grid column configuration in `TemplateGrid`
4. **Custom Empty States**: Modify the `EmptyTemplates` component for different messaging

## Browser Compatibility

The template library is compatible with all modern browsers and is responsive across desktop, tablet, and mobile devices.
\`\`\`

Let's create a Badge component that we'll need:
