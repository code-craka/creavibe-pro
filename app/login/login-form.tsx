"use client"

import { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type EmailFormValues = z.infer<typeof emailSchema>
type LoginFormValues = z.infer<typeof loginSchema>

// This component uses useSearchParams() which needs to be wrapped in Suspense
// This component uses useSearchParams() which needs to be wrapped in Suspense
function LoginFormContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const { toast } = useToast()
  const { signIn, signInWithMagicLink, signInWithOAuth } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectedFrom') || '/dashboard'

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onMagicLinkSubmit(data: EmailFormValues) {
    setIsLoading(true)
    try {
      // Pass the redirectTo parameter to ensure proper redirection after authentication
      const { error } = await signInWithMagicLink(data.email, redirectTo)

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to send magic link. Please try again.",
          variant: "destructive",
        })
      } else {
        emailForm.reset()
        toast({
          title: "Check your email",
          description: "We've sent you a magic link to sign in.",
          duration: 6000, // Show for longer so user can read it
        })
        
        // Show a second toast with more detailed instructions
        setTimeout(() => {
          toast({
            title: "Next steps",
            description: "Click the link in your email to sign in automatically. The link expires in 24 hours.",
            duration: 8000,
          })
        }, 1000)
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onPasswordSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      const { error } = await signIn(data.email, data.password)

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      } else {
        loginForm.reset()
        
        // Construct redirect URL with success parameter
        const redirectUrl = new URL(redirectTo, window.location.origin)
        redirectUrl.searchParams.set('auth_success', 'true')
        
        // Show success toast before redirecting
        toast({
          title: "Login Successful!",
          description: "Welcome back to CreaVibe",
          variant: "success",
        })
        
        // Short delay before redirect to allow the user to see the success message
        setTimeout(() => {
          router.push(redirectUrl.toString())
        }, 800)
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OAuth sign in
  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      if (provider === "google") {
        setIsGoogleLoading(true)
      } else {
        setIsGithubLoading(true)
      }
      
      await signInWithOAuth(provider)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to sign in with ${provider}`,
        variant: "destructive",
      })
    } finally {
      setIsGoogleLoading(false)
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="magic-link" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="magic-link">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onMagicLinkSubmit)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending magic link...
                  </>
                ) : (
                  "Sign in with Email"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="current-password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in with Password"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          disabled={isLoading || isGoogleLoading || isGithubLoading} 
          type="button"
          onClick={() => handleOAuthSignIn("google")}
        >
          {isGoogleLoading ? (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" />
              <path d="M12.0004 24C15.2404 24 17.9654 22.88 19.9454 21.1L16.0804 18.1C15.0054 18.85 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2704 14.295L1.28039 17.39C3.25539 21.31 7.31039 24 12.0004 24Z" />
            </svg>
          )}
          Google
        </Button>
        <Button 
          variant="outline" 
          disabled={isLoading || isGoogleLoading || isGithubLoading} 
          type="button"
          onClick={() => handleOAuthSignIn("github")}
        >
          {isGithubLoading ? (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          )}
          GitHub
        </Button>
      </div>
    </div>
  )
}

// Export the main component with Suspense boundary
export function LoginForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  )
}
