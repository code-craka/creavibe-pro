import { ForgotPasswordForm } from "./forgot-password-form"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CreaVibe</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">Enter your email to receive a password reset link</p>
        </div>
        <ForgotPasswordForm />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
