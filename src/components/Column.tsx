'use client'

import { Task, TaskStatus } from '@/types'
import TaskCard from './TaskCard'
import { motion, AnimatePresence } from 'framer-motion'

interface ColumnProps {
  status: TaskStatus
  tasks: Task[]
  onDrop: (e: React.DragEvent, status: TaskStatus) => void
  onDragOver: (e: React.DragEvent) => void
  onDragStart: (e: React.DragEvent, task: Task) => void
  onEditTask: (task: Task) => void
  draggedTask: Task | null
  onTouchStart?: (task: Task, e: React.TouchEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
  onTouchEnd?: (e: React.TouchEvent) => void
  touchDraggedTask?: Task | null
  onKeyboardMove?: (taskId: string, direction: 'left' | 'right') => void
}

const columnConfig = {
  todo: {
    title: 'Todo',
    bgColor: 'bg-card',
    headerColor: 'text-foreground',
    accent: 'bg-slate-500',
    borderColor: 'border-border',
    emoji: '📋',
  },
  'in-progress': {
    title: 'In Progress',
    bgColor: 'bg-card',
    headerColor: 'text-foreground',
    accent: 'bg-blue-500',
    borderColor: 'border-border',
    emoji: '🚀',
  },
  done: {
    title: 'Done',
    bgColor: 'bg-card',
    headerColor: 'text-foreground',
    accent: 'bg-green-500',
    borderColor: 'border-border',
    emoji: '✅',
  },
}

export default function Column({
  status,
  tasks,
  onDrop,
  onDragOver,
  onDragStart,
  onEditTask,
  draggedTask,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  touchDraggedTask,
  onKeyboardMove,
}: ColumnProps) {
  const config = columnConfig[status]

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDrop(e, status)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(e)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex-1 ${config.bgColor} rounded-lg p-4 sm:p-6 min-h-[500px] sm:min-h-[600px] 
        border ${config.borderColor} shadow-sm transition-all duration-200 ease-in-out
        ${(draggedTask && status !== draggedTask.status) ||
          (touchDraggedTask && status !== touchDraggedTask.status)
          ? 'ring-2 ring-accent bg-accent/10 transform scale-[1.02]' 
          : ''
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      data-column={status}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${config.accent} flex items-center justify-center text-white shadow-sm`}>
            <span className="text-base sm:text-lg">{config.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className={`text-lg sm:text-xl font-semibold ${config.headerColor} truncate`}>
              {config.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${config.accent} text-white text-xs sm:text-sm font-medium shadow-sm flex-shrink-0`}>
          {tasks.length}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskCard
                task={task}
                onDragStart={onDragStart}
                onEdit={onEditTask}
                isDragging={draggedTask?.id === task.id || touchDraggedTask?.id === task.id}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onKeyboardMove={onKeyboardMove}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <div className="text-6xl mb-4 opacity-50">{config.emoji}</div>
            <p className="text-lg font-medium mb-2">No tasks yet</p>
            <p className="text-sm">Drag tasks here or create a new one</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
