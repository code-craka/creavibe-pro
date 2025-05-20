"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Subscription } from "@/types/subscription"
import { PricingPlans } from "@/components/billing/pricing-plans"
import { SubscriptionStatus } from "@/components/billing/subscription-status"
import { StripeClimateSection } from "@/components/billing/stripe-climate-section"
import { PaymentMethodInfo } from "@/components/billing/payment-method-info"

export default function BillingSettingsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  // Check for success, error, or canceled URL parameters
  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")
  const paymentError = searchParams.get("error")

  useEffect(() => {
    // Show toast notifications based on URL parameters
    if (success === "true") {
      toast({
        title: "Subscription successful!",
        description: "Your subscription has been processed successfully.",
      })
    } else if (canceled === "true") {
      toast({
        title: "Subscription canceled",
        description: "Your subscription process was canceled.",
      })
    } else if (paymentError === "true") {
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }, [success, canceled, paymentError, toast])

  useEffect(() => {
    // Fetch the user's subscription
    const fetchSubscription = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle()

        if (error) {
          throw error
        }

        setSubscription(data)
      } catch (error) {
        console.error("Error fetching subscription:", error)
        toast({
          title: "Error",
          description: "Failed to fetch subscription data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [user, toast])

  // Determine the current plan
  const currentPlan = user?.role === "admin" 
    ? "enterprise" 
    : subscription?.status === "active" || subscription?.status === "trialing"
      ? subscription.price_id?.includes("basic")
        ? "basic"
        : subscription.price_id?.includes("pro")
          ? "pro"
          : subscription.price_id?.includes("enterprise")
            ? "enterprise"
            : "free"
      : "free"

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Billing Settings</h1>

      {/* Success/Error Alerts */}
      {success === "true" && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>
            Thank you for your subscription! Your payment has been processed successfully.
          </AlertDescription>
        </Alert>
      )}

      {paymentError === "true" && (
        <Alert variant="destructive" className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Payment Failed</AlertTitle>
          <AlertDescription>
            There was an issue processing your payment. Please try again or contact support.
          </AlertDescription>
        </Alert>
      )}

      {canceled === "true" && (
        <Alert variant="destructive" className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Subscription Canceled</AlertTitle>
          <AlertDescription>
            Your subscription process was canceled. No charges were made.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="status">Current Subscription</TabsTrigger>
              <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-6">
              <SubscriptionStatus subscription={subscription} />
            </TabsContent>

            <TabsContent value="plans" id="pricing" className="space-y-6">
              <h2 className="mb-4 text-2xl font-semibold">Choose a Plan</h2>
              <p className="mb-6 text-muted-foreground">
                Select the plan that best fits your needs. All plans include access to core features.
              </p>
              <PricingPlans currentPlan={currentPlan} />
            </TabsContent>
          </Tabs>
          
          {/* Payment Methods Information */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Payment Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <PaymentMethodInfo />
              
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Secure Payments</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  All payments are securely processed through Stripe, a PCI-DSS Level 1 certified payment processor. Your payment information is never stored on our servers.                
                </p>
                <p className="text-sm text-muted-foreground">
                  For questions about billing or payment methods, please contact our support team at <a href="mailto:support@CreaVibe" className="text-primary hover:underline">support@CreaVibe</a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Stripe Climate Section */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Our Climate Commitment</h2>
            <StripeClimateSection />
          </div>
        </>
      )}
    </div>
  )
}
