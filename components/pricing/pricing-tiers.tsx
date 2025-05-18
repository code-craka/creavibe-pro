"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import PricingToggle from "./pricing-toggle"

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: PricingFeature[]
  cta: string
  popular?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "Perfect for individuals just getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: "5 AI-generated content pieces/month", included: true },
      { name: "Basic templates", included: true },
      { name: "1 user", included: true },
      { name: "5GB storage", included: true },
      { name: "Email support", included: true },
      { name: "Advanced AI models", included: false },
      { name: "Collaboration tools", included: false },
      { name: "Version history", included: false },
      { name: "Custom branding", included: false },
      { name: "API access", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    description: "Ideal for creators and professionals",
    monthlyPrice: 29,
    yearlyPrice: 279,
    features: [
      { name: "50 AI-generated content pieces/month", included: true },
      { name: "All templates", included: true },
      { name: "1 user", included: true },
      { name: "50GB storage", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced AI models", included: true },
      { name: "Basic collaboration tools", included: true },
      { name: "30-day version history", included: true },
      { name: "Custom branding", included: false },
      { name: "API access", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    description: "For teams and growing businesses",
    monthlyPrice: 79,
    yearlyPrice: 759,
    features: [
      { name: "Unlimited AI-generated content", included: true },
      { name: "All templates + priority access", included: true },
      { name: "Up to 10 users", included: true },
      { name: "250GB storage", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced AI models + custom training", included: true },
      { name: "Advanced collaboration tools", included: true },
      { name: "Unlimited version history", included: true },
      { name: "Custom branding", included: true },
      { name: "API access", included: true },
    ],
    cta: "Contact Sales",
  },
]

export default function PricingTiers() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <PricingToggle onToggle={setIsYearly} />

        <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${plan.popular ? "border-primary relative shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle
                        className={`mr-2 h-4 w-4 ${feature.included ? "text-primary" : "text-muted-foreground opacity-30"}`}
                        fill={feature.included ? "currentColor" : "none"}
                      />
                      <span className={feature.included ? "" : "text-muted-foreground line-through opacity-50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
