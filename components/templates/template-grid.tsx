"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Template } from "@/types/templates"
import { getCategoryColor } from "@/lib/utils"
import Image from "next/image"

interface TemplateGridProps {
  templates: Template[]
  loading: boolean
  onUseTemplate: (templateId: string) => void
}

export function TemplateGrid({ templates, loading, onUseTemplate }: TemplateGridProps) {
  // Create an array of 9 skeleton items for loading state
  const skeletonTemplates = Array.from({ length: 9 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? skeletonTemplates.map((index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="relative aspect-[16/9] w-full bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="flex-1 p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))
        : templates.map((template) => (
            <Card key={template.id} className="overflow-hidden flex flex-col transition-all hover:shadow-md">
              <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
                <Image
                  src={template.imageUrl || "/placeholder.svg"}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{template.title}</h3>
                  <Badge variant="outline" className={`ml-2 shrink-0 ${getCategoryColor(template.category.id)}`}>
                    {template.category.name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{template.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full" onClick={() => onUseTemplate(template.id)}>
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}
