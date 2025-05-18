import type { BlogPost, BlogAuthor } from "@/types/blog"

// Mock authors data
const authors: BlogAuthor[] = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/authors/alex-morgan.png",
    role: "Content Strategist",
    bio: "Alex specializes in content strategy and AI-powered content creation.",
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/authors/jamie-chen.png",
    role: "Product Manager",
    bio: "Jamie leads product development at Creavibe, focusing on user experience and innovation.",
  },
  {
    id: "3",
    name: "Taylor Wilson",
    avatar: "/authors/taylor-wilson.png",
    role: "AI Researcher",
    bio: "Taylor explores the cutting edge of AI in content creation and collaboration tools.",
  },
]

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: "ai-powered-content-creation-guide",
    title: "The Ultimate Guide to AI-Powered Content Creation",
    excerpt:
      "Learn how to leverage AI to streamline your content creation process and produce high-quality content at scale.",
    content: "Full content here...",
    coverImage: "/blog/ai-content-creation.png",
    publishedAt: "2023-11-15T09:00:00Z",
    updatedAt: "2023-11-15T09:00:00Z",
    author: authors[0],
    tags: ["AI", "Content Creation", "Productivity"],
    category: "Guides",
  },
  {
    slug: "collaboration-tools-comparison",
    title: "Comparing Top Collaboration Tools for Creative Teams",
    excerpt:
      "A detailed comparison of the leading collaboration tools for creative teams, including features, pricing, and use cases.",
    content: "Full content here...",
    coverImage: "/blog/collaboration-tools.png",
    publishedAt: "2023-11-10T10:30:00Z",
    updatedAt: "2023-11-12T14:15:00Z",
    author: authors[1],
    tags: ["Collaboration", "Tools", "Teams"],
    category: "Reviews",
  },
  {
    slug: "future-of-ai-content-generation",
    title: "The Future of AI in Content Generation: Trends to Watch",
    excerpt:
      "Explore emerging trends in AI-powered content generation and how they will shape the future of creative work.",
    content: "Full content here...",
    coverImage: "/blog/future-ai-trends.png",
    publishedAt: "2023-11-05T11:45:00Z",
    updatedAt: "2023-11-05T11:45:00Z",
    author: authors[2],
    tags: ["AI", "Trends", "Future"],
    category: "Insights",
  },
  {
    slug: "content-marketing-strategy-2024",
    title: "Building an Effective Content Marketing Strategy for 2024",
    excerpt:
      "Discover the key components of a successful content marketing strategy for the coming year, with actionable tips and examples.",
    content: "Full content here...",
    coverImage: "/blog/content-marketing-strategy.png",
    publishedAt: "2023-10-28T08:15:00Z",
    updatedAt: "2023-10-30T16:20:00Z",
    author: authors[0],
    tags: ["Content Marketing", "Strategy", "Planning"],
    category: "Guides",
  },
  {
    slug: "ai-ethics-content-creation",
    title: "Ethical Considerations in AI-Powered Content Creation",
    excerpt:
      "An exploration of the ethical challenges and considerations when using AI for content creation and how to address them.",
    content: "Full content here...",
    coverImage: "/blog/ai-ethics.png",
    publishedAt: "2023-10-20T13:30:00Z",
    updatedAt: "2023-10-20T13:30:00Z",
    author: authors[2],
    tags: ["AI", "Ethics", "Best Practices"],
    category: "Insights",
  },
  {
    slug: "real-time-collaboration-best-practices",
    title: "Best Practices for Real-Time Creative Collaboration",
    excerpt: "Learn how to maximize productivity and creativity when collaborating in real-time with your team.",
    content: "Full content here...",
    coverImage: "/blog/real-time-collaboration.png",
    publishedAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-10-16T09:45:00Z",
    author: authors[1],
    tags: ["Collaboration", "Productivity", "Teams"],
    category: "Best Practices",
  },
]

// Mock images for blog posts
const blogImages = [
  "/blog/ai-content-creation.png",
  "/blog/collaboration-tools.png",
  "/blog/future-ai-trends.png",
  "/blog/content-marketing-strategy.png",
  "/blog/ai-ethics.png",
  "/blog/real-time-collaboration.png",
]

// Mock author images
const authorImages = ["/authors/alex-morgan.png", "/authors/jamie-chen.png", "/authors/taylor-wilson.png"]

// Function to get all blog posts with optional filtering
export async function getBlogPosts({
  search = "",
  category = "",
}: {
  search?: string
  category?: string
}): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPosts = [...blogPosts]

  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter((post) => post.category === category)
  }

  // Sort by publish date (newest first)
  return filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Function to get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const post = blogPosts.find((post) => post.slug === slug)
  return post || null
}

// Function to get all unique categories
export async function getAllCategories(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const categories = new Set(blogPosts.map((post) => post.category))
  return Array.from(categories)
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
