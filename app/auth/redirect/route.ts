import { NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

/**
 * This route handler is used to redirect users after auth actions
 * such as email verification, password reset, etc.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"
  const error = requestUrl.searchParams.get("error")
  const message = requestUrl.searchParams.get("message")
  const action = requestUrl.searchParams.get("action") || "login" // Default action is login
  
  // Create a Supabase client for the server
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session
  
  // Determine the final redirect URL
  let finalRedirectUrl = redirectTo
  
  // If user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && redirectTo.startsWith("/dashboard")) {
    finalRedirectUrl = "/login"
  }
  
  // Build the target URL with any error or success messages
  const targetUrl = new URL(finalRedirectUrl, request.url)
  
  if (error) {
    targetUrl.searchParams.set("error", error)
  }
  
  if (message) {
    targetUrl.searchParams.set("message", message)
  }
  
  // Add auth_success parameter if the user is authenticated and no error occurred
  if (isAuthenticated && !error) {
    targetUrl.searchParams.set("auth_success", "true")
  }
  
  // Log the redirection for debugging
  console.log(`Redirecting from ${request.url} to ${targetUrl.toString()}`)
  
  return NextResponse.redirect(targetUrl)
}
