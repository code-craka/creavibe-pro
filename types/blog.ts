export interface Author {
  id: string
  name: string
  avatar: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  author: Author
  tags: string[]
  category: string
}
