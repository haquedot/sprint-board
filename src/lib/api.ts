import { Task, CreateTaskData, UpdateTaskData } from '@/types'
import { localStorage } from './storage'

// Default mock data - will be loaded only if localStorage is empty
const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Wire nav",
    description: "Sketch top nav",
    status: "todo",
    priority: "medium",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "2",
    title: "Design user interface",
    description: "Create mockups for the main dashboard",
    status: "todo",
    priority: "high",
    createdAt: "2025-01-01T11:00:00Z",
    updatedAt: "2025-01-01T11:00:00Z"
  },
  {
    id: "3",
    title: "Setup database",
    description: "Configure database connections and models",
    status: "in-progress",
    priority: "high",
    createdAt: "2025-01-01T12:00:00Z",
    updatedAt: "2025-01-01T12:00:00Z"
  },
  {
    id: "4",
    title: "Write unit tests",
    description: "Add comprehensive test coverage",
    status: "in-progress",
    priority: "medium",
    createdAt: "2025-01-01T13:00:00Z",
    updatedAt: "2025-01-01T13:00:00Z"
  },
  {
    id: "5",
    title: "Deploy to staging",
    description: "Set up staging environment",
    status: "done",
    priority: "low",
    createdAt: "2025-01-01T14:00:00Z",
    updatedAt: "2025-01-01T14:00:00Z"
  }
]

// Helper function to get tasks from localStorage or initialize with defaults
const getTasks = (): Task[] => {
  const storedTasks = localStorage.getTasks()
  if (storedTasks.length === 0) {
    localStorage.setTasks(defaultTasks)
    return [...defaultTasks]
  }
  return storedTasks
}

// Helper function to save tasks to localStorage
const saveTasks = (tasks: Task[]): void => {
  localStorage.setTasks(tasks)
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// More sophisticated failure simulation
const shouldFail = (operation: 'read' | 'write' = 'read') => {
  // Disable failures in development for easier testing
  if (process.env.NODE_ENV === 'development') return false
  
  // Much lower failure rate for read operations (like getTasks)
  // Higher failure rate for write operations (create/update) to test optimistic updates
  const failureRate = operation === 'read' ? 0.01 : 0.05 // 1% for reads, 5% for writes
  return Math.random() < failureRate
}

export const taskAPI = {
  getTasks: async (): Promise<Task[]> => {
    await delay(200) // Simulate network delay
    
    if (shouldFail('read')) {
      throw new Error('Failed to fetch tasks')
    }
    
    return getTasks() // Return tasks from localStorage
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    await delay(300)
    
    if (shouldFail('write')) {
      throw new Error('Failed to create task')
    }
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const currentTasks = getTasks()
    currentTasks.push(newTask)
    saveTasks(currentTasks)
    return newTask
  },

  updateTask: async (id: string, updates: UpdateTaskData): Promise<Task> => {
    await delay(250)
    
    if (shouldFail('write')) {
      throw new Error('Failed to update task')
    }
    
    const currentTasks = getTasks()
    const taskIndex = currentTasks.findIndex((task: Task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    const updatedTask = {
      ...currentTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    currentTasks[taskIndex] = updatedTask
    saveTasks(currentTasks)
    return updatedTask
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay(200)
    
    if (shouldFail('write')) {
      throw new Error('Failed to delete task')
    }
    
    const currentTasks = getTasks()
    const taskIndex = currentTasks.findIndex((task: Task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    currentTasks.splice(taskIndex, 1)
    saveTasks(currentTasks)
  },
}
