"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationBell } from "@/components/notification-bell"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface NavbarProps {
  notifications?: any[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
}

export function Navbar({
  notifications = [],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
}: NavbarProps) {
  const pathname = usePathname()
  const { user, isLoading, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const isAdmin = user?.role === "admin"

  // Navigation links
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/templates", label: "Templates" },
    { href: "/projects", label: "Projects" },
    { href: "/integrations", label: "Integrations" },
    // Only show Admin link for admin users
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-l4PRz3KCaOBCFxoqvwTcHRjcPC4eHf.png"
              alt="Creavibe.pro"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="hidden font-bold text-xl sm:inline-block">Creavibe.pro</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {!isLoading && (
            <>
              {user ? (
                <>
                  {/* Notification Bell */}
                  <NotificationBell
                    notifications={notifications}
                    onMarkAsRead={onMarkAsRead}
                    onMarkAllAsRead={onMarkAllAsRead}
                    onClearAll={onClearAll}
                    className="hidden sm:block"
                  />

                  {/* User Avatar & Dropdown */}
                  <UserNav user={user} onSignOut={signOut} />
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-l4PRz3KCaOBCFxoqvwTcHRjcPC4eHf.png"
                    alt="Creavibe.pro"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="font-bold text-xl">Creavibe.pro</span>
                </Link>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {user ? (
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-4 py-4">
                      <Avatar>
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Button variant="outline" onClick={signOut}>
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
