import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyPolicyLoading() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="space-y-8">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>

        {/* Introduction section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <div className="border rounded-lg p-6 mt-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          </div>
        </div>

        {/* What Data We Collect section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <div className="space-y-2 mt-4">
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Additional sections */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="border rounded-lg p-4">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="border-t pt-8 mt-12">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      </div>
    </div>
  )
}
