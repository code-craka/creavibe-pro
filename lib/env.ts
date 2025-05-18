/**
 * Server-side environment variables
 * IMPORTANT: This file should only be imported in server components or API routes
 */

// Safely get environment variables with fallbacks
export const getEnv = (key: string, defaultValue = ""): string => {
  return process.env[key] || defaultValue
}

// Server environment
export const NODE_ENV = getEnv("NODE_ENV", "development")
export const IS_PRODUCTION = NODE_ENV === "production"
export const IS_DEVELOPMENT = NODE_ENV === "development"
export const IS_TEST = NODE_ENV === "test"

// Database
export const POSTGRES_URL = getEnv("POSTGRES_URL")
export const POSTGRES_PRISMA_URL = getEnv("POSTGRES_PRISMA_URL")
export const POSTGRES_URL_NON_POOLING = getEnv("POSTGRES_URL_NON_POOLING")
export const POSTGRES_USER = getEnv("POSTGRES_USER")
export const POSTGRES_HOST = getEnv("POSTGRES_HOST")
export const POSTGRES_PASSWORD = getEnv("POSTGRES_PASSWORD")
export const POSTGRES_DATABASE = getEnv("POSTGRES_DATABASE")

// Supabase
export const SUPABASE_URL = getEnv("SUPABASE_URL")
export const SUPABASE_ANON_KEY = getEnv("SUPABASE_ANON_KEY")
export const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY")
export const SUPABASE_JWT_SECRET = getEnv("SUPABASE_JWT_SECRET")

// App
export const APP_URL = getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
