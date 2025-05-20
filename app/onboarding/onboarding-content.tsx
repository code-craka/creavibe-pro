"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"

export function OnboardingContent() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      // Wait a bit to check if user is authenticated
      setTimeout(() => {
        setIsLoading(false)
        if (!user && !email) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access the onboarding process.",
            variant: "destructive",
          })
          router.push("/login?redirectedFrom=/onboarding")
        }
      }, 1500)
    }

    checkAuth()
  }, [user, email, router, toast])

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      // Onboarding complete, redirect to dashboard
      router.push("/dashboard")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Setting up your account...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to CreaVibe</h1>
        <p className="text-center text-muted-foreground">
          Let's get your account set up so you can start creating amazing content.
        </p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Getting Started</span>
          <span>Profile Setup</span>
          <span>Preferences</span>
          <span>Complete</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to CreaVibe</CardTitle>
            <CardDescription>
              We're excited to have you on board! Let's start by confirming a few details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Your account has been created</p>
                <p className="text-sm text-muted-foreground">
                  {email ? `Using ${email}` : "Your account is ready to use"}
                </p>
              </div>
            </div>
            <p>
              CreaVibe is an AI-powered content creation platform with real-time collaboration tools.
              You'll be able to create, edit, and share content with your team in minutes.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us a bit more about yourself so we can personalize your experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your profile helps us tailor the content creation experience to your needs and allows
              collaborators to identify you in shared projects.
            </p>
            <p className="text-sm text-muted-foreground">
              You can always update these details later in your account settings.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Set Your Preferences</CardTitle>
            <CardDescription>
              Customize your content creation experience to match your workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your preferences help us optimize the platform for your specific needs, from content types
              to collaboration settings.
            </p>
            <p className="text-sm text-muted-foreground">
              These settings can be adjusted at any time from your dashboard.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>You're All Set!</CardTitle>
            <CardDescription>
              Your account is ready to use. Let's start creating amazing content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Account setup complete</p>
                <p className="text-sm text-muted-foreground">
                  You're ready to start using all features of CreaVibe
                </p>
              </div>
            </div>
            <p>
              Head to your dashboard to create your first project, explore templates, or learn more about
              our AI-powered content creation tools.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep}>
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
