"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Loader2, AlertCircle, CheckCircle, Clock, CreditCard, ExternalLink, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Subscription, SubscriptionStatus as SubscriptionStatusType } from "@/types/subscription"
import { StripeClimateBadge } from "./stripe-climate-badge"

interface SubscriptionStatusProps {
  subscription: Subscription | null
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleManageSubscription = async () => {
    if (!subscription?.stripe_customer_id) {
      toast({
        title: "No subscription found",
        description: "You don't have an active subscription to manage",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch("/api/stripe/create-billing-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/settings/billing`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create billing portal session")
      }

      // Redirect to Stripe Billing Portal
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No billing portal URL returned")
      }
    } catch (error: any) {
      console.error("Error creating billing portal session:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create billing portal session",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get status badge
  const getStatusBadge = (status: SubscriptionStatusType) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center space-x-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
            <CheckCircle className="h-3 w-3" />
            <span>Active</span>
          </div>
        )
      case "trialing":
        return (
          <div className="flex items-center space-x-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
            <Clock className="h-3 w-3" />
            <span>Trial</span>
          </div>
        )
      case "canceled":
        return (
          <div className="flex items-center space-x-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-500">
            <AlertCircle className="h-3 w-3" />
            <span>Canceled</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800/30 dark:text-gray-500">
            <AlertCircle className="h-3 w-3" />
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        )
    }
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>You don't have an active subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No subscription found</AlertTitle>
            <AlertDescription>
              You're currently on the free plan. Subscribe to a paid plan to access more features.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <Button onClick={() => router.push("/settings/billing#pricing")}>
            View Pricing Plans
          </Button>
          <div className="mt-4 w-full">
            <StripeClimateBadge />
          </div>
        </CardFooter>
      </Card>
    )
  }

  const isActive = subscription.status === "active" || subscription.status === "trialing"
  const isCanceled = subscription.status === "canceled" || subscription.cancel_at_period_end

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Manage your subscription</CardDescription>
        </div>
        {getStatusBadge(subscription.status as SubscriptionStatusType)}
      </CardHeader>
      <CardContent className="pt-4">
        {subscription.price_id && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="font-medium">
              {subscription.price_id.includes("basic")
                ? "Basic"
                : subscription.price_id.includes("pro")
                ? "Pro"
                : subscription.price_id.includes("enterprise")
                ? "Enterprise"
                : "Unknown"}
            </span>
          </div>
        )}

        {subscription.current_period_end && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {isCanceled ? "Expires on" : "Next billing date"}
            </span>
            <span className="font-medium">
              {format(new Date(subscription.current_period_end), "MMMM d, yyyy")}
            </span>
          </div>
        )}

        {subscription.cancel_at_period_end && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Subscription Canceled</AlertTitle>
            <AlertDescription>
              Your subscription has been canceled and will end on{" "}
              {subscription.current_period_end
                ? format(new Date(subscription.current_period_end), "MMMM d, yyyy")
                : "the end of your current billing period"}
              . You can reactivate your subscription before this date.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="grid w-full gap-2">
          <Button
            asChild
            variant="default"
            className="w-full"
          >
            <Link href="/settings/billing/manage" className="flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Details
            </Link>
          </Button>
          
          <Button
            onClick={handleManageSubscription}
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Stripe Portal
              </>
            )}
          </Button>
        </div>
        <div className="mt-4 w-full">
          <StripeClimateBadge />
        </div>
      </CardFooter>
    </Card>
  )
}
