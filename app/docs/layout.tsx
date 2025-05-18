import type React from "react"
import type { Metadata } from "next"
import { DocsSearch } from "@/components/docs/docs-search"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Documentation | Creavibe.pro",
  description: "Developer documentation for Creavibe.pro API and SDK",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <a href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">Creavibe.pro</span>
                <span className="text-sm text-muted-foreground">Docs</span>
              </a>
            </div>
            <div className="flex flex-1 items-center space-x-2 md:justify-end">
              <Suspense>
                <DocsSearch />
              </Suspense>
              <nav className="flex items-center space-x-2">
                <a
                  href="https://github.com/creavibe/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </header>
        <div className="container flex-1">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
              <ScrollArea className="h-full">
                <Suspense>
                  <DocsSidebar />
                </Suspense>
              </ScrollArea>
            </aside>
            <main className="relative py-6 lg:gap-10 lg:py-10">
              <div className="mx-auto w-full min-w-0">{children}</div>
            </main>
          </div>
        </div>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Creavibe.pro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
