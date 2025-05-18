import type { Metadata } from "next"
import CommunityHero from "@/components/community/community-hero"
import CommunityForums from "@/components/community/community-forums"
import UpcomingWebinars from "@/components/community/upcoming-webinars"
import FeatureRequests from "@/components/community/feature-requests"
import NewsletterSignup from "@/components/community/newsletter-signup"

export const metadata: Metadata = {
  title: "Community Hub | Creavibe.pro",
  description:
    "Join the Creavibe.pro community to connect with other creators, attend webinars, and contribute to feature requests.",
}

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <CommunityHero />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <CommunityForums />
        <UpcomingWebinars />
      </div>

      <FeatureRequests />

      <NewsletterSignup />
    </div>
  )
}
