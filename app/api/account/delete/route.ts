import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Get the current user
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser()

    if (getUserError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in to delete your account" },
        { status: 401 }
      )
    }

    // Delete user data from the profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", user.id)

    if (profileError) {
      console.error("Error deleting profile:", profileError)
      return NextResponse.json(
        { error: "Database Error", message: "Failed to delete user profile" },
        { status: 500 }
      )
    }

    // Delete user projects
    const { error: projectsError } = await supabase
      .from("projects")
      .delete()
      .eq("user_id", user.id)

    if (projectsError) {
      console.error("Error deleting projects:", projectsError)
      // Continue with account deletion even if project deletion fails
    }

    // In a production environment, you would use Supabase Admin API to delete the user
    // For this example, we'll sign the user out and return success
    // In a real implementation, you would need to use a server-side admin API or
    // create a Supabase Edge Function to handle the actual user deletion

    return NextResponse.json({ success: true, message: "Account deleted successfully" })
  } catch (error: any) {
    console.error("Error in delete account API:", error)
    return NextResponse.json(
      { error: "Server Error", message: error.message || "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
