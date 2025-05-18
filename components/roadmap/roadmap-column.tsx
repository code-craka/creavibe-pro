"use client"

import { useState } from "react"
import type { RoadmapItem, RoadmapStatus } from "@/types/roadmap"
import RoadmapCard from "./roadmap-card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import RoadmapItemDialog from "./roadmap-item-dialog"

interface RoadmapColumnProps {
  title: string
  description: string
  items: RoadmapItem[]
  status: RoadmapStatus
  isAdmin: boolean
  onUpdateItem: (item: RoadmapItem) => void
  onDeleteItem: (id: string) => void
  onAddItem: (item: RoadmapItem) => void
}

export default function RoadmapColumn({
  title,
  description,
  items,
  status,
  isAdmin,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
}: RoadmapColumnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="p-4 space-y-4 min-h-[300px]">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-32 border border-dashed rounded-lg">
            <p className="text-sm text-muted-foreground">No items yet</p>
          </div>
        ) : (
          items.map((item) => (
            <RoadmapCard key={item.id} item={item} isAdmin={isAdmin} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
          ))
        )}
      </div>

      {isAdmin && (
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add to {title}
          </Button>

          <RoadmapItemDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            mode="create"
            defaultStatus={status}
            onSave={onAddItem}
          />
        </div>
      )}
    </div>
  )
}
