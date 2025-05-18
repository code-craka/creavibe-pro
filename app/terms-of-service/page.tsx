import type { Metadata } from "next"
import { Breadcrumb } from "@/components/breadcrumb"
import { TermsOfServiceContent } from "@/components/terms-of-service/terms-of-service-content"

export const metadata: Metadata = {
  title: "Terms of Service | Creavibe.pro",
  description: "Terms of Service for Creavibe.pro - AI-powered content creation and real-time collaboration platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-10 px-4 md:px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms-of-service" },
        ]}
      />
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: May 18, 2025</p>
        </div>
        <TermsOfServiceContent />
      </div>
    </div>
  )
}
