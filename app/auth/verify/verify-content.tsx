"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // In a real implementation, we would verify the token or code here
    // For this example, we'll simulate a successful verification after a delay
    const token = searchParams.get("token")
    
    if (!token) {
      setStatus("error")
      setMessage("Verification token is missing. Please check your email link and try again.")
      return
    }
    
    const timer = setTimeout(() => {
      // Simulate verification success
      setStatus("success")
      setMessage("Your email has been successfully verified. You can now log in to your account.")
    }, 2000)

    return () => clearTimeout(timer)
  }, [searchParams, router])

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-center">Verifying your email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center font-medium text-xl mb-2">Verification Successful</p>
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-destructive/10 p-4 rounded-full mb-4">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <p className="text-center font-medium text-xl mb-2">Verification Failed</p>
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === "success" && (
            <Button onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          )}
          {status === "error" && (
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Go to Home</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
