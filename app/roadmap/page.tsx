import type { Metadata } from "next"
import RoadmapHeader from "@/components/roadmap/roadmap-header"
import RoadmapBoard from "@/components/roadmap/roadmap-board"
import { getRoadmapItems } from "@/lib/roadmap-service"

export const metadata: Metadata = {
  title: "Product Roadmap | CreaVibe",
  description:
    "Explore our product roadmap to see what features we're planning, working on, and have recently completed.",
}

export default async function RoadmapPage() {
  // In a real implementation, this would fetch from a database
  const roadmapItems = await getRoadmapItems()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <RoadmapHeader />
      <RoadmapBoard initialItems={roadmapItems} />
    </div>
  )
}
