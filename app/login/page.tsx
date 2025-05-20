import { LoginForm } from "./login-form"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { SupabaseWarning } from "@/components/supabase-warning"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CreaVibe</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <SupabaseWarning />
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
