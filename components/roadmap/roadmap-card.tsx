"use client"

import { useState } from "react"
import type { RoadmapItem } from "@/types/roadmap"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import RoadmapItemDialog from "./roadmap-item-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RoadmapCardProps {
  item: RoadmapItem
  isAdmin: boolean
  onUpdate: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}

export default function RoadmapCard({ item, isAdmin, onUpdate, onDelete }: RoadmapCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-lg">{item.title}</h3>
          {item.estimatedDelivery && item.status !== "completed" && (
            <div className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(item.estimatedDelivery)}</div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {isAdmin && (
        <CardFooter className="px-4 py-3 border-t flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete roadmap item</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{item.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(item.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <RoadmapItemDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            mode="edit"
            item={item}
            onSave={onUpdate}
          />
        </CardFooter>
      )}
    </Card>
  )
}
