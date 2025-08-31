'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { localStorage } from '@/lib/storage'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getTheme()
    if (savedTheme) {
      setTheme(savedTheme)
      // Apply immediately to prevent flash
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      localStorage.setTheme(systemTheme) // Save system preference
      // Apply immediately to prevent flash
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(systemTheme)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      
      // Remove both classes first
      root.classList.remove('light', 'dark')
      
      // Add the current theme class
      root.classList.add(theme)
      
      // Save to localStorage
      localStorage.setTheme(theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Don't prevent rendering - just provide the context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // During SSR or before context is ready, return safe defaults
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      mounted: false
    }
  }
  return context
}
