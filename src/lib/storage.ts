import { User } from '@/types'

export const localStorage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('auth_token')
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('auth_token', token)
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('auth_token')
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userData = window.localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('user_data', JSON.stringify(user))
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('user_data')
  },

  getTheme: (): 'light' | 'dark' | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('theme') as 'light' | 'dark' | null
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('theme', theme)
  },
}
