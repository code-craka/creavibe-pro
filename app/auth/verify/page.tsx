import { Suspense } from "react"
import { VerifyContent } from "./verify-content"

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
