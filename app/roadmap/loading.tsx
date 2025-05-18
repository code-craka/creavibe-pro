import { Skeleton } from "@/components/ui/skeleton"

export default function RoadmapLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-10">
        <Skeleton className="h-10 w-[250px] mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, colIndex) => (
          <div key={colIndex} className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </div>

            <div className="p-4 space-y-4">
              {Array.from({ length: 2 }).map((_, cardIndex) => (
                <div key={cardIndex} className="border rounded-lg p-4">
                  <Skeleton className="h-5 w-[80%] mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
