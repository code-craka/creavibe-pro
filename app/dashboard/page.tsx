"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { Sparkles, Clock, FileText } from "lucide-react"
import { DashboardMetricCard } from "@/components/dashboard/metric-card"
import { DashboardHeader } from "@/components/dashboard/header"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentProjects } from "@/components/dashboard/recent-projects"

interface UserProfile {
  username: string | null
  full_name: string | null
  avatar_url: string | null
  last_login: string | null
}

interface Metrics {
  totalProjects: number
  aiGenerations: number
  lastLogin: string | null
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [metrics, setMetrics] = useState<Metrics>({
    totalProjects: 0,
    aiGenerations: 0,
    lastLogin: null,
  })
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
    async function fetchUserData() {
      if (!user) return

      try {
        setLoading(true)

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        // Fetch projects count
        const { count: projectsCount, error: projectsError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)

        if (projectsError) throw projectsError

        // For demo purposes, we'll simulate AI generations count
        // In a real app, you would fetch this from your database
        const aiGenerations = Math.floor(Math.random() * 50) + 5

        setProfile({
          username: profileData?.username,
          full_name: profileData?.full_name,
          avatar_url: profileData?.avatar_url,
          last_login: user.last_sign_in_at,
        })

        setMetrics({
          totalProjects: projectsCount || 0,
          aiGenerations,
          lastLogin: user.last_sign_in_at,
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const displayName = profile?.full_name || profile?.username || user?.email?.split("@")[0] || "User"

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <DashboardHeader
        displayName={displayName}
        avatarUrl={profile?.avatar_url}
        currentTime={currentTime}
        onSignOut={signOut}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {displayName}!</h1>
            <p className="text-muted-foreground">Here's an overview of your creative workspace and recent activity.</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardMetricCard
              title="Total Projects"
              value={metrics.totalProjects.toString()}
              description="Active projects in your workspace"
              icon={<FileText className="h-5 w-5 text-primary" />}
              loading={loading}
            />
            <DashboardMetricCard
              title="AI Generations"
              value={metrics.aiGenerations.toString()}
              description="Content pieces created with AI"
              icon={<Sparkles className="h-5 w-5 text-primary" />}
              loading={loading}
            />
            <DashboardMetricCard
              title="Last Login"
              value={metrics.lastLogin ? formatDistanceToNow(new Date(metrics.lastLogin), { addSuffix: true }) : "N/A"}
              description="Your previous session"
              icon={<Clock className="h-5 w-5 text-primary" />}
              loading={loading}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Projects */}
          <RecentProjects userId={user?.id} />
        </div>
      </main>
    </div>
  )
}
