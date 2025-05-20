import type { Metadata } from "next"
import HelpCenterSearch from "@/components/help-center/help-center-search"
import FaqCategories from "@/components/help-center/faq-categories"
import ContactSupport from "@/components/help-center/contact-support"

export const metadata: Metadata = {
  title: "Help Center | CreaVibe",
  description:
    "Find answers to your questions about CreaVibe's AI-powered content creation and collaboration platform.",
}

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Help Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to your questions about using CreaVibe's AI-powered content creation and collaboration
          platform.
        </p>
      </div>

      <HelpCenterSearch />

      <FaqCategories />

      <ContactSupport />
    </div>
  )
}
