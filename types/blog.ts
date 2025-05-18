export interface BlogAuthor {
  id: string
  name: string
  avatar: string
  role: string
  bio: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  updatedAt: string
  author: BlogAuthor
  tags: string[]
  category: string
  relevanceScore?: number
}
