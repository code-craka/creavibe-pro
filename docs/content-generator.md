# Content Generator Component

The Content Generator is a multi-tab interface that allows users to generate different types of content using AI:

1. Blog posts
2. Images
3. Video scripts

## Usage

\`\`\`tsx
import { ContentGenerator } from "@/components/content-generator/content-generator"

export default function ContentGeneratorPage() {
  return <ContentGenerator />
}
\`\`\`

## Components

### ContentGenerator

The main component that provides the tabbed interface and contains all the generator components.

### BlogGenerator

Allows users to generate blog posts by providing:
- Blog title
- Blog topic
- Tone selection

### ImageGenerator

Enables users to create images by specifying:
- Image description
- Style preferences

### VideoScriptGenerator

Helps users generate video scripts by entering:
- Video topic
- Video length selection

## Props

The components don't accept any props as they are self-contained. In a real implementation, you would likely want to pass in:

- API endpoints for generation
- User preferences
- Callback functions for saving generated content

## Implementation Notes

In a production environment, you would replace the mock generation functions with actual API calls to AI services like:

- OpenAI's GPT models for text generation
- DALL-E or Stable Diffusion for image generation

## Accessibility

The component implements accessibility best practices:
- Proper labeling of form controls
- Keyboard navigation support
- Loading states with appropriate aria attributes
- High contrast visual indicators

## Responsive Design

The interface is fully responsive:
- On mobile devices, the tab labels show only icons
- Form controls stack vertically on smaller screens
- Generated content areas adjust to available space
\`\`\`

Let's make sure we have all the necessary UI components:
