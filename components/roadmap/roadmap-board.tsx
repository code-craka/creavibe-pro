"use client"

import { useState, useEffect } from "react"
import type { RoadmapItem } from "@/types/roadmap"
import RoadmapColumn from "./roadmap-column"
import { useAuth } from "@/contexts/auth-context"

interface RoadmapBoardProps {
  initialItems: RoadmapItem[]
}

export default function RoadmapBoard({ initialItems }: RoadmapBoardProps) {
  const [items, setItems] = useState<RoadmapItem[]>(initialItems)
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // In a real implementation, check if the user has admin role
    if (user?.role === "admin") {
      setIsAdmin(true)
    }
  }, [user])

  const handleUpdateItem = (updatedItem: RoadmapItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleAddItem = (newItem: RoadmapItem) => {
    setItems([...items, newItem])
  }

  const plannedItems = items.filter((item) => item.status === "planned")
  const inProgressItems = items.filter((item) => item.status === "in-progress")
  const completedItems = items.filter((item) => item.status === "completed")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RoadmapColumn
        title="Planned"
        description="Features we're planning to work on"
        items={plannedItems}
        status="planned"
        isAdmin={isAdmin}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
      />
      <RoadmapColumn
        title="In Progress"
        description="Features we're currently working on"
        items={inProgressItems}
        status="in-progress"
        isAdmin={isAdmin}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
      />
      <RoadmapColumn
        title="Completed"
        description="Recently completed features"
        items={completedItems}
        status="completed"
        isAdmin={isAdmin}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
      />
    </div>
  )
}
