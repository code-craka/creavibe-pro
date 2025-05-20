"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserAvatar } from "@/components/auth/user-avatar"
import { Separator } from "@/components/ui/separator"
import { AuthSuccessBanner } from "@/components/auth/auth-success-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">CreaVibe</h1>
            </div>
            <UserAvatar />
          </div>
        </header>
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <div className="py-6 pr-6 lg:py-8">
              <DashboardNav />
            </div>
          </aside>
          <main className="flex w-full flex-col overflow-hidden py-6">
            <AuthSuccessBanner />
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
