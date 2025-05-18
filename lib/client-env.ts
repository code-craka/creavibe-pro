/**
 * Client-side safe environment variables
 * Only includes variables prefixed with NEXT_PUBLIC_
 */

// Safely get public environment variables with fallbacks
export const getPublicEnv = (key: string, defaultValue = ""): string => {
  if (typeof window !== "undefined") {
    // Client-side
    return process.env[key] || defaultValue
  } else {
    // Server-side
    return process.env[key] || defaultValue
  }
}

// Detect environment based on hostname or NEXT_PUBLIC_NODE_ENV
export const detectEnvironment = (): "development" | "production" | "test" => {
  if (typeof window !== "undefined") {
    // Client-side detection
    const hostname = window.location.hostname
    const envVar = process.env.NEXT_PUBLIC_NODE_ENV

    if (envVar) return envVar as "development" | "production" | "test"
    if (hostname === "localhost" || hostname === "127.0.0.1") return "development"
    return "production"
  } else {
    // Server-side fallback
    return (process.env.NODE_ENV || "development") as "development" | "production" | "test"
  }
}

// Public environment variables
export const NODE_ENV = getPublicEnv("NEXT_PUBLIC_NODE_ENV", detectEnvironment())
export const IS_PRODUCTION = NODE_ENV === "production"
export const IS_DEVELOPMENT = NODE_ENV === "development"
export const IS_TEST = NODE_ENV === "test"

// App
export const APP_URL = getPublicEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
export const SUPABASE_URL = getPublicEnv("NEXT_PUBLIC_SUPABASE_URL", "")
export const SUPABASE_ANON_KEY = getPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
