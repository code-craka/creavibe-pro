import type { BlogPost } from "@/types/blog"

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Leveraging AI for Content Creation: A Comprehensive Guide",
    slug: "leveraging-ai-for-content-creation",
    excerpt: "Discover how AI-powered tools can revolutionize your content creation workflow and boost productivity.",
    content: "Full article content here...",
    coverImage: "/blog/ai-content-creation.png",
    publishedAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-11-01T14:30:00Z",
    author: {
      id: "1",
      name: "Alex Morgan",
      avatar: "/authors/alex-morgan.png",
      role: "AI Research Lead"
    },
    tags: ["AI", "Content Creation", "Productivity"],
    category: "AI",
  },
  {
    id: "2",
    title: "Real-time Collaboration Tools for Remote Teams",
    slug: "real-time-collaboration-tools",
    excerpt: "Explore the best real-time collaboration tools that can help your remote team work together effectively.",
    content: "Full article content here...",
    coverImage: "/blog/collaboration-tools.png",
    publishedAt: "2023-09-28T14:30:00Z",
    updatedAt: "2023-10-15T09:45:00Z",
    author: {
      id: "2",
      name: "Jamie Chen",
      avatar: "/authors/jamie-chen.png",
      role: "Product Manager"
    },
    tags: ["Collaboration", "Remote Work", "Tools"],
    category: "Collaboration",
  },
  {
    id: "3",
    title: "The Future of AI in Content Marketing",
    slug: "future-of-ai-in-content-marketing",
    excerpt: "Learn about emerging AI trends that will shape the future of content marketing in the coming years.",
    content: "Full article content here...",
    coverImage: "/blog/future-ai-trends.png",
    publishedAt: "2023-09-10T09:15:00Z",
    updatedAt: "2023-09-25T11:20:00Z",
    author: {
      id: "3",
      name: "Taylor Wilson",
      avatar: "/authors/taylor-wilson.png",
      role: "Content Strategist"
    },
    tags: ["AI", "Content Marketing", "Trends"],
    category: "Marketing",
  },
  // Add more blog posts as needed
]

export async function getBlogPosts(search = "", category = ""): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return blogPosts.filter((post) => {
    const matchesSearch = search
      ? post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      : true

    const matchesCategory = category
      ? post.category.toLowerCase() === category.toLowerCase() ||
        post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
      : true

    return matchesSearch && matchesCategory
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const post = blogPosts.find((post) => post.slug === slug)
  return post || null
}

export async function getAllCategories(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const categories = new Set<string>()
  blogPosts.forEach((post) => {
    categories.add(post.category)
    post.tags.forEach((tag) => categories.add(tag))
  })

  return Array.from(categories).sort()
}

// Function to get related posts
export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const currentPost = blogPosts.find((post) => post.slug === currentSlug)

  if (!currentPost) {
    return []
  }

  // Find posts with similar tags or in the same category
  const relatedPosts = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      // Calculate relevance score based on shared tags and category
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length
      const sameCategory = post.category === currentPost.category ? 1 : 0

      return {
        ...post,
        relevanceScore: sharedTags + sameCategory,
      }
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)

  return relatedPosts
}
