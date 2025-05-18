export interface Integration {
  id: string
  name: string
  description: string
  iconUrl: string
  categories: string[]
  isConnected: boolean
  isNew?: boolean
  isPopular?: boolean
}
