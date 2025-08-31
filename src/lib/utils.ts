import { TaskPriority } from '@/types'

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-gradient-to-r from-neutral-600 to-neutral-700 text-white shadow-md'
    case 'medium':
      return 'bg-gradient-to-r from-neutral-500 to-neutral-600 text-white shadow-md'
    case 'low':
      return 'bg-gradient-to-r from-neutral-400 to-neutral-500 text-white shadow-md'
    default:
      return 'bg-gradient-to-r from-neutral-300 to-neutral-400 text-neutral-700 shadow-md'
  }
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
