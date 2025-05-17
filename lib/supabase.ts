import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Hardcoded values for development (these would normally come from environment variables)
// In production, these should be set as environment variables
const SUPABASE_URL = "https://bfqomtgojmesytihgvte.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcW9tdGdvam1lc3l0aWhndnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTYyMjQsImV4cCI6MjA2MzA5MjIyNH0.WHDSP665fmYJEIG3kHJyBXmLCR0edshk0W7LgiowcPA"

// Use environment variables if available, otherwise use hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Export the URL and key for use in other parts of the application
export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
}
