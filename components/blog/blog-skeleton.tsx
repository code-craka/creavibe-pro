export function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="aspect-video bg-muted" />
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded bg-muted" />
                <div className="h-5 w-20 rounded bg-muted" />
              </div>
              <div className="h-6 w-full rounded bg-muted" />
              <div className="h-6 w-3/4 rounded bg-muted" />
            </div>
          </div>
          <div className="p-4 pt-0">
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
          <div className="p-4 pt-0">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="space-y-1">
                <div className="h-4 w-20 rounded bg-muted" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
