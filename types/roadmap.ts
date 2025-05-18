export type RoadmapStatus = "planned" | "in-progress" | "completed"

export interface RoadmapItem {
  id: string
  title: string
  description: string
  status: RoadmapStatus
  tags: string[]
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  completedAt?: string
}
