"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    projectUpdates: true,
    teamMessages: true,
    securityAlerts: true,
    marketingEmails: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
          </div>
          <Switch
            id="email-notifications"
            checked={preferences.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="project-updates">Project Updates</Label>
            <p className="text-sm text-muted-foreground">Get notified about changes to your projects</p>
          </div>
          <Switch
            id="project-updates"
            checked={preferences.projectUpdates}
            onCheckedChange={() => handleToggle("projectUpdates")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="team-messages">Team Messages</Label>
            <p className="text-sm text-muted-foreground">Receive notifications for team messages and comments</p>
          </div>
          <Switch
            id="team-messages"
            checked={preferences.teamMessages}
            onCheckedChange={() => handleToggle("teamMessages")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="security-alerts">Security Alerts</Label>
            <p className="text-sm text-muted-foreground">Get important security notifications about your account</p>
          </div>
          <Switch
            id="security-alerts"
            checked={preferences.securityAlerts}
            onCheckedChange={() => handleToggle("securityAlerts")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing-emails">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
          </div>
          <Switch
            id="marketing-emails"
            checked={preferences.marketingEmails}
            onCheckedChange={() => handleToggle("marketingEmails")}
          />
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </form>
  )
}
