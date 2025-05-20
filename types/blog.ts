export interface Author {
  id: string
  name: string
  avatar: string
  role?: string // Author's role or position (optional)
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  updatedAt?: string // Date when the post was last updated (optional)
  author: Author
  tags: string[]
  category: string
}
