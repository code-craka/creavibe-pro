import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthSuccessBanner } from "@/components/auth/auth-success-banner"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <AuthSuccessBanner />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'CreaVibe - AI-Powered Content Creation',
  description: 'Create, collaborate, and publish content with AI assistance',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.png',
  },
};
