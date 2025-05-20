"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import RoadmapItemDialog from "./roadmap-item-dialog"

export default function RoadmapHeader() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // In a real implementation, check if the user has admin role
    if (user?.role === "admin") {
      setIsAdmin(true)
    }
  }, [user])

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Roadmap</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Explore our product roadmap to see what features we're planning, working on, and have recently completed.
            We're constantly improving CreaVibe based on your feedback.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsDialogOpen(true)} className="md:self-end">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        )}
      </div>

      {isAdmin && <RoadmapItemDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} mode="create" />}
    </div>
  )
}
