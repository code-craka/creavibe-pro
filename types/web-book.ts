export interface WebBook {
  id: string
  title: string
  description: string
  coverImage?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  chapterCount: number
  createdAt: string
  updatedAt: string
  isPublished: boolean
  visibility: "public" | "private" | "restricted"
  // Added missing properties used in components
  chapters: WebBookChapter[]
  fontSize?: number
  fontFamily?: string
}

export interface WebBookChapter {
  id: string
  title: string
  content: string
  order: number
  sections?: WebBookSection[]
}

export interface WebBookSection {
  id: string
  title: string
  content: string
  order: number
}

export interface WebBookFormValues {
  title: string
  description: string
  coverImage?: string
  visibility: "public" | "private"
}
