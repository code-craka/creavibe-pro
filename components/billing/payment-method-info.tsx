"use client"

import { useState } from "react"
import { Info, Globe } from "lucide-react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { PaymentMethodIcons } from "./payment-method-icons"

interface PaymentMethodInfoProps {
  className?: string
}

type RegionInfo = {
  name: string
  currencies: string[]
  methods: string[]
  processingTime?: string
}

const REGION_INFO: RegionInfo[] = [
  {
    name: "United States & Canada",
    currencies: ["USD", "CAD"],
    methods: ["card", "apple_pay", "google_pay"],
    processingTime: "Instant"
  },
  {
    name: "European Union",
    currencies: ["EUR"],
    methods: ["card", "sepa_debit", "sofort", "ideal", "giropay", "apple_pay", "google_pay"],
    processingTime: "Instant for cards, 1-3 days for bank transfers"
  },
  {
    name: "United Kingdom",
    currencies: ["GBP"],
    methods: ["card", "bacs_debit", "apple_pay", "google_pay"],
    processingTime: "Instant for cards, 2-3 days for BACS Direct Debit"
  },
  {
    name: "International",
    currencies: ["USD", "EUR", "GBP"],
    methods: ["card"],
    processingTime: "Instant"
  }
]

export function PaymentMethodInfo({ className }: PaymentMethodInfoProps) {
  return (
    <div className={className}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="payment-methods">
          <AccordionTrigger className="text-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Available Payment Methods</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <p className="text-xs text-muted-foreground">
                Payment methods vary by region and currency. Here's what's available in your area:
              </p>
              
              <div className="space-y-4">
                {REGION_INFO.map((region) => (
                  <div key={region.name} className="rounded-md border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-medium">{region.name}</h4>
                      <div className="flex gap-1">
                        {region.currencies.map((currency) => (
                          <span 
                            key={currency} 
                            className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium"
                          >
                            {currency}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <PaymentMethodIcons methods={region.methods as any} size="sm" />
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex cursor-help items-center gap-1 text-xs text-muted-foreground">
                            <Info className="h-3 w-3" />
                            <span>Processing time</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{region.processingTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground">
                All payment methods are processed securely through Stripe. Your payment information is never stored on our servers.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
