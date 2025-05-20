"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Clock, AlertCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PaymentMethodIcons } from "@/components/billing/payment-method-icons"
import { StripeClimateBadge } from "@/components/billing/stripe-climate-badge"

export default function SubscriptionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get("session_id")
  const payment_method = searchParams.get("payment_method") || "card"
  
  // Determine if this is a delayed payment method
  const isDelayedPayment = ["sepa_debit", "bacs_debit", "sofort", "ideal"].includes(payment_method as string)
  
  // Redirect to billing page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/settings/billing")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <Card className="mx-auto max-w-md border-green-200 shadow-md">
        <CardHeader>
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              {isDelayedPayment ? (
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-500" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
              )}
            </div>
          </div>
          <CardTitle className="mt-4 text-center text-2xl">
            {isDelayedPayment ? "Payment Processing" : "Subscription Successful!"}
          </CardTitle>
          <CardDescription className="text-center">
            {isDelayedPayment
              ? "Your payment is being processed. This may take 1-3 business days to complete."
              : "Thank you for subscribing to CreaVibe. Your payment has been processed successfully."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {isDelayedPayment ? (
            <Alert variant="warning" className="text-left">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Processing Time</AlertTitle>
              <AlertDescription>
                {payment_method === "sepa_debit" && "SEPA Direct Debit payments typically take 1-2 business days to process."}
                {payment_method === "bacs_debit" && "BACS Direct Debit payments typically take 2-3 business days to process."}
                {payment_method === "sofort" && "Sofort payments typically take a few hours to process."}
                {payment_method === "ideal" && "iDEAL payments typically take a few hours to process."}
                {" "}You'll receive an email confirmation once the payment is complete.
              </AlertDescription>
            </Alert>
          ) : (
            <p className="text-muted-foreground">
              Your subscription is now active. You can now access all the features included in your plan.
            </p>
          )}
          
          <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
            <h3 className="mb-2 text-sm font-medium">Payment Method</h3>
            <div className="flex items-center gap-2">
              <PaymentMethodIcons 
                methods={[payment_method as any]} 
                showLabels 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/settings/billing">Manage Subscription</Link>
          </Button>
          <div className="mt-4 flex justify-center">
            <StripeClimateBadge />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
