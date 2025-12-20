import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Project, Product, Render } from '../types'
import { MOCK_PROJECTS, MOCK_RENDERS } from '../data/mockData'

interface ProjectContextType {
  projects: Project[]
  renders: Render[]

  // Project CRUD
  createProject: (name: string) => Project
  updateProject: (id: string, data: Partial<Project>) => void
  deleteProject: (id: string) => void
  getProject: (id: string) => Project | undefined

  // Product CRUD
  addProduct: (projectId: string, product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (projectId: string, productId: string, data: Partial<Product>) => void
  removeProduct: (projectId: string, productId: string) => void

  // Renders
  addRender: (render: Omit<Render, 'id' | 'createdAt'>) => void
  deleteRender: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [renders, setRenders] = useState<Render[]>(MOCK_RENDERS)

  const createProject = (name: string): Project => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      products: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setProjects(prev => [...prev, newProject])
    return newProject
  }

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects(prev => prev.map(p =>
      p.id === id
        ? { ...p, ...data, updatedAt: new Date().toISOString().split('T')[0] }
        : p
    ))
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    setRenders(prev => prev.filter(r => r.projectId !== id))
  }

  const getProject = (id: string) => {
    return projects.find(p => p.id === id)
  }

  const addProduct = (projectId: string, product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? {
            ...p,
            products: [...p.products, newProduct],
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : p
    ))
  }

  const updateProduct = (projectId: string, productId: string, data: Partial<Product>) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? {
            ...p,
            products: p.products.map(prod =>
              prod.id === productId ? { ...prod, ...data } : prod
            ),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : p
    ))
  }

  const removeProduct = (projectId: string, productId: string) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? {
            ...p,
            products: p.products.filter(prod => prod.id !== productId),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : p
    ))
  }

  const addRender = (render: Omit<Render, 'id' | 'createdAt'>) => {
    const newRender: Render = {
      ...render,
      id: `render-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setRenders(prev => [...prev, newRender])
  }

  const deleteRender = (id: string) => {
    setRenders(prev => prev.filter(r => r.id !== id))
  }

  return (
    <ProjectContext.Provider value={{
      projects,
      renders,
      createProject,
      updateProject,
      deleteProject,
      getProject,
      addProduct,
      updateProduct,
      removeProduct,
      addRender,
      deleteRender
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
