import type { Metadata } from "next"
import { IntegrationsHero } from "@/components/integrations/integrations-hero"
import { IntegrationsGrid } from "@/components/integrations/integrations-grid"
import { IntegrationsSearch } from "@/components/integrations/integrations-search"
import { IntegrationsFilters } from "@/components/integrations/integrations-filters"

export const metadata: Metadata = {
  title: "Integrations | CreaVibe",
  description: "Connect CreaVibe with your favorite tools and services",
}

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <IntegrationsHero />
      <div className="mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <IntegrationsSearch />
          <IntegrationsFilters />
        </div>
        <IntegrationsGrid />
      </div>
    </div>
  )
}
