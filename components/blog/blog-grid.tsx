import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlogEmptyState } from "./blog-empty-state"
import { getBlogPosts } from "@/lib/blog-service"

interface BlogGridProps {
  search: string
  category: string
}

export async function BlogGrid({ search, category }: BlogGridProps) {
  const posts = await getBlogPosts(search, category)

  if (posts.length === 0) {
    return <BlogEmptyState search={search} category={category} />
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader className="p-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
