import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This route handles all Supabase auth callbacks including:
// - Email verification
// - Magic link authentication
// - OAuth provider redirects
// - Password reset confirmations

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"
  const type = requestUrl.searchParams.get("type") // Can be used to identify the type of auth callback
  
  // Early return if no code is present
  if (!code) {
    console.error("No code present in auth callback")
    return NextResponse.redirect(new URL("/login?error=Invalid%20authentication%20link", request.url))
  }
  
  try {
    // Create a Supabase client for the server
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("Auth callback error:", error)
      // Redirect to login with error message
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
      )
    }
    
    // Get user details to determine where to redirect
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error("No user found after auth callback")
      return NextResponse.redirect(new URL("/login?error=Authentication%20failed", request.url))
    }
    
    console.log("Auth callback successful for user:", user.email)
    
    // Check if user has role or other metadata that would determine where to redirect
    const isAdmin = user?.app_metadata?.role === "admin"
    const isNewUser = user?.app_metadata?.is_new_user === true
    
    // Determine the redirect URL based on user role and status
    let finalRedirectUrl = redirectTo
    
    // Redirect new users to onboarding
    if (isNewUser) {
      finalRedirectUrl = "/onboarding"
    } 
    // Redirect admins to admin dashboard
    else if (isAdmin) {
      finalRedirectUrl = "/admin/dashboard"
    }
    
    // Add success parameter to show success message after redirect
    const finalUrl = new URL(finalRedirectUrl, request.url)
    finalUrl.searchParams.set("auth_success", "true")
    
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(finalUrl)
  } catch (err) {
    console.error("Unexpected error in auth callback:", err)
    return NextResponse.redirect(new URL("/login?error=Something%20went%20wrong", request.url))
  }
}
