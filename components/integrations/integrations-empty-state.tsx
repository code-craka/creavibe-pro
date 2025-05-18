import { Button } from "@/components/ui/button"
import { PackageSearch } from "lucide-react"

export function IntegrationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <PackageSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No integrations found</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        We couldn't find any integrations matching your search criteria. Try adjusting your filters or search term.
      </p>
      <Button className="mt-4" variant="outline">
        Clear filters
      </Button>
    </div>
  )
}
