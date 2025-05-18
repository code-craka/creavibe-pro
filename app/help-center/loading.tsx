import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <Skeleton className="h-12 w-full max-w-3xl mx-auto mb-16 rounded-lg" />

      <Skeleton className="h-8 w-48 mx-auto mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md" />
          ))}
      </div>

      <Skeleton className="h-96 w-full rounded-lg mb-16" />

      <Skeleton className="h-8 w-48 mx-auto mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
      </div>
    </div>
  )
}
