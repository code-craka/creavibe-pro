import type { RoadmapItem } from "@/types/roadmap"
import { v4 as uuidv4 } from "uuid"

// This is mock data. In a real application, this would come from a database
const mockRoadmapItems: RoadmapItem[] = [
  {
    id: uuidv4(),
    title: "Advanced AI Content Generation",
    description: "Enhance our AI content generation capabilities with more customization options and improved quality.",
    status: "planned",
    tags: ["AI", "Content", "Enhancement"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Team Collaboration Features",
    description: "Add real-time collaboration features for teams, including comments, mentions, and shared workspaces.",
    status: "planned",
    tags: ["Collaboration", "Teams", "Real-time"],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Mobile App",
    description: "Develop native mobile applications for iOS and Android to enable content creation on the go.",
    status: "planned",
    tags: ["Mobile", "iOS", "Android"],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Enhanced Analytics Dashboard",
    description: "Improve the analytics dashboard with more detailed insights and customizable reports.",
    status: "in-progress",
    tags: ["Analytics", "Dashboard", "Reporting"],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Content Calendar Integration",
    description: "Integrate with popular calendar tools to schedule and plan content publication.",
    status: "in-progress",
    tags: ["Calendar", "Integration", "Planning"],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Dark Mode Support",
    description:
      "Add dark mode support across the entire platform for better user experience in low-light environments.",
    status: "completed",
    tags: ["UI", "Accessibility", "Theme"],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Social Media Integration",
    description: "Direct publishing to popular social media platforms from within Creavibe.pro.",
    status: "completed",
    tags: ["Social Media", "Integration", "Publishing"],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Template Library Expansion",
    description: "Expand our template library with more industry-specific templates and customization options.",
    status: "completed",
    tags: ["Templates", "Content", "Customization"],
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function getRoadmapItems(): Promise<RoadmapItem[]> {
  // In a real application, this would fetch from a database
  return mockRoadmapItems
}

export async function createRoadmapItem(
  item: Omit<RoadmapItem, "id" | "createdAt" | "updatedAt">,
): Promise<RoadmapItem> {
  // In a real application, this would save to a database
  const newItem: RoadmapItem = {
    id: uuidv4(),
    ...item,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return newItem
}

export async function updateRoadmapItem(id: string, item: Partial<RoadmapItem>): Promise<RoadmapItem> {
  // In a real application, this would update in a database
  const existingItem = mockRoadmapItems.find((i) => i.id === id)

  if (!existingItem) {
    throw new Error(`Roadmap item with id ${id} not found`)
  }

  const updatedItem: RoadmapItem = {
    ...existingItem,
    ...item,
    updatedAt: new Date().toISOString(),
  }

  return updatedItem
}

export async function deleteRoadmapItem(id: string): Promise<void> {
  // In a real application, this would delete from a database
  const index = mockRoadmapItems.findIndex((i) => i.id === id)

  if (index === -1) {
    throw new Error(`Roadmap item with id ${id} not found`)
  }
}
