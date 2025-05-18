import { BlogHeader } from "@/components/blog/blog-header"
import { BlogSkeleton } from "@/components/blog/blog-skeleton"

export default function Loading() {
  return (
    <div className="container max-w-7xl py-10">
      <BlogHeader />
      <BlogSkeleton />
    </div>
  )
}
