# CreaVibe Component Documentation

This document provides detailed information about the components used in CreaVibe, including their purpose, props, and usage examples.

## Table of Contents

- [Design System](#design-system)
- [Layout Components](#layout-components)
- [Authentication Components](#authentication-components)
- [Dashboard Components](#dashboard-components)
- [Content Generation Components](#content-generation-components)
- [Project Management Components](#project-management-components)
- [WebBook Components](#webbook-components)
- [Feedback Components](#feedback-components)
- [Settings Components](#settings-components)
- [Utility Components](#utility-components)

## Design System

CreaVibe uses a combination of Tailwind CSS and shadcn/ui components to create a consistent and accessible user interface.

### Button

The Button component is used for actions and navigation.

**Props:**

\`\`\`typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { Button } from "@/components/ui/button";

// Default button
<Button>Click me</Button>

// Destructive button
<Button variant="destructive">Delete</Button>

// Outline button
<Button variant="outline">Cancel</Button>

// Small button
<Button size="sm">Small Button</Button>

// Icon button
<Button size="icon">
  <PlusIcon className="h-4 w-4" />
</Button>
\`\`\`

### Card

The Card component is used to group related content.

**Props:**

\`\`\`typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
\`\`\`

**Usage:**

\`\`\`tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
\`\`\`

### Input

The Input component is used for text input.

**Props:**

\`\`\`typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
\`\`\`

**Usage:**

\`\`\`tsx
import { Input } from "@/components/ui/input";

<Input type="email" placeholder="Email" />
\`\`\`

### Tabs

The Tabs component is used to organize content into different sections.

**Props:**

\`\`\`typescript
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>
\`\`\`

## Layout Components

### Navbar

The Navbar component is the main navigation bar at the top of the application.

**Props:**

\`\`\`typescript
interface NavbarProps {
  user?: User;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { Navbar } from "@/components/navbar";

<Navbar user={user} />
\`\`\`

### DashboardNav

The DashboardNav component is the sidebar navigation for the dashboard.

**Props:**

\`\`\`typescript
interface DashboardNavProps {
  user?: User;
  items: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}
\`\`\`

**Usage:**

\`\`\`tsx
import { DashboardNav } from "@/components/dashboard-nav";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderIcon,
  },
];

<DashboardNav user={user} items={navItems} />
\`\`\`

### Footer

The Footer component is the footer at the bottom of the application.

**Props:**

\`\`\`typescript
interface FooterProps {
  className?: string;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { Footer } from "@/components/footer";

<Footer />
\`\`\`

## Authentication Components

### LoginForm

The LoginForm component is used for user login.

**Props:**

\`\`\`typescript
interface LoginFormProps {
  onSuccess?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { LoginForm } from "@/app/login/login-form";

<LoginForm onSuccess={() => router.push("/dashboard")} />
\`\`\`

### SignupForm

The SignupForm component is used for user registration.

**Props:**

\`\`\`typescript
interface SignupFormProps {
  onSuccess?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { SignupForm } from "@/app/signup/signup-form";

<SignupForm onSuccess={() => router.push("/dashboard")} />
\`\`\`

### ForgotPasswordForm

The ForgotPasswordForm component is used for password recovery.

**Props:**

\`\`\`typescript
interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ForgotPasswordForm } from "@/app/forgot-password/forgot-password-form";

<ForgotPasswordForm onSuccess={() => router.push("/login")} />
\`\`\`

### ResetPasswordForm

The ResetPasswordForm component is used to reset a user's password.

**Props:**

\`\`\`typescript
interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ResetPasswordForm } from "@/app/auth/reset-password/reset-password-form";

<ResetPasswordForm token={token} onSuccess={() => router.push("/login")} />
\`\`\`

## Dashboard Components

### DashboardHeader

The DashboardHeader component is the header for the dashboard.

**Props:**

\`\`\`typescript
interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { DashboardHeader } from "@/components/dashboard/header";

<DashboardHeader
  title="Dashboard"
  description="Welcome to your dashboard"
  actions={
    <Button>
      <PlusIcon className="mr-2 h-4 w-4" />
      New Project
    </Button>
  }
/>
\`\`\`

### MetricCard

The MetricCard component displays a metric with a title and icon.

**Props:**

\`\`\`typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
\`\`\`

**Usage:**

\`\`\`tsx
import { MetricCard } from "@/components/dashboard/metric-card";
import { FileTextIcon } from 'lucide-react';

<MetricCard
  title="Total Projects"
  value={42}
  icon={FileTextIcon}
  description="Active projects"
  trend={{
    value: 12,
    isPositive: true,
  }}
/>
\`\`\`

### QuickActions

The QuickActions component displays a list of quick actions.

**Props:**

\`\`\`typescript
interface QuickActionsProps {
  actions: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
  }[];
}
\`\`\`

**Usage:**

\`\`\`tsx
import { QuickActions } from "@/components/dashboard/quick-actions";
import { FileTextIcon, ImageIcon, VideoIcon } from 'lucide-react';

const actions = [
  {
    title: "Create Blog Post",
    description: "Generate a new blog post",
    icon: FileTextIcon,
    href: "/ai-generator?type=blog",
  },
  {
    title: "Create Image",
    description: "Generate a new image",
    icon: ImageIcon,
    href: "/ai-generator?type=image",
  },
  {
    title: "Create Video Script",
    description: "Generate a new video script",
    icon: VideoIcon,
    href: "/ai-generator?type=video",
  },
];

<QuickActions actions={actions} />
\`\`\`

### RecentProjects

The RecentProjects component displays a list of recent projects.

**Props:**

\`\`\`typescript
interface RecentProjectsProps {
  projects: Project[];
  isLoading?: boolean;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { RecentProjects } from "@/components/dashboard/recent-projects";

<RecentProjects projects={projects} isLoading={isLoading} />
\`\`\`

## Content Generation Components

### AIGenerator

The AIGenerator component is the main content generation interface.

**Props:**

\`\`\`typescript
interface AIGeneratorProps {
  defaultType?: "blog" | "image" | "video";
}
\`\`\`

**Usage:**

\`\`\`tsx
import { AIGenerator } from "@/components/ai-generator/ai-generator";

<AIGenerator defaultType="blog" />
\`\`\`

### BlogGenerator

The BlogGenerator component is used to generate blog posts.

**Props:**

\`\`\`typescript
interface BlogGeneratorProps {
  onGenerate?: (result: GenerationResult) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { BlogGenerator } from "@/components/ai-generator/blog-generator";

<BlogGenerator
  onGenerate={(result) => {
    console.log(result);
  }}
/>
\`\`\`

### ImageGenerator

The ImageGenerator component is used to generate images.

**Props:**

\`\`\`typescript
interface ImageGeneratorProps {
  onGenerate?: (result: GenerationResult) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ImageGenerator } from "@/components/ai-generator/image-generator";

<ImageGenerator
  onGenerate={(result) => {
    console.log(result);
  }}
/>
\`\`\`

### VideoScriptGenerator

The VideoScriptGenerator component is used to generate video scripts.

**Props:**

\`\`\`typescript
interface VideoScriptGeneratorProps {
  onGenerate?: (result: GenerationResult) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { VideoScriptGenerator } from "@/components/ai-generator/video-script-generator";

<VideoScriptGenerator
  onGenerate={(result) => {
    console.log(result);
  }}
/>
\`\`\`

### GenerationHistory

The GenerationHistory component displays a list of previous generations.

**Props:**

\`\`\`typescript
interface GenerationHistoryProps {
  generations: Generation[];
  isLoading?: boolean;
  onSelect?: (generation: Generation) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { GenerationHistory } from "@/components/ai-generator/generation-history";

<GenerationHistory
  generations={generations}
  isLoading={isLoading}
  onSelect={(generation) => {
    console.log(generation);
  }}
/>
\`\`\`

## Project Management Components

### ProjectsHeader

The ProjectsHeader component is the header for the projects page.

**Props:**

\`\`\`typescript
interface ProjectsHeaderProps {
  totalProjects: number;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ProjectsHeader } from "@/components/projects/projects-header";

<ProjectsHeader totalProjects={42} />
\`\`\`

### ProjectsList

The ProjectsList component displays a list of projects.

**Props:**

\`\`\`typescript
interface ProjectsListProps {
  projects: Project[];
  isLoading?: boolean;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ProjectsList } from "@/components/projects/projects-list";

<ProjectsList projects={projects} isLoading={isLoading} />
\`\`\`

### EmptyProjects

The EmptyProjects component is displayed when there are no projects.

**Props:**

\`\`\`typescript
interface EmptyProjectsProps {
  onCreate?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { EmptyProjects } from "@/components/projects/empty-projects";

<EmptyProjects
  onCreate={() => {
    router.push("/projects/new");
  }}
/>
\`\`\`

## WebBook Components

### WebBookConfiguration

The WebBookConfiguration component is used to configure a WebBook.

**Props:**

\`\`\`typescript
interface WebBookConfigurationProps {
  webBook?: WebBook;
  onSave?: (webBook: WebBook) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { WebBookConfiguration } from "@/components/web-book/web-book-configuration";

<WebBookConfiguration
  webBook={webBook}
  onSave={(webBook) => {
    console.log(webBook);
  }}
/>
\`\`\`

### WebBookRenderer

The WebBookRenderer component renders a WebBook.

**Props:**

\`\`\`typescript
interface WebBookRendererProps {
  webBook: WebBook;
  chapters: Chapter[];
}
\`\`\`

**Usage:**

\`\`\`tsx
import { WebBookRenderer } from "@/components/web-book/web-book-renderer";

<WebBookRenderer webBook={webBook} chapters={chapters} />
\`\`\`

### TableOfContents

The TableOfContents component displays the table of contents for a WebBook.

**Props:**

\`\`\`typescript
interface TableOfContentsProps {
  chapters: Chapter[];
  activeChapterId?: string;
  onChapterSelect?: (chapterId: string) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { TableOfContents } from "@/components/web-book/table-of-contents";

<TableOfContents
  chapters={chapters}
  activeChapterId={activeChapterId}
  onChapterSelect={(chapterId) => {
    setActiveChapterId(chapterId);
  }}
/>
\`\`\`

### ContentRenderer

The ContentRenderer component renders the content of a chapter.

**Props:**

\`\`\`typescript
interface ContentRendererProps {
  content: string;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ContentRenderer } from "@/components/web-book/content-renderer";

<ContentRenderer content={chapter.content} />
\`\`\`

## Feedback Components

### FeedbackSystem

The FeedbackSystem component is used to collect user feedback.

**Props:**

\`\`\`typescript
interface FeedbackSystemProps {
  context?: Record<string, any>;
  onSubmit?: (feedback: Feedback) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { FeedbackSystem } from "@/components/feedback/feedback-system";

<FeedbackSystem
  context={{ page: "dashboard" }}
  onSubmit={(feedback) => {
    console.log(feedback);
  }}
/>
\`\`\`

## Settings Components

### ProfileSettings

The ProfileSettings component is used to update the user's profile.

**Props:**

\`\`\`typescript
interface ProfileSettingsProps {
  user: User;
  onUpdate?: (user: User) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ProfileSettings } from "@/components/settings/profile-settings";

<ProfileSettings
  user={user}
  onUpdate={(user) => {
    console.log(user);
  }}
/>
\`\`\`

### NotificationSettings

The NotificationSettings component is used to update the user's notification preferences.

**Props:**

\`\`\`typescript
interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdate?: (preferences: NotificationPreferences) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { NotificationSettings } from "@/components/settings/notification-settings";

<NotificationSettings
  preferences={preferences}
  onUpdate={(preferences) => {
    console.log(preferences);
  }}
/>
\`\`\`

### APITokenSettings

The APITokenSettings component is used to manage API tokens.

**Props:**

\`\`\`typescript
interface APITokenSettingsProps {
  tokens: APIToken[];
  onCreateToken?: (name: string) => void;
  onDeleteToken?: (tokenId: string) => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { APITokenSettings } from "@/components/settings/api-token-settings";

<APITokenSettings
  tokens={tokens}
  onCreateToken={(name) => {
    console.log(name);
  }}
  onDeleteToken={(tokenId) => {
    console.log(tokenId);
  }}
/>
\`\`\`

### DeleteAccountDialog

The DeleteAccountDialog component is used to delete the user's account.

**Props:**

\`\`\`typescript
interface DeleteAccountDialogProps {
  onDelete?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog";

<DeleteAccountDialog
  onDelete={() => {
    console.log("Account deleted");
  }}
/>
\`\`\`

## Utility Components

### NotificationBell

The NotificationBell component displays a notification bell with a badge.

**Props:**

\`\`\`typescript
interface NotificationBellProps {
  count?: number;
  notifications?: Notification[];
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { NotificationBell } from "@/components/notification-bell";

<NotificationBell
  count={5}
  notifications={notifications}
  onMarkAsRead={(notificationId) => {
    console.log(notificationId);
  }}
  onMarkAllAsRead={() => {
    console.log("All notifications marked as read");
  }}
/>
\`\`\`

### UserNav

The UserNav component displays the user's avatar and a dropdown menu.

**Props:**

\`\`\`typescript
interface UserNavProps {
  user: User;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { UserNav } from "@/components/user-nav";

<UserNav user={user} />
\`\`\`

### ErrorAlert

The ErrorAlert component displays an error message.

**Props:**

\`\`\`typescript
interface ErrorAlertProps {
  title?: string;
  description: string;
  onDismiss?: () => void;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { ErrorAlert } from "@/components/ui/error-alert";

<ErrorAlert
  title="Error"
  description="An error occurred while processing your request."
  onDismiss={() => {
    console.log("Error dismissed");
  }}
/>
\`\`\`

### SupabaseWarning

The SupabaseWarning component displays a warning when Supabase is not configured.

**Props:**

\`\`\`typescript
interface SupabaseWarningProps {
  message?: string;
}
\`\`\`

**Usage:**

\`\`\`tsx
import { SupabaseWarning } from "@/components/supabase-warning";

<SupabaseWarning message="Supabase is not configured properly." />
