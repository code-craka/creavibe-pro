import type { Metadata } from "next"
import PrivacyPolicyContent from "@/components/privacy-policy/privacy-policy-content"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy | CreaVibe",
  description:
    "Learn how CreaVibe collects, uses, and protects your personal information in compliance with GDPR regulations.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
        className="mb-6"
      />
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 18, 2025</p>
        </div>
        <PrivacyPolicyContent />
      </div>
    </div>
  )
}
