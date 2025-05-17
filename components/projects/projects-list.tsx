import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { Eye, Clock } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string | null
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

interface ProjectsListProps {
  projects: Project[]
  loading: boolean
}

export function ProjectsList({ projects, loading }: ProjectsListProps) {
  // Create an array of 6 skeleton items for loading state
  const skeletonProjects = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading
        ? skeletonProjects.map((index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </CardFooter>
            </Card>
          ))
        : projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold truncate">{project.title}</CardTitle>
                <div className="flex items-center">
                  <Badge variant={project.status === "published" ? "default" : "secondary"} className="capitalize">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description || "No description provided"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/projects/${project.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}
