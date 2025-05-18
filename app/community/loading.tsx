import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center">
        <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-8" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <Skeleton className="h-96 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>

      <div className="mt-16 mb-16">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
        </div>
      </div>

      <Skeleton className="h-64 rounded-lg" />
    </div>
  )
}
