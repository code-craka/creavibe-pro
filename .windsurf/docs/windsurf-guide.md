# Windsurf Guide for CreaVibe

This guide provides comprehensive information on how to use Windsurf Cascade with CreaVibe, including installation, configuration, and usage examples.

## What is Windsurf?

Windsurf is a collection of UI components and utilities built on top of Tailwind CSS. It provides a set of pre-designed components that can be easily customized and integrated into your application. Windsurf Cascade is the specific variant used in CreaVibe, which focuses on a clean, modern design language.

## Installation

Windsurf is already integrated into CreaVibe, but if you're setting up a new project or need to reinstall, follow these steps:

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher
- Tailwind CSS 3.3.0 or higher

### Installation Steps

1. Install Windsurf Cascade using pnpm:

\`\`\`bash
pnpm add @windsurf/cascade
\`\`\`

2. Add Windsurf to your Tailwind CSS configuration:

\`\`\`typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"
import { windsurfPreset } from "@windsurf/cascade/preset"

const config = {
  presets: [windsurfPreset],
  // Your existing configuration...
} satisfies Config

export default config
\`\`\`

3. Import Windsurf styles in your global CSS file:

\`\`\`css
/*globals.css */
@import '@windsurf/cascade/styles.css';
/* Your existing styles...*/
\`\`\`

## Configuration

### Theme Customization

Windsurf Cascade can be customized to match your brand colors and design preferences. In CreaVibe, we've customized the theme as follows:

\`\`\`typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"
import { windsurfPreset } from "@windsurf/cascade/preset"

const config = {
  presets: [windsurfPreset],
  theme: {
    extend: {
      colors: {
        // Primary brand color
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Secondary brand color
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        // Neutral colors
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      // Custom border radius
      borderRadius: {
        'windsurf': '0.5rem',
      },
      // Custom box shadows
      boxShadow: {
        'windsurf': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
} satisfies Config

export default config
\`\`\`

### Component Customization

You can customize individual Windsurf components by creating a theme configuration file:

\`\`\`typescript
// lib/windsurf-theme.ts
import { createTheme } from '@windsurf/cascade/theme'

export const theme = createTheme({
  button: {
    variants: {
      primary: {
        base: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      },
      secondary: {
        base: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      },
      outline: {
        base: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
      },
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
    },
  },
  // Other component customizations...
})
\`\`\`

Then, use the theme provider in your application:

\`\`\`tsx
// components/theme-provider.tsx
'use client'

import { ThemeProvider } from '@windsurf/cascade/theme'
import { theme } from '@/lib/windsurf-theme'

export function WindsurfProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
\`\`\`

## Usage Examples

### Basic Components

Windsurf provides a set of basic components that can be used to build more complex UIs. Here are some examples of how to use them in CreaVibe:

#### Button

\`\`\`tsx
import { Button } from '@windsurf/cascade'

// Primary button
<Button variant="primary">Click me</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Outline button
<Button variant="outline">Reset</Button>

// Button with icon
<Button variant="primary" leftIcon={<PlusIcon />}>
  Add new
</Button>

// Loading button
<Button variant="primary" isLoading>
  Saving...
</Button>
\`\`\`

#### Input

\`\`\`tsx
import { Input } from '@windsurf/cascade'

// Basic input
<Input placeholder="Enter your name" />

// Input with label
<Input label="Email" placeholder="Enter your email" />

// Input with error
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Input with helper text
<Input
  label="Username"
  placeholder="Enter your username"
  helperText="This will be your public display name"
/>
\`\`\`

#### Select

\`\`\`tsx
import { Select } from '@windsurf/cascade'

// Basic select
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
  ]}
/>

// Select with placeholder
<Select
  label="Language"
  placeholder="Select a language"
  options={[
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
  ]}
/>

// Multi-select
<Select
  label="Skills"
  isMulti
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
/>
\`\`\`

### Layout Components

Windsurf provides layout components to help structure your application:

#### Card

\`\`\`tsx
import { Card, CardHeader, CardBody, CardFooter } from '@windsurf/cascade'

<Card>
  <CardHeader>
    <h3 className="text-lg font-medium">Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>This is the card content.</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>
\`\`\`

#### Grid

\`\`\`tsx
import { Grid, GridItem } from '@windsurf/cascade'

<Grid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <GridItem>
    <Card>Item 1</Card>
  </GridItem>
  <GridItem>
    <Card>Item 2</Card>
  </GridItem>
  <GridItem>
    <Card>Item 3</Card>
  </GridItem>
</Grid>
\`\`\`

#### Flex

\`\`\`tsx
import { Flex } from '@windsurf/cascade'

<Flex direction="row" align="center" justify="space-between">
  <div>Left content</div>
  <div>Right content</div>
</Flex>
\`\`\`

### Form Components

Windsurf provides form components that can be used to build forms:

#### Form

\`\`\`tsx
import { Form, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@windsurf/cascade'

<Form onSubmit={handleSubmit}>
  <FormControl isRequired isInvalid={!!errors.name}>
    <FormLabel>Name</FormLabel>
    <Input placeholder="Enter your name" {...register('name')} />
    {errors.name ? (
      <FormErrorMessage>{errors.name.message}</FormErrorMessage>
    ) : (
      <FormHelperText>Enter your full name</FormHelperText>
    )}
  </FormControl>
  
  <FormControl isRequired isInvalid={!!errors.email} mt={4}>
    <FormLabel>Email</FormLabel>
    <Input placeholder="Enter your email" {...register('email')} />
    {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
  </FormControl>
  
  <Button type="submit" variant="primary" mt={6}>
    Submit
  </Button>
</Form>
\`\`\`

### Data Display Components

Windsurf provides components for displaying data:

#### Table

\`\`\`tsx
import { Table, Thead, Tbody, Tr, Th, Td } from '@windsurf/cascade'

<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Email</Th>
      <Th>Role</Th>
      <Th>Actions</Th>
    </Tr>
  </Thead>
  <Tbody>
    {users.map((user) => (
      <Tr key={user.id}>
        <Td>{user.name}</Td>
        <Td>{user.email}</Td>
        <Td>{user.role}</Td>
        <Td>
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="outline" colorScheme="red" ml={2}>Delete</Button>
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>
\`\`\`

#### Tabs

\`\`\`tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@windsurf/cascade'

<Tabs>
  <TabList>
    <Tab>Profile</Tab>
    <Tab>Settings</Tab>
    <Tab>Notifications</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>Profile content</p>
    </TabPanel>
    <TabPanel>
      <p>Settings content</p>
    </TabPanel>
    <TabPanel>
      <p>Notifications content</p>
    </TabPanel>
  </TabPanels>
</Tabs>
\`\`\`

### Feedback Components

Windsurf provides components for user feedback:

#### Alert

\`\`\`tsx
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@windsurf/cascade'

<Alert status="success">
  <AlertIcon />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert status="error" mt={4}>
  <AlertIcon />
  <AlertTitle>Error!</AlertTitle>
  <AlertDescription>There was an error processing your request.</AlertDescription>
</Alert>

<Alert status="warning" mt={4}>
  <AlertIcon />
  <AlertTitle>Warning!</AlertTitle>
  <AlertDescription>This action cannot be undone.</AlertDescription>
</Alert>

<Alert status="info" mt={4}>
  <AlertIcon />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>
\`\`\`

#### Toast

\`\`\`tsx
import { useToast } from '@windsurf/cascade'

function ToastExample() {
  const toast = useToast()
  
  const showToast = () => {
    toast({
      title: 'Account created.',
      description: 'We\'ve created your account for you.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }
  
  return (
    <Button onClick={showToast}>Show Toast</Button>
  )
}
\`\`\`

## Advanced Usage

### Responsive Design

Windsurf components are designed to be responsive out of the box. You can use the responsive props to customize the behavior at different breakpoints:

\`\`\`tsx
<Flex
  direction={{ base: 'column', md: 'row' }}
  align={{ base: 'stretch', md: 'center' }}
  justify={{ base: 'flex-start', md: 'space-between' }}
>
  <Box width={{ base: '100%', md: '50%' }}>
    Left content
  </Box>
  <Box width={{ base: '100%', md: '50%' }}>
    Right content
  </Box>
</Flex>
\`\`\`

### Theme Tokens

Windsurf provides a set of theme tokens that can be used to maintain consistency across your application:

\`\`\`tsx
import { useTheme } from '@windsurf/cascade'

function ThemeExample() {
  const theme = useTheme()
  
  return (
    <div style={{ color: theme.colors.primary[600] }}>
      This text uses the primary color from the theme.
    </div>
  )
}
\`\`\`

### Custom Components

You can create custom components that use Windsurf's styling system:

\`\`\`tsx
import { Box, useWindsurfStyles } from '@windsurf/cascade'

interface CardStatsProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

function CardStats({ title, value, icon }: CardStatsProps) {
  const styles = useWindsurfStyles({
    base: 'p-6 bg-white rounded-windsurf shadow-windsurf',
    title: 'text-sm font-medium text-gray-500',
    value: 'mt-2 text-3xl font-semibold text-gray-900',
    icon: 'absolute top-6 right-6 text-primary-400',
  })
  
  return (
    <Box position="relative" {...styles.base}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.icon}>{icon}</div>
    </Box>
  )
}
\`\`\`

## Troubleshooting

### Common Issues

#### Components Not Rendering Correctly

If components are not rendering correctly, check that you've imported the Windsurf styles and configured the theme properly:

\`\`\`tsx
// app/layout.tsx
import '@windsurf/cascade/styles.css'
import { WindsurfProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WindsurfProvider>{children}</WindsurfProvider>
      </body>
    </html>
  )
}
\`\`\`

#### TypeScript Errors

If you're experiencing TypeScript errors, make sure you've installed the correct types:

\`\`\`bash
pnpm add -D @types/windsurf__cascade
\`\`\`

#### Style Conflicts

If you're experiencing style conflicts with other libraries, you may need to adjust the order of your CSS imports or use more specific selectors:

\`\`\`css
/*globals.css */
@import 'other-library/styles.css';
@import '@windsurf/cascade/styles.css';
/* Your custom styles...*/
\`\`\`

### Getting Help

If you're still experiencing issues, you can:

1. Check the [Windsurf documentation](https://windsurf.dev/docs)
2. Join the [Windsurf Discord community](https://discord.gg/windsurf)
3. Open an issue on the [Windsurf GitHub repository](https://github.com/windsurf/cascade)
4. Contact the CreaVibe development team at [dev@CreaVibe](mailto:dev@CreaVibe)

## Best Practices

### Component Composition

Windsurf encourages component composition over configuration. Instead of creating complex components with many props, create smaller, focused components that can be composed together:

\`\`\`tsx
// Instead of this:
<ComplexCard
  title="Card Title"
  description="Card description"
  image="/image.jpg"
  actions={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete },
  ]}
/>

// Do this:
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardImage src="/image.jpg" alt="Card image" />
  <CardFooter>
    <Button onClick={handleEdit}>Edit</Button>
    <Button onClick={handleDelete}>Delete</Button>
  </CardFooter>
</Card>
\`\`\`

### Performance Optimization

To optimize performance, use the following techniques:

1. **Memoization**: Use `React.memo` to prevent unnecessary re-renders of components.
2. **Lazy Loading**: Use dynamic imports to lazy load components that are not needed immediately.
3. **Virtual Lists**: Use virtualized lists for rendering large datasets.

\`\`\`tsx
// Memoization
const MemoizedComponent = React.memo(MyComponent)

// Lazy Loading
const LazyComponent = React.lazy(() => import('./MyComponent'))

// Virtual Lists
import { VirtualList } from '@windsurf/cascade'

<VirtualList
  height={500}
  itemCount={1000}
  itemSize={50}
  renderItem={({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
/>
\`\`\`

### Accessibility

Windsurf components are designed with accessibility in mind, but you should still follow these best practices:

1. **Semantic HTML**: Use semantic HTML elements whenever possible.
2. **ARIA Attributes**: Use ARIA attributes to enhance accessibility.
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible.
4. **Color Contrast**: Ensure sufficient color contrast for text and UI elements.

\`\`\`tsx
// Good accessibility practices
<Button
  aria-label="Add new item"
  onClick={handleAdd}
>
  <PlusIcon aria-hidden="true" />
  Add Item
</Button>
\`\`\`

## Conclusion

This guide provides a comprehensive overview of how to use Windsurf Cascade with CreaVibe. By following these guidelines and best practices, you can create a consistent, accessible, and performant user interface for your application.

For more information, refer to the [Windsurf documentation](https://windsurf.dev/docs) or contact the CreaVibe development team at [dev@CreaVibe](mailto:dev@CreaVibe).
