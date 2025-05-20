import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import the client component with SSR disabled
const ConfirmationContent = dynamic(
  () => import("./confirmation-content"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }
)

export default function SignupConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <ConfirmationContent />
    </div>
  )
}
