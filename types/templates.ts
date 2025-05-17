export interface TemplateCategory {
  id: string
  name: string
  description?: string
}

export interface Template {
  id: string
  title: string
  description: string
  content: string
  category: TemplateCategory
  imageUrl: string
  createdAt: string
  updatedAt: string
}
