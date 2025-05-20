"use client"

import { useEffect, useState } from "react"
import { Sparkles, CheckCircle, Mail, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/lib/auth-service"

// Using dynamic import for client-side only components
const ConfirmationContent = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [countdown, setCountdown] = useState(60)
  const [resending, setResending] = useState(false)
  const { toast } = useToast()
  
  // Countdown timer for email verification
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address is missing. Please try again.",
        variant: "destructive",
      })
      return
    }

    setResending(true)
    try {
      // Call auth service to resend verification email
      const { error } = await authService.resetPassword(email)
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to resend verification email. Please try again.",
          variant: "destructive",
        })
      } else {
        // Reset countdown
        setCountdown(60)
        
        toast({
          title: "Verification Email Sent",
          description: `We've sent a new verification email to ${email}. Please check your inbox.`,
          variant: "success",
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to resend verification email. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">CreaVibe</span>
        </Link>
      </div>
      
      <Card className="border-2 border-primary/10 shadow-md">
        <CardHeader className="space-y-1 flex flex-col items-center pb-2">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-2">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">Account Created!</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification email to:
          </CardDescription>
          <p className="font-medium text-primary">{email}</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              You must verify your email before you can log in. The verification link expires in 24 hours.
            </AlertDescription>
          </Alert>
          
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Next Steps:</h3>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>You&apos;ll be automatically redirected to your dashboard</li>
            </ol>
          </div>
          
          {countdown > 0 ? (
            <p className="text-sm text-center text-muted-foreground">
              You can request a new verification email in {countdown} seconds
            </p>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              disabled={resending}
              onClick={handleResendVerification}
            >
              {resending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/login">
              Continue to Login
            </Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Need help? <Link href="/help-center" className="text-primary hover:underline">Contact Support</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ConfirmationContent
