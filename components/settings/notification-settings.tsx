"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [emailDigest, setEmailDigest] = useState("daily")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notifications, setNotifications] = useState({
    // Email notifications
    emailProjectUpdates: true,
    emailTeamMessages: true,
    emailAccountAlerts: true,
    emailMarketing: false,
    emailNewsletter: true,

    // Push notifications
    pushProjectUpdates: true,
    pushTeamMessages: true,
    pushAccountAlerts: true,

    // In-app notifications
    inAppProjectUpdates: true,
    inAppTeamMessages: true,
    inAppAccountAlerts: true,
    inAppProductTips: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveNotifications = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Manage how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="push" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Push</span>
              </TabsTrigger>
              <TabsTrigger value="in-app" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>In-App</span>
              </TabsTrigger>
            </TabsList>

            {/* Email Notification Settings */}
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about updates to your projects</p>
                  </div>
                  <Switch
                    id="email-project-updates"
                    checked={notifications.emailProjectUpdates}
                    onCheckedChange={() => handleToggle("emailProjectUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-team-messages">Team Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new messages from your team</p>
                  </div>
                  <Switch
                    id="email-team-messages"
                    checked={notifications.emailTeamMessages}
                    onCheckedChange={() => handleToggle("emailTeamMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-account-alerts">Account Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about your account security and important notices
                    </p>
                  </div>
                  <Switch
                    id="email-account-alerts"
                    checked={notifications.emailAccountAlerts}
                    onCheckedChange={() => handleToggle("emailAccountAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features, offers, and promotions
                    </p>
                  </div>
                  <Switch
                    id="email-marketing"
                    checked={notifications.emailMarketing}
                    onCheckedChange={() => handleToggle("emailMarketing")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive our monthly newsletter with tips and updates
                    </p>
                  </div>
                  <Switch
                    id="email-newsletter"
                    checked={notifications.emailNewsletter}
                    onCheckedChange={() => handleToggle("emailNewsletter")}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label>Email Digest Frequency</Label>
                <RadioGroup value={emailDigest} onValueChange={setEmailDigest} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="digest-daily" />
                    <Label htmlFor="digest-daily" className="font-normal">
                      Daily
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="digest-weekly" />
                    <Label htmlFor="digest-weekly" className="font-normal">
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="digest-never" />
                    <Label htmlFor="digest-never" className="font-normal">
                      Never (receive individual emails)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            {/* Push Notification Settings */}
            <TabsContent value="push" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about updates to your projects
                    </p>
                  </div>
                  <Switch
                    id="push-project-updates"
                    checked={notifications.pushProjectUpdates}
                    onCheckedChange={() => handleToggle("pushProjectUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-team-messages">Team Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about new messages from your team
                    </p>
                  </div>
                  <Switch
                    id="push-team-messages"
                    checked={notifications.pushTeamMessages}
                    onCheckedChange={() => handleToggle("pushTeamMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-account-alerts">Account Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about your account security and important notices
                    </p>
                  </div>
                  <Switch
                    id="push-account-alerts"
                    checked={notifications.pushAccountAlerts}
                    onCheckedChange={() => handleToggle("pushAccountAlerts")}
                  />
                </div>
              </div>
            </TabsContent>

            {/* In-App Notification Settings */}
            <TabsContent value="in-app" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app-project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications about updates to your projects
                    </p>
                  </div>
                  <Switch
                    id="in-app-project-updates"
                    checked={notifications.inAppProjectUpdates}
                    onCheckedChange={() => handleToggle("inAppProjectUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app-team-messages">Team Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications about new messages from your team
                    </p>
                  </div>
                  <Switch
                    id="in-app-team-messages"
                    checked={notifications.inAppTeamMessages}
                    onCheckedChange={() => handleToggle("inAppTeamMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app-account-alerts">Account Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications about your account security and important notices
                    </p>
                  </div>
                  <Switch
                    id="in-app-account-alerts"
                    checked={notifications.inAppAccountAlerts}
                    onCheckedChange={() => handleToggle("inAppAccountAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app-product-tips">Product Tips</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications with tips and feature highlights
                    </p>
                  </div>
                  <Switch
                    id="in-app-product-tips"
                    checked={notifications.inAppProductTips}
                    onCheckedChange={() => handleToggle("inAppProductTips")}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={handleSaveNotifications} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Notification Preferences"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
