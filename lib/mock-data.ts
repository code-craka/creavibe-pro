import type { Template, TemplateCategory } from "@/types/templates"

// Template categories
export const templateCategories: TemplateCategory[] = [
  {
    id: "blog",
    name: "Blog",
    description: "Templates for blog posts, articles, and long-form content",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Templates for social media posts, captions, and stories",
  },
  {
    id: "email",
    name: "Email",
    description: "Templates for email marketing, newsletters, and outreach",
  },
  {
    id: "ads",
    name: "Ads",
    description: "Templates for digital ads, landing pages, and promotional content",
  },
]

// Mock templates data
export const mockTemplates: Template[] = [
  {
    id: "template-1",
    title: "Blog Post Introduction",
    description: "A compelling introduction for your blog posts that hooks readers and sets the tone for your article.",
    content:
      "# [Blog Title]\n\nHave you ever wondered about [topic]? In this article, we'll explore [main point] and discover how [benefit]. By the end, you'll understand [key takeaway].\n\n## Introduction\n\n[Start with a hook - question, statistic, or story]",
    category: templateCategories[0], // Blog
    imageUrl: "/blog-post-template.png",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "template-2",
    title: "Instagram Caption",
    description: "Engaging Instagram captions that drive likes, comments, and shares for your posts.",
    content:
      "✨ [Brief description of your image/post]\n\n[Main message or story - 1-2 sentences]\n\n[Call to action - ask a question or prompt engagement]\n\n.\n.\n.\n\n#[hashtag1] #[hashtag2] #[hashtag3] #[hashtag4] #[hashtag5]",
    category: templateCategories[1], // Social Media
    imageUrl: "/instagram-post-template.png",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "template-3",
    title: "Email Newsletter",
    description: "Professional email newsletter template with sections for main content, news, and promotions.",
    content:
      "Subject: [Compelling Subject Line]\n\nHi [Name],\n\nHope you're doing well! Here's what's new this week:\n\n## [Main Story/Update]\n\n[2-3 sentences about your main update]\n\n## [Secondary News/Tips]\n\n- [Bullet point 1]\n- [Bullet point 2]\n- [Bullet point 3]\n\n## [Call to Action]\n\n[Brief CTA with link]\n\nBest regards,\n[Your Name]\n[Your Company]",
    category: templateCategories[2], // Email
    imageUrl: "/email-newsletter-template.png",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
    updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days ago
  },
  {
    id: "template-4",
    title: "Facebook Ad Copy",
    description: "Persuasive ad copy for Facebook campaigns that drives clicks and conversions.",
    content:
      "🔥 [Attention-grabbing headline]\n\n[Problem statement - what pain point does your product solve?]\n\nIntroducing [Product/Service]: [Brief solution description]\n\n✅ [Benefit 1]\n✅ [Benefit 2]\n✅ [Benefit 3]\n\n[Social proof or testimonial]\n\n[Strong call to action with urgency] 👇\n[Link]",
    category: templateCategories[3], // Ads
    imageUrl: "/placeholder.svg?height=400&width=600&query=facebook ad template with product image",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "template-5",
    title: "Product Review Blog",
    description: "Structured template for writing comprehensive and engaging product reviews.",
    content:
      "# [Product Name] Review: [Brief Verdict]\n\n## Introduction\n\n[Set the context for why this product matters]\n\n## First Impressions\n\n[Describe packaging, design, and initial thoughts]\n\n## Key Features\n\n### [Feature 1]\n[Description and experience]\n\n### [Feature 2]\n[Description and experience]\n\n### [Feature 3]\n[Description and experience]\n\n## Pros and Cons\n\n### What I Liked\n- [Pro 1]\n- [Pro 2]\n- [Pro 3]\n\n### What Could Be Improved\n- [Con 1]\n- [Con 2]\n\n## Verdict\n\n[Final thoughts and recommendation]",
    category: templateCategories[0], // Blog
    imageUrl: "/placeholder.svg?height=400&width=600&query=product review blog template with sections",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    id: "template-6",
    title: "LinkedIn Post",
    description: "Professional LinkedIn posts that establish thought leadership and drive engagement.",
    content:
      "I'm excited to share [announcement/insight/achievement]!\n\n[Main content - 3-4 paragraphs with line breaks between them. Focus on providing value, sharing insights, or telling a story.]\n\nThe key takeaways:\n\n1. [Point 1]\n2. [Point 2]\n3. [Point 3]\n\n[Call to action - what should readers do next?]\n\n#[hashtag1] #[hashtag2] #[hashtag3]",
    category: templateCategories[1], // Social Media
    imageUrl: "/placeholder.svg?height=400&width=600&query=linkedin post template with professional layout",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "template-7",
    title: "Welcome Email Sequence",
    description: "A series of welcome emails to onboard new subscribers or customers to your product or service.",
    content:
      "Subject: Welcome to [Company/Product] - Let's Get Started!\n\nHi [Name],\n\nThank you for joining [Company/Product]! We're thrilled to have you on board.\n\nHere's what you can expect over the next few days:\n\n1. Today: Quick start guide and essential tips\n2. Tomorrow: Exploring key features\n3. Day 3: Advanced strategies and best practices\n4. Day 5: Special offer for new members\n\nLet's start with the basics:\n\n[Brief introduction to first steps or quick wins]\n\n[Call to action button/link]\n\nIf you have any questions, simply reply to this email. We're here to help!\n\nBest regards,\n[Your Name]\n[Your Company]",
    category: templateCategories[2], // Email
    imageUrl: "/placeholder.svg?height=400&width=600&query=welcome email template with colorful design",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
  },
  {
    id: "template-8",
    title: "Google Ad Copy",
    description: "Optimized Google Ads copy with headline and description variations for maximum performance.",
    content:
      "# Google Ad Template\n\n## Headlines (30 characters max each)\n1. [Main benefit or offer]\n2. [Unique selling proposition]\n3. [Call to action with urgency]\n4. [Question addressing pain point]\n5. [Social proof or credibility]\n\n## Descriptions (90 characters max each)\n1. [Expand on main benefit + call to action]\n2. [Features and additional benefits + call to action]\n\n## Final URL\n[Landing page URL]\n\n## Display Path\n[website.com]/[relevant-keyword]",
    category: templateCategories[3], // Ads
    imageUrl: "/placeholder.svg?height=400&width=600&query=google ads template with search results",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
  {
    id: "template-9",
    title: "How-To Tutorial",
    description: "Step-by-step tutorial template for teaching processes, skills, or techniques to your audience.",
    content:
      "# How to [Accomplish Task/Skill] in [Number] Simple Steps\n\n## Introduction\n\n[Brief overview of what readers will learn and why it matters]\n\n## What You'll Need\n\n- [Item/Tool/Resource 1]\n- [Item/Tool/Resource 2]\n- [Item/Tool/Resource 3]\n\n## Step 1: [First Step Title]\n\n[Detailed explanation of first step]\n\n[Pro tip or common mistake to avoid]\n\n## Step 2: [Second Step Title]\n\n[Detailed explanation of second step]\n\n[Pro tip or common mistake to avoid]\n\n## Step 3: [Third Step Title]\n\n[Detailed explanation of third step]\n\n[Pro tip or common mistake to avoid]\n\n## Common Troubleshooting\n\n- [Issue 1]: [Solution]\n- [Issue 2]: [Solution]\n\n## Conclusion\n\n[Recap of what was learned and next steps]",
    category: templateCategories[0], // Blog
    imageUrl: "/placeholder.svg?height=400&width=600&query=tutorial blog post template with steps",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
]
