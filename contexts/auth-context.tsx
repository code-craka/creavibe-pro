"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { User as SupabaseUser, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth-service"
import { supabase } from "@/lib/supabase"
import type { Provider } from "@supabase/supabase-js"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  email: string | undefined
  full_name: string | null
  avatar_url: string | null
  role: "user" | "admin"
  app_metadata?: {
    role?: string
    is_new_user?: boolean
    [key: string]: any
  }
}

interface AuthContextType {
  user: UserProfile | null
  session: Session | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  setProfile: (profile: UserProfile | null) => void
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ error: { message: string } | null }>
  signIn: (email: string, password: string) => Promise<{ error: { message: string } | null }>
  signInWithMagicLink: (email: string, redirectTo?: string) => Promise<{ error: { message: string } | null }>
  signInWithOAuth: (provider: Provider) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: { message: string } | null }>
  updatePassword: (password: string) => Promise<{ error: { message: string } | null }>
  updateProfile: (updates: Record<string, any>) => Promise<{ error: { message: string } | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const initialSession = await authService.getSession()
        setSession(initialSession)

        if (initialSession?.user) {
          const userProfile = mapUserToProfile(initialSession.user)
          setUser(userProfile)
          
          // Check URL for auth_success parameter and show welcome message
          const urlParams = new URLSearchParams(window.location.search)
          if (urlParams.get('auth_success') === 'true') {
            // Remove the parameter from URL without page reload
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.delete('auth_success')
            window.history.replaceState({}, document.title, newUrl.toString())
            
            // Show welcome toast
            toast({
              title: 'Welcome back!',
              description: `You're now signed in as ${userProfile.email || 'a verified user'}`,
              variant: 'success',
              duration: 5000,
            })
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Set up auth state change listener
    const { data: { subscription } } = authService.onAuthStateChange(
      (event: string, session: Session | null) => {
        setSession(session)
        setUser(session?.user ? mapUserToProfile(session.user) : null)
      }
    )

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Map Supabase user to our UserProfile format
  const mapUserToProfile = (supabaseUser: SupabaseUser): UserProfile => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      full_name: supabaseUser.user_metadata?.full_name || null,
      avatar_url: supabaseUser.user_metadata?.avatar_url || null,
      role: supabaseUser.app_metadata?.role || "user",
      app_metadata: supabaseUser.app_metadata || {}
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    setIsLoading(true)
    try {
      const { error } = await authService.signUp(email, password, metadata)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { error } = await authService.signIn(email, password)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with magic link
  const signInWithMagicLink = async (email: string, redirectTo?: string) => {
    setIsLoading(true)
    try {
      const { error } = await authService.signInWithMagicLink(email, redirectTo)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with OAuth provider
  const signInWithOAuth = async (provider: Provider) => {
    setIsLoading(true)
    try {
      await authService.signInWithOAuth(provider)
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    setIsLoading(true)
    try {
      await authService.signOut()
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true)
    try {
      const { error } = await authService.resetPassword(email)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  // Update password
  const updatePassword = async (password: string) => {
    setIsLoading(true)
    try {
      const { error } = await authService.updatePassword(password)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  // Update profile
  const updateProfile = async (updates: Record<string, any>) => {
    setIsLoading(true)
    try {
      if (!user) {
        return { error: { message: "No user logged in" } }
      }
      
      const { error } = await authService.updateProfile(user.id, updates)
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        setUser,
        setProfile: setUser, // setProfile is an alias for setUser
        signUp,
        signIn,
        signInWithMagicLink,
        signInWithOAuth,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
