"use client"

import { useState, useEffect } from "react"
import { IntegrationCard } from "./integration-card"
import { IntegrationsEmptyState } from "./integrations-empty-state"
import { IntegrationsLoadingState } from "./integrations-loading-state"
import { getIntegrations } from "@/lib/integrations"
import type { Integration } from "@/types/integrations"

export function IntegrationsGrid() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setIsLoading(true)
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = await getIntegrations()
        setIntegrations(data)
      } catch (error) {
        console.error("Failed to fetch integrations:", error)
        setIntegrations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  if (isLoading) {
    return <IntegrationsLoadingState />
  }

  if (integrations.length === 0) {
    return <IntegrationsEmptyState />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {integrations.map((integration) => (
        <IntegrationCard key={integration.id} integration={integration} />
      ))}
    </div>
  )
}
