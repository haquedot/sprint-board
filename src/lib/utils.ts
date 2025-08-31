import { TaskPriority } from '@/types'

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500 text-white text-xs px-2 py-1'
    case 'medium':
      return 'bg-yellow-500 text-white text-xs px-2 py-1'
    case 'low':
      return 'bg-green-500 text-white text-xs px-2 py-1'
    default:
      return 'bg-gray-500 text-white text-xs px-2 py-1'
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
