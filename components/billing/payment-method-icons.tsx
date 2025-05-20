"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type PaymentMethodType = 
  | "card" 
  | "sepa_debit" 
  | "ideal" 
  | "giropay" 
  | "bancontact" 
  | "sofort" 
  | "eps" 
  | "p24" 
  | "bacs_debit"
  | "apple_pay"
  | "google_pay"

interface PaymentMethodIconsProps {
  methods?: PaymentMethodType[]
  className?: string
  showLabels?: boolean
  size?: "sm" | "md" | "lg"
}

const PAYMENT_METHODS: Record<PaymentMethodType, { name: string, icon: string }> = {
  card: { 
    name: "Credit Card", 
    icon: "/payment-icons/card.svg" 
  },
  sepa_debit: { 
    name: "SEPA Direct Debit", 
    icon: "/payment-icons/sepa.svg" 
  },
  ideal: { 
    name: "iDEAL", 
    icon: "/payment-icons/ideal.svg" 
  },
  giropay: { 
    name: "Giropay", 
    icon: "/payment-icons/giropay.svg" 
  },
  bancontact: { 
    name: "Bancontact", 
    icon: "/payment-icons/bancontact.svg" 
  },
  sofort: { 
    name: "Sofort", 
    icon: "/payment-icons/sofort.svg" 
  },
  eps: { 
    name: "EPS", 
    icon: "/payment-icons/eps.svg" 
  },
  p24: { 
    name: "Przelewy24", 
    icon: "/payment-icons/p24.svg" 
  },
  bacs_debit: { 
    name: "BACS Direct Debit", 
    icon: "/payment-icons/bacs.svg" 
  },
  apple_pay: { 
    name: "Apple Pay", 
    icon: "/payment-icons/apple-pay.svg" 
  },
  google_pay: { 
    name: "Google Pay", 
    icon: "/payment-icons/google-pay.svg" 
  }
}

// Default payment methods to show if none specified
const DEFAULT_METHODS: PaymentMethodType[] = [
  "card", "apple_pay", "google_pay", "sepa_debit", "ideal", "giropay"
]

export function PaymentMethodIcons({ 
  methods = DEFAULT_METHODS,
  className,
  showLabels = false,
  size = "md"
}: PaymentMethodIconsProps) {
  // Size mapping
  const sizeMap = {
    sm: { width: 24, height: 16 },
    md: { width: 32, height: 20 },
    lg: { width: 48, height: 30 }
  }
  
  const dimensions = sizeMap[size]
  
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {methods.map((method) => (
        <div 
          key={method} 
          className={cn(
            "flex items-center gap-1", 
            showLabels ? "flex-row" : "flex-col"
          )}
        >
          <div className="relative overflow-hidden rounded bg-white p-1 shadow-sm">
            <Image
              src={PAYMENT_METHODS[method].icon}
              alt={PAYMENT_METHODS[method].name}
              width={dimensions.width}
              height={dimensions.height}
              className="h-auto w-auto object-contain"
            />
          </div>
          {showLabels && (
            <span className="text-xs text-muted-foreground">
              {PAYMENT_METHODS[method].name}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
