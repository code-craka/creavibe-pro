/**
 * Environment variables configuration for Creavibe.pro
 *
 * This file documents the environment variables used in the application
 * and provides fallbacks for development environments.
 */

// Supabase Configuration
// These values are hardcoded for development but should be set as environment variables in production
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bfqomtgojmesytihgvte.supabase.co"
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcW9tdGdvam1lc3l0aWhndnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTYyMjQsImV4cCI6MjA2MzA5MjIyNH0.WHDSP665fmYJEIG3kHJyBXmLCR0edshk0W7LgiowcPA"

// Environment detection
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
export const IS_PRODUCTION = process.env.NODE_ENV === "production"
export const IS_TEST = process.env.NODE_ENV === "test"

// Application URLs
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || (IS_DEVELOPMENT ? "http://localhost:3000" : "https://creavibe.pro")
