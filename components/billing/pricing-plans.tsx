"use client"

import { useState } from "react"
import { Check, Loader2, Globe, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/stripe"
import { SubscriptionPlan } from "@/types/subscription"
import { PaymentMethodIcons } from "./payment-method-icons"

interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: "month" | "year"
  features: string[]
  priceId: string
  popular?: boolean
  plan: SubscriptionPlan
  alternativePrices?: {
    currency: string
    price: number
    priceId: string
  }[]
}

interface PricingPlansProps {
  currentPlan?: SubscriptionPlan
}

// Pricing plans data with international currency support
const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for personal projects",
    price: 0,
    currency: "usd",
    interval: "month",
    features: [
      "5 projects",
      "Basic templates",
      "Community support",
      "1GB storage"
    ],
    priceId: "",
    plan: "free"
  },
  {
    id: "basic",
    name: "Basic",
    description: "Essential features for professionals",
    price: 1999,
    currency: "usd",
    interval: "month",
    features: [
      "25 projects",
      "All templates",
      "Priority support",
      "10GB storage",
      "Custom branding",
      "API access"
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || "price_basic",
    plan: "basic",
    alternativePrices: [
      {
        currency: "eur",
        price: 1899,
        priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_EUR || "price_basic_eur"
      },
      {
        currency: "gbp",
        price: 1699,
        priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_GBP || "price_basic_gbp"
      }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for teams",
    price: 4999,
    currency: "usd",
    interval: "month",
    features: [
      "Unlimited projects",
      "All templates",
      "Priority support",
      "100GB storage",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations"
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro",
    popular: true,
    plan: "pro",
    alternativePrices: [
      {
        currency: "eur",
        price: 4599,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_EUR || "price_pro_eur"
      },
      {
        currency: "gbp",
        price: 3999,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_GBP || "price_pro_gbp"
      }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Ultimate features for large organizations",
    price: 9999,
    currency: "usd",
    interval: "month",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "1TB storage",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations",
      "SLA guarantees",
      "Custom development"
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
    plan: "enterprise",
    alternativePrices: [
      {
        currency: "eur",
        price: 9499,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID_EUR || "price_enterprise_eur"
      },
      {
        currency: "gbp",
        price: 8499,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID_GBP || "price_enterprise_gbp"
      }
    ]
  }
]

export function PricingPlans({ currentPlan = "free" }: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd")
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to subscribe to a plan",
        variant: "destructive",
      })
      router.push("/login?redirectTo=/settings/billing")
      return
    }

    if (plan.plan === "free") {
      toast({
        title: "Free plan",
        description: "You're already on the free plan",
      })
      return
    }

    if (plan.plan === currentPlan) {
      toast({
        title: "Current plan",
        description: "You're already subscribed to this plan",
      })
      return
    }

    try {
      setSelectedPlan(plan.id)
      setIsLoading(true)
      
      // Determine which price ID to use based on selected currency
      let priceId = plan.priceId; // Default to USD price
      
      if (selectedCurrency !== "usd" && plan.alternativePrices) {
        const alternativePrice = plan.alternativePrices.find(
          (price) => price.currency === selectedCurrency
        );
        
        if (alternativePrice) {
          priceId = alternativePrice.priceId;
        }
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
          successUrl: `${window.location.origin}/settings/billing?success=true`,
          cancelUrl: `${window.location.origin}/settings/billing?canceled=true`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  // Get the price to display based on selected currency
  const getPriceToDisplay = (plan: PricingPlan) => {
    if (selectedCurrency === "usd" || plan.plan === "free") {
      return { price: plan.price, currency: plan.currency };
    }
    
    const alternativePrice = plan.alternativePrices?.find(
      (price) => price.currency === selectedCurrency
    );
    
    return alternativePrice 
      ? { price: alternativePrice.price, currency: alternativePrice.currency }
      : { price: plan.price, currency: plan.currency };
  };

  return (
    <>
      {/* Currency selector */}
      <div className="mb-6 flex items-center justify-end space-x-2">
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Currency:</span>
        </div>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="USD" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Payment methods information */}
      <div className="mb-6 flex flex-col items-end justify-between gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Accepted Payment Methods</h3>
          <p className="text-xs text-muted-foreground">
            We accept various payment methods based on your location and currency
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PaymentMethodIcons />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-help items-center gap-1 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>Processing times may vary</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Credit cards process instantly. Bank transfers like SEPA may take 1-3 business days to clear.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan) => {
          const isCurrentPlan = plan.plan === currentPlan
          const isSelected = selectedPlan === plan.id
          const isDisabled = isLoading && !isSelected
          const priceDisplay = getPriceToDisplay(plan);

          return (
            <Card 
              key={plan.id} 
              className={`flex flex-col ${plan.popular ? 'border-primary shadow-md' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader className={plan.popular ? 'pt-8' : ''}>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{formatPrice(priceDisplay.price, priceDisplay.currency)}</span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  )}
                </div>
              </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                  disabled={isDisabled || isCurrentPlan}
                  onClick={() => handleSubscribe(plan)}
                >
                  {isSelected && isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : isCurrentPlan ? (
                    "Current Plan"
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </Button>
                
                {/* Only show payment methods for paid plans */}
                {plan.price > 0 && (
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs text-muted-foreground">Payment methods</span>
                    <PaymentMethodIcons 
                      size="sm"
                      methods={selectedCurrency === "eur" ? ["card", "sepa_debit", "ideal", "sofort"] : 
                              selectedCurrency === "gbp" ? ["card", "bacs_debit"] : 
                              ["card", "apple_pay", "google_pay"]}
                    />
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
    </>
  )
}
