"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UserAvatar } from "@/components/auth/user-avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function AuthNav() {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  
  // Don't show login/signup buttons on auth pages
  const isAuthPage = 
    pathname === "/login" || 
    pathname === "/signup" || 
    pathname.startsWith("/auth/")
  
  if (isAuthPage) {
    return null
  }
  
  // Show loading state
  if (isLoading) {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }
  
  // Show login/signup buttons if not authenticated
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">Sign up</Button>
        </Link>
      </div>
    )
  }
  
  // Show user avatar if authenticated
  return <UserAvatar />
}
