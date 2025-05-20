"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StripeClimateBadge } from "./stripe-climate-badge"

export function StripeClimateSection() {
  return (
    <Card className="overflow-hidden border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path 
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5ZM12 7.5C12.4142 7.5 12.75 7.83579 12.75 8.25V12.75H16.5C16.9142 12.75 17.25 13.0858 17.25 13.5C17.25 13.9142 16.9142 14.25 16.5 14.25H12C11.5858 14.25 11.25 13.9142 11.25 13.5V8.25C11.25 7.83579 11.5858 7.5 12 7.5Z" 
              fill="currentColor"
            />
          </svg>
          Climate Commitment
        </CardTitle>
        <CardDescription>
          CreaVibe is committed to fighting climate change
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
          <div className="flex-1 space-y-3">
            <p className="text-sm text-muted-foreground">
              We're proud to be part of Stripe Climate, contributing 1% of our revenue to carbon removal technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-200 bg-green-100/50 text-green-800 hover:bg-green-100 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                asChild
              >
                <Link 
                  href="https://climate.stripe.com/k4foZe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <StripeClimateBadge size="large" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
