import Link from "next/link"
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostNotFound() {
  return (
    <div className="container max-w-4xl py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <FileX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Article Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          The blog post you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex gap-4">
          <Link href="/blog">
            <Button>Browse All Articles</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
