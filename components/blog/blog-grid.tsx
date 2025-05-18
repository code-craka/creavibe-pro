import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getBlogPosts } from "@/lib/blog-service"
import { BlogEmptyState } from "./blog-empty-state"

export async function BlogGrid({
  search,
  category,
}: {
  search: string
  category: string
}) {
  const posts = await getBlogPosts({ search, category })

  if (posts.length === 0) {
    return <BlogEmptyState search={search} category={category} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <time className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</time>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
