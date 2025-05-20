"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Key
} from "lucide-react"

interface SettingsLayoutProps {
  children: React.ReactNode
}

const settingsNavItems = [
  {
    title: "Account",
    href: "/settings/account",
    icon: User,
  },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Shield,
  },
  {
    title: "API Keys",
    href: "/settings/api-keys",
    icon: Key,
  },
  {
    title: "Preferences",
    href: "/settings/preferences",
    icon: Settings,
  },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <div className="sticky top-16 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>
              <Separator />
              <nav className="flex flex-col space-y-1">
                {settingsNavItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
