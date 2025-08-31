'use client'

import { Task } from '@/types'
import { getPriorityColor, formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TaskCardProps {
  task: Task
  onDragStart: (e: React.DragEvent, task: Task) => void
  onEdit: (task: Task) => void
  isDragging: boolean
  onTouchStart?: (task: Task, e: React.TouchEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
  onTouchEnd?: (e: React.TouchEvent) => void
}

export default function TaskCard({ 
  task, 
  onDragStart, 
  onEdit, 
  isDragging,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: TaskCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger edit when dragging
    if (!isDragging) {
      e.stopPropagation()
      onEdit(task)
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, task)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (onTouchStart) {
      onTouchStart(task, e)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (onTouchMove) {
      onTouchMove(e)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (onTouchEnd) {
      onTouchEnd(e)
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`group bg-card border border-border rounded-lg shadow-sm p-4 cursor-move hover:shadow-md transition-all duration-200 ${
          isDragging ? 'opacity-50 rotate-1 scale-105' : ''
        }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 flex-1 mr-3 leading-relaxed">
          {task.title}
        </h3>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority.toUpperCase()}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCardClick}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-foreground transition-all duration-200 bg-secondary rounded-md hover:bg-accent"
            title="Edit task"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">
          Created {formatDate(task.createdAt)}
        </span>
        <span className="text-muted-foreground bg-secondary px-2 py-1 rounded font-mono text-xs">
          #{task.id}
        </span>
      </div>
      </motion.div>
    </div>
  )
}
