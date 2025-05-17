"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ContentEditor } from "@/components/content/content-editor"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function ProjectEditorPage() {
  const { id } = useParams()
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const [projectTitle, setProjectTitle] = useState("Loading project...")
  const [initialContent, setInitialContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Fetch project data
  useEffect(() => {
    async function fetchProject() {
      if (!user || !id) return

      try {
        setLoading(true)

        // Fetch project details
        const { data: project, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single()

        if (projectError) throw projectError

        if (project) {
          setProjectTitle(project.title)

          // For demo purposes, we'll use a placeholder content
          // In a real app, you would fetch the actual content from a separate table
          setInitialContent(
            project.description ||
              "# " +
                project.title +
                "\n\nStart writing your content here. This editor supports Markdown syntax.\n\n" +
                "## Features\n\n" +
                "- **Bold text** and *italic text*\n" +
                "- Lists and numbered lists\n" +
                "- [Links](https://example.com)\n" +
                "- Images\n" +
                "- And more!\n\n" +
                "Try the AI regeneration feature to enhance your content.",
          )
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error loading project",
          description: "Could not load the project. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, user, toast])

  // Save content to the project
  const handleSave = async (content: string) => {
    if (!user || !id) return

    // In a real app, you would save to a content table
    // For demo purposes, we'll update the project description
    const { error } = await supabase
      .from("projects")
      .update({
        description: content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) {
      throw error
    }
  }

  // AI regeneration function
  const handleAIRegenerate = async (content: string) => {
    // Simulate AI regeneration with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would call an AI service
    // For demo purposes, we'll just enhance the content slightly
    const enhancedContent =
      content +
      "\n\n## AI Enhanced Section\n\nThis content was enhanced by AI. You can customize this section further or remove it if you prefer."

    return enhancedContent
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <DashboardHeader
        displayName={user?.email?.split("@")[0] || "User"}
        avatarUrl={null}
        currentTime={currentTime}
        onSignOut={signOut}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/projects/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{projectTitle}</h1>
          <p className="text-muted-foreground mt-1">Edit your project content</p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-[600px] bg-muted rounded"></div>
          </div>
        ) : (
          <ContentEditor
            projectId={id as string}
            initialContent={initialContent}
            onSave={handleSave}
            onAIRegenerate={handleAIRegenerate}
            className="mb-8"
          />
        )}
      </main>
    </div>
  )
}
