"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PricingToggleProps {
  onToggle: (isYearly: boolean) => void
}

export default function PricingToggle({ onToggle }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false)

  const handleToggle = (checked: boolean) => {
    setIsYearly(checked)
    onToggle(checked)
  }

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>Monthly</span>
      <div className="flex items-center space-x-2">
        <Switch
          id="pricing-toggle"
          checked={isYearly}
          onCheckedChange={handleToggle}
          aria-label="Toggle between monthly and yearly pricing"
        />
        <Label htmlFor="pricing-toggle" className="sr-only">
          Toggle between monthly and yearly pricing
        </Label>
      </div>
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}>Yearly</span>
        <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          Save 20%
        </span>
      </div>
    </div>
  )
}
