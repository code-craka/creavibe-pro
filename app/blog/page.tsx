import { Suspense } from "react"
import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogSkeleton } from "@/components/blog/blog-skeleton"

export const metadata: Metadata = {
  title: "Blog | Creavibe.pro",
  description: "Explore the latest insights, tutorials, and updates on AI-powered content creation and collaboration.",
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : ""
  const category = typeof searchParams.category === "string" ? searchParams.category : ""

  return (
    <div className="container max-w-7xl py-10">
      {/* Pass search params to BlogHeader as props instead of using useSearchParams directly */}
      <BlogHeader initialSearch={search} initialCategory={category} />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogGrid search={search} category={category} />
      </Suspense>
    </div>
  )
}
