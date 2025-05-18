import type { Metadata } from "next"
import { OpenRoles } from "@/components/careers/open-roles"
import { CultureSection } from "@/components/careers/culture-section"
import { BenefitsSection } from "@/components/careers/benefits-section"
import { TeamPhotos } from "@/components/careers/team-photos"
import { ContactHR } from "@/components/careers/contact-hr"

export const metadata: Metadata = {
  title: "Careers | Creavibe.pro",
  description: "Join our team at Creavibe.pro and help shape the future of AI-powered content creation.",
}

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Team</h1>

      <OpenRoles />

      <CultureSection />

      <BenefitsSection />

      <TeamPhotos />

      <ContactHR />
    </div>
  )
}
