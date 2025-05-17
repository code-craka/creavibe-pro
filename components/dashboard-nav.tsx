"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function DashboardNav() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
      <Button variant="ghost" className="justify-start px-3" onClick={signOut}>
        Logout
      </Button>
    </nav>
  )
}
