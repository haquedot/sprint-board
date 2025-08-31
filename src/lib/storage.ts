import { User, Task } from '@/types'

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

  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return []
    const tasksData = window.localStorage.getItem('sprint_board_tasks')
    return tasksData ? JSON.parse(tasksData) : []
  },

  setTasks: (tasks: Task[]): void => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('sprint_board_tasks', JSON.stringify(tasks))
  },

  clearTasks: (): void => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('sprint_board_tasks')
  },

  clearAllData: (): void => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('sprint_board_tasks')
    window.localStorage.removeItem('auth_token')
    window.localStorage.removeItem('user_data')
    window.localStorage.removeItem('theme')
  },
}
