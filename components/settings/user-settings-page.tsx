"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, ChevronRight, Key, LogOut, Shield, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog"
import { ChangePasswordForm } from "@/components/settings/change-password-form"
import { NotificationPreferences } from "@/components/settings/notification-preferences"

// Mock user data - in a real app, this would come from your auth context or API
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Admin",
  avatarUrl: "/abstract-profile.png",
  initials: "AJ",
}

export function UserSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, this would call your auth service logout method
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })

    // Redirect to login page
    setTimeout(() => {
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Profile Information Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-xl">{user.name}</h3>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/settings/profile">Edit Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <p className="text-sm text-muted-foreground">Member since January 2023</p>
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security settings</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="password" className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password for enhanced security</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ChangePasswordForm />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="notifications" className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium">Notification Preferences</p>
                      <p className="text-sm text-muted-foreground">Control which notifications you receive</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <NotificationPreferences />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security" className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium">Security Settings</p>
                      <p className="text-sm text-muted-foreground">
                        Manage two-factor authentication and security logs
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    <p>Security settings will be available soon.</p>
                    <Button variant="outline" disabled>
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <Separator />
          <CardFooter className="p-0">
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="w-full flex items-center justify-between px-6 py-4 text-left text-red-600 hover:bg-red-50 rounded-b-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5" />
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardFooter>
        </Card>
      </div>

      <DeleteAccountDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} />
    </div>
  )
}
