import type { User, Project, Render, TemplateOption } from '../types'

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'pro',
  transformsUsed: 47,
  billingDate: '2026-01-15'
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Summer Menu',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    products: [
      {
        id: 'prod-1',
        name: 'Mango Smoothie',
        description: 'Fresh mango blended with coconut milk and a hint of lime',
        price: 8.50,
        originalImage: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop',
        createdAt: '2025-12-15'
      },
      {
        id: 'prod-2',
        name: 'Acai Bowl',
        description: 'Topped with granola, banana, and local honey',
        price: 12.00,
        originalImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop',
        createdAt: '2025-12-16'
      },
      {
        id: 'prod-3',
        name: 'Tropical Salad',
        description: 'Mixed greens with papaya, pineapple, and citrus dressing',
        price: 14.50,
        originalImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        createdAt: '2025-12-17'
      }
    ],
    createdAt: '2025-12-10',
    updatedAt: '2025-12-18'
  },
  {
    id: 'proj-2',
    name: 'Coffee Selection',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    products: [
      {
        id: 'prod-4',
        name: 'Espresso',
        description: 'Double shot of our signature house blend',
        price: 4.00,
        originalImage: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
        createdAt: '2025-12-14'
      },
      {
        id: 'prod-5',
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and velvety foam',
        price: 5.50,
        originalImage: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
        createdAt: '2025-12-14'
      }
    ],
    createdAt: '2025-12-12',
    updatedAt: '2025-12-17'
  },
  {
    id: 'proj-3',
    name: 'Weekend Brunch',
    thumbnail: undefined,
    products: [],
    createdAt: '2025-12-18',
    updatedAt: '2025-12-18'
  }
]

export const MOCK_RENDERS: Render[] = [
  {
    id: 'render-1',
    projectId: 'proj-1',
    projectName: 'Summer Menu',
    template: 'modern',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=1000&fit=crop',
    createdAt: '2025-12-17'
  },
  {
    id: 'render-2',
    projectId: 'proj-1',
    projectName: 'Summer Menu',
    template: 'classic',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=1000&fit=crop',
    createdAt: '2025-12-17'
  },
  {
    id: 'render-3',
    projectId: 'proj-2',
    projectName: 'Coffee Selection',
    template: 'minimal',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=500&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop',
    createdAt: '2025-12-18'
  },
  {
    id: 'render-4',
    projectId: 'proj-2',
    projectName: 'Coffee Selection',
    template: 'bold',
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=500&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=1000&fit=crop',
    createdAt: '2025-12-18'
  }
]

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, sans-serif typography' },
  { id: 'classic', name: 'Classic', description: 'Traditional elegance with serif fonts' },
  { id: 'minimal', name: 'Minimal', description: 'Whitespace focused, less is more' },
  { id: 'bold', name: 'Bold', description: 'High contrast, impactful design' }
]
