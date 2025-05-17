"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { supabaseConfig } from "@/lib/supabase"

export function SupabaseWarning() {
  // Check if we're using the hardcoded values
  const isUsingHardcodedValues =
    supabaseConfig.url === "https://bfqomtgojmesytihgvte.supabase.co" &&
    supabaseConfig.anonKey ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcW9tdGdvam1lc3l0aWhndnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTYyMjQsImV4cCI6MjA2MzA5MjIyNH0.WHDSP665fmYJEIG3kHJyBXmLCR0edshk0W7LgiowcPA"

  // Only show warning in development environment
  const isDevelopment = process.env.NODE_ENV === "development"

  if (!isDevelopment || !isUsingHardcodedValues) return null

  return (
    <Alert variant="warning" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Development Environment</AlertTitle>
      <AlertDescription>
        You are using hardcoded Supabase credentials. For production, set the NEXT_PUBLIC_SUPABASE_URL and
        NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.
      </AlertDescription>
    </Alert>
  )
}
