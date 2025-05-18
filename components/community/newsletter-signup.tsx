"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!consent) {
      toast({
        title: "Error",
        description: "Please agree to receive marketing communications.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })

    setEmail("")
    setConsent(false)
    setIsSubmitting(false)
  }

  return (
    <div className="bg-muted/50 rounded-lg p-8 text-center">
      <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
        <Mail className="h-6 w-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Subscribe to our newsletter for product updates, tips, and exclusive content.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4 mx-auto">
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} />
          <Label htmlFor="consent" className="text-sm text-muted-foreground">
            I agree to receive marketing communications from Creavibe.pro
          </Label>
        </div>
      </form>
    </div>
  )
}
