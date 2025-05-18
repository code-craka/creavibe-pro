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
}

export interface WebBookFormValues {
  title: string
  description: string
  coverImage?: string
  visibility: "public" | "private"
}
