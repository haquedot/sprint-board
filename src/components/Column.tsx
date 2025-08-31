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
      className={`flex-1 ${config.bgColor} backdrop-blur-md rounded-2xl p-6 min-h-[600px] border-2 ${config.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.accent} flex items-center justify-center text-white shadow-lg`}>
            <span className="text-lg">{config.emoji}</span>
          </div>
          <div>
            <h2 className={`text-xl font-bold ${config.headerColor}`}>
              {config.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${config.accent} text-white text-sm font-medium shadow-md`}>
          {tasks.length}
        </div>
      </div>

      <div className="space-y-4">
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
                isDragging={draggedTask?.id === task.id}
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
