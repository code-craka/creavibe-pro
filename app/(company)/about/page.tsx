import type { Metadata } from "next"
import { MissionVision } from "@/components/about/mission-vision"
import { TeamSection } from "@/components/about/team-section"
import { CompanyTimeline } from "@/components/about/company-timeline"
import { ValueCards } from "@/components/about/value-cards"
import { AboutCTA } from "@/components/about/about-cta"

export const metadata: Metadata = {
  title: "About Us | Creavibe.pro",
  description: "Learn about Creavibe.pro's mission, team, and journey in revolutionizing AI-powered content creation.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Creavibe.pro</h1>

      <MissionVision />

      <TeamSection />

      <CompanyTimeline />

      <ValueCards />

      <AboutCTA />
    </div>
  )
}
