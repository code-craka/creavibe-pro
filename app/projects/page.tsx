"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { EmptyProjects } from "@/components/projects/empty-projects"
import { DashboardHeader } from "@/components/dashboard/header"

interface Project {
  id: string
  title: string
  description: string | null
  status: "draft" | "published"
  created_at: string
  updated_at: string
  user_id: string
}

export default function ProjectsPage() {
  const { user, signOut } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })

        if (error) throw error

        // For demo purposes, let's add a status field if it doesn't exist
        const projectsWithStatus = (data || []).map((project) => ({
          ...project,
          status: project.status || (Math.random() > 0.5 ? "published" : "draft"),
        }))

        setProjects(projectsWithStatus)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    // Set up real-time subscription
    const subscription = supabase
      .channel("projects_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          fetchProjects()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

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
        <ProjectsHeader />

        {loading ? (
          <ProjectsList loading={true} projects={[]} />
        ) : projects.length > 0 ? (
          <ProjectsList loading={false} projects={projects} />
        ) : (
          <EmptyProjects />
        )}
      </main>
    </div>
  )
}
