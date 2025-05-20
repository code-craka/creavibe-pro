"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push(`/login?redirectedFrom=${window.location.pathname}`)
        return
      }

      // If a specific role is required and user doesn't have it, redirect to dashboard
      if (requiredRole && user.role !== requiredRole) {
        router.push("/dashboard")
        return
      }
    }
  }, [user, isLoading, router, requiredRole])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is not authenticated or doesn't have the required role, don't render children
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  // User is authenticated and has the required role, render children
  return <>{children}</>
}
