import { Skeleton } from "@/components/ui/skeleton"

export default function ChangelogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>

        <div className="md:col-span-3 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
