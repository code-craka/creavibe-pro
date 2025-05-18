import type { Metadata } from "next"
import ChangelogHeader from "@/components/changelog/changelog-header"
import ChangelogContent from "@/components/changelog/changelog-content"

export const metadata: Metadata = {
  title: "Changelog | Creavibe.pro",
  description: "Stay up to date with the latest features, improvements, and bug fixes for Creavibe.pro.",
}

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ChangelogHeader />
      <div className="mt-8">
        <ChangelogContent />
      </div>
    </div>
  )
}
