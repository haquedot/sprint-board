export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description: string
  priority: TaskPriority
}

export interface UpdateTaskData {
  status?: TaskStatus
  title?: string
  description?: string
  priority?: TaskPriority
}

export interface User {
  email: string
  token: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface UndoAction {
  taskId: string
  fromStatus: TaskStatus
  toStatus: TaskStatus
  timestamp: number
}
