export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'starter' | 'pro' | 'enterprise'
  transformsUsed: number
  billingDate: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalImage: string
  transformedImage: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  thumbnail?: string
  products: Product[]
  createdAt: string
  updatedAt: string
}

export interface Render {
  id: string
  projectId: string
  projectName: string
  template: 'modern' | 'classic' | 'minimal' | 'bold'
  thumbnail: string
  fullImage: string
  createdAt: string
}

export interface ShareLink {
  id: string
  projectId: string
  url: string
  qrCode: string
  createdAt: string
  viewCount: number
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'bold'

export interface TemplateOption {
  id: TemplateType
  name: string
  description: string
}
