"use client"

import Image from "next/image"
import Link from "next/link"

interface StripeClimateBadgeProps {
  size?: "small" | "large"
  className?: string
  showLink?: boolean
}

export function StripeClimateBadge({
  size = "small",
  className = "",
  showLink = true
}: StripeClimateBadgeProps) {
  // Define the badge image path based on size
  const badgeImagePath = size === "small"
    ? "/stripe-climate-asset-kit/PNG/Stripe Climate Badge - Small.png"
    : "/stripe-climate-asset-kit/PNG/Stripe Climate Badge - Large.png"
  
  // Define dimensions based on size
  const dimensions = size === "small"
    ? { width: 120, height: 32 }
    : { width: 240, height: 64 }
  
  // The URL to link to when clicking the badge
  const climateLinkUrl = "https://climate.stripe.com/k4foZe"
  
  const badge = (
    <div className={`stripe-climate-badge ${className}`}>
      <Image
        src={badgeImagePath}
        alt="Stripe Climate Badge - Remove CO₂ from the atmosphere"
        width={dimensions.width}
        height={dimensions.height}
        quality={100}
        className="h-auto w-auto"
      />
    </div>
  )
  
  // If showLink is true, wrap the badge in a link
  if (showLink) {
    return (
      <Link 
        href={climateLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Learn more about Stripe Climate"
        className="inline-block hover:opacity-90 transition-opacity"
      >
        {badge}
      </Link>
    )
  }
  
  // Otherwise, just return the badge
  return badge
}
