import type { Metadata } from "next"
import PricingHeader from "@/components/pricing/pricing-header"
import PricingTiers from "@/components/pricing/pricing-tiers"
import PricingFAQ from "@/components/pricing/pricing-faq"
import PricingCTA from "@/components/pricing/pricing-cta"

export const metadata: Metadata = {
  title: "Pricing | CreaVibe",
  description: "Choose the perfect plan for your content creation needs",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <PricingHeader />
        <PricingTiers />
        <PricingFAQ />
        <PricingCTA />
      </main>
    </div>
  )
}
