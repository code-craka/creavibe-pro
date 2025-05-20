"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, CreditCard, Calendar, ArrowLeft, ExternalLink, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Subscription } from "@/types/subscription"
import { format } from "date-fns"

export default function ManageSubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingPortal, setIsCreatingPortal] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
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

  const handleOpenBillingPortal = async () => {
    if (!user) return

    setIsCreatingPortal(true)
    try {
      const response = await fetch("/api/stripe/create-billing-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: subscription?.stripe_customer_id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create billing portal")
      }

      // Redirect to Stripe Billing Portal
      window.location.href = data.url
    } catch (error) {
      console.error("Error creating billing portal:", error)
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingPortal(false)
    }
  }

  const getPlanName = (priceId: string | null) => {
    if (!priceId) return "Unknown Plan"
    
    if (priceId.includes("basic")) return "Basic Plan"
    if (priceId.includes("pro")) return "Pro Plan"
    if (priceId.includes("enterprise")) return "Enterprise Plan"
    
    return "Custom Plan"
  }

  return (
    <div className="container mx-auto py-10">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => router.push("/settings/billing")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Billing
      </Button>

      <h1 className="mb-6 text-3xl font-bold">Manage Subscription</h1>

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      ) : !subscription || subscription.status !== "active" ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Active Subscription</AlertTitle>
          <AlertDescription>
            You don't have an active subscription to manage. Please subscribe to a plan first.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Your current subscription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Plan</h3>
                <p className="text-lg font-medium">{getPlanName(subscription.price_id)}</p>
              </div>
              
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Status</h3>
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    subscription.status === "active" ? "bg-green-500" : 
                    subscription.status === "trialing" ? "bg-blue-500" : 
                    subscription.status === "canceled" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <p className="text-lg font-medium capitalize">{subscription.status}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div>
                  <h3 className="mb-1 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </h3>
                  <p className="text-md">
                    {subscription.current_period_start 
                      ? format(new Date(Number(subscription.current_period_start) * 1000), "MMMM d, yyyy")
                      : "N/A"}
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-1 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Next Billing Date
                  </h3>
                  <p className="text-md">
                    {subscription.current_period_end && subscription.status === "active"
                      ? format(new Date(Number(subscription.current_period_end) * 1000), "MMMM d, yyyy")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4">
              <Button 
                onClick={handleOpenBillingPortal}
                disabled={isCreatingPortal}
                className="flex w-full items-center gap-2"
              >
                {isCreatingPortal ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening Billing Portal...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Manage Payment Methods
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Management</CardTitle>
              <CardDescription>Manage your subscription and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use the Stripe billing portal to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Update your payment methods</li>
                <li>View payment history</li>
                <li>Download invoices</li>
                <li>Change your subscription plan</li>
                <li>Cancel your subscription</li>
              </ul>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4">
              <Button 
                onClick={handleOpenBillingPortal}
                disabled={isCreatingPortal}
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                {isCreatingPortal ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening Stripe Portal...
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    Open Stripe Billing Portal
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
