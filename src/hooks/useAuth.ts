'use client'

import { useState, useEffect } from 'react'
import { User, AuthState } from '@/types'
import { localStorage } from '@/lib/storage'

export const useAuth = (): AuthState & {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
} => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      // Small delay to prevent flickering and make loading feel natural
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const token = localStorage.getToken()
      const userData = localStorage.getUser()
      
      if (token && userData) {
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      
      setIsLoading(false) // Auth check complete
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - any non-empty email and password
    if (email.trim() && password.trim()) {
      const token = `mock_token_${Date.now()}`
      const userData: User = { email, token }
      
      localStorage.setToken(token)
      localStorage.setUser(userData)
      setUser(userData)
      setIsAuthenticated(true)
      
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeToken()
    localStorage.removeUser()
    setUser(null)
    setIsAuthenticated(false)
    // Force a redirect to login page
    window.location.href = '/login'
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
