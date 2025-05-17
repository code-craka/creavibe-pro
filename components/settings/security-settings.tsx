"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Key, Shield, Smartphone } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SecuritySettings() {
  const { toast } = useToast()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })

    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsSubmitting(false)
  }

  const handleTwoFactorToggle = async (checked: boolean) => {
    // In a real app, this would trigger a 2FA setup flow
    if (checked) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      })
    } else {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Two-factor authentication disabled",
        description: "Two-factor authentication has been turned off.",
      })
    }

    setTwoFactorEnabled(checked)
  }

  return (
    <div className="space-y-6">
      {/* Password Change Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <p>Password must:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li className={newPassword.length >= 8 ? "text-green-500" : ""}>Be at least 8 characters long</li>
                  <li className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>
                    Include at least one uppercase letter
                  </li>
                  <li className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>Include at least one number</li>
                  <li className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-500" : ""}>
                    Include at least one special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
            </div>
            <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-medium mb-2">Recovery Codes</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Save these recovery codes in a secure location. They can be used to recover access to your account if
                you lose your two-factor authentication device.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <code key={i} className="bg-background p-1 rounded text-xs font-mono">
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </code>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Download Codes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>Manage additional security settings for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-notifications">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new logins to your account
              </p>
            </div>
            <Switch id="login-notifications" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="session-timeout"
                type="number"
                min={5}
                max={120}
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(Number.parseInt(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">Automatically log out after inactivity</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button
            onClick={() => toast({ title: "Settings saved", description: "Your security settings have been updated." })}
          >
            Save Security Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
