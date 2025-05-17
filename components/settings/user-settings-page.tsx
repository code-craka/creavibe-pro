"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { ThemeSettings } from "@/components/settings/theme-settings"
import { ConnectedAccountsSettings } from "@/components/settings/connected-accounts-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { UserIcon, PaletteIcon, LinkIcon, BellIcon, ShieldIcon } from "lucide-react"
import { DataExportSettings } from "@/components/settings/data-export-settings"
import { ApiTokenSettings } from "@/components/settings/api-token-settings"
import { DatabaseIcon, KeyIcon } from "lucide-react"

export function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2 h-auto p-1">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <UserIcon className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="theme"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <PaletteIcon className="h-4 w-4" />
            <span className="hidden md:inline">Theme</span>
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <LinkIcon className="h-4 w-4" />
            <span className="hidden md:inline">Accounts</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BellIcon className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ShieldIcon className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="data-export"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <DatabaseIcon className="h-4 w-4" />
            <span className="hidden md:inline">Data Export</span>
          </TabsTrigger>
          <TabsTrigger
            value="api-tokens"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <KeyIcon className="h-4 w-4" />
            <span className="hidden md:inline">API Tokens</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <ThemeSettings />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <ConnectedAccountsSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="data-export" className="space-y-6">
          <DataExportSettings />
        </TabsContent>

        <TabsContent value="api-tokens" className="space-y-6">
          <ApiTokenSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
