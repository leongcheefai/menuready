import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { MOCK_USER } from '../data/mockData'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, name: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('kyureto_auth')
    if (auth) {
      const parsed = JSON.parse(auth)
      setUser({
        ...MOCK_USER,
        name: parsed.name,
        email: parsed.email
      })
    }
  }, [])

  const login = (email: string, name: string) => {
    const userData: User = {
      ...MOCK_USER,
      email,
      name
    }
    localStorage.setItem('kyureto_auth', JSON.stringify({ email, name }))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('kyureto_auth')
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('kyureto_auth', JSON.stringify({
        email: updatedUser.email,
        name: updatedUser.name
      }))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
