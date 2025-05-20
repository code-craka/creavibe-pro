"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "@/components/notification-bell"
import { Menu, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthNav } from "@/components/auth/auth-nav"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Features",
      active: pathname === "/features",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname.startsWith("/blog"),
    },
    {
      href: "/roadmap",
      label: "Roadmap",
      active: pathname === "/roadmap",
    },
    {
      href: "/pricing",
      label: "Pricing",
      active: pathname === "/pricing",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="CreaVibe Logo" 
              width={140} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {user && (
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  0
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </Link>
          )}
          <AuthNav />
        </div>
      </div>
    </header>
  )
}
