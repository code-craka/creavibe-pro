export type GenerationType = "blog" | "image" | "video"
export type ToneStyle = "professional" | "casual" | "technical" | "friendly" | "persuasive"

export interface Generation {
  id: string
  type: GenerationType
  timestamp: Date
  prompt: string
  tone?: ToneStyle
  result: string | string[] // String for text, URL for images
  metadata?: Record<string, any>
}

export interface BlogGenerationParams {
  title: string
  topic: string
  tone: ToneStyle
  keywords?: string[]
}

export interface ImageGenerationParams {
  description: string
  style: string
  size?: string
  aspectRatio?: string
}

export interface VideoScriptGenerationParams {
  topic: string
  duration: string
  tone: ToneStyle
  targetAudience?: string
}
