"use client"

import { ProfileForm } from "./profile-form"
import { Separator } from "@/components/ui/separator"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Manage your account settings and profile information.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <DashboardNav />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <ProfileForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
