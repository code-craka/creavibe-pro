import { Suspense } from "react"
import { OnboardingContent } from "./onboarding-content"

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}
