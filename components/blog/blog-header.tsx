"use client"

import { BlogSearch } from "./blog-search"
import { BlogCategoryFilter } from "./blog-category-filter"

export function BlogHeader() {
  return (
    <div className="space-y-6 mb-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Explore the latest insights, tutorials, and updates on AI-powered content creation and collaboration.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <BlogSearch />
        <BlogCategoryFilter />
      </div>
    </div>
  )
}
