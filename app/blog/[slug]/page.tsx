import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | CreaVibe Blog",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | CreaVibe Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(params.slug, 3)

  // Calculate estimated reading time (rough estimate)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)) // Assuming 200 words per minute

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/blog">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">{post.author.role || "Author"}</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>

        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>

        <div className="prose prose-purple max-w-none">
          {/* In a real app, you would render the markdown/html content here */}
          <p className="lead">{post.excerpt}</p>
          <p>
            This is a placeholder for the full blog post content. In a real implementation, you would render the
            markdown or HTML content of the blog post here.
          </p>
          <p>
            The content would be formatted with proper headings, paragraphs, lists, code blocks, and other rich text
            elements.
          </p>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <h3 className="font-bold line-clamp-2">{relatedPost.title}</h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
