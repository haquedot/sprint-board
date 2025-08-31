'use client'

import { useState, useMemo } from 'react'
import { Task, TaskStatus, TaskPriority, UpdateTaskData } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { useTasks } from '@/hooks/useTasks'
import { useTheme } from '@/components/ThemeProvider'
import AuthGuard from '@/components/AuthGuard'
import Column from '@/components/Column'
import CreateTaskModal from '@/components/CreateTaskModal'
import EditTaskModal from '@/components/EditTaskModal'
import SearchAndFilter from '@/components/SearchAndFilter'
import UndoToast from '@/components/UndoToast'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp'
import { motion } from 'framer-motion'

export default function BoardPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, mounted } = useTheme()
  const {
    tasks,
    loading,
    error,
    undoAction,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    undoMove,
    clearError,
  } = useTasks()

  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  
  // Touch drag state
  const [touchDraggedTask, setTouchDraggedTask] = useState<Task | null>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [isDraggingTouch, setIsDraggingTouch] = useState(false)

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      return matchesSearch && matchesPriority
    })
  }, [tasks, searchTerm, priorityFilter])

  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter((task) => task.status === 'todo'),
      'in-progress': filteredTasks.filter((task) => task.status === 'in-progress'),
      done: filteredTasks.filter((task) => task.status === 'done'),
    }
  }, [filteredTasks])

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.setData('text/plain', task.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null)
      return
    }

    await moveTask(draggedTask.id, newStatus)
    setDraggedTask(null)
  }

  // Touch drag handlers
  const handleTouchStart = (task: Task, e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchDraggedTask(task)
    setDragPosition({ x: touch.clientX, y: touch.clientY })
    setIsDraggingTouch(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDraggedTask || !isDraggingTouch) return
    
    e.preventDefault()
    const touch = e.touches[0]
    setDragPosition({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = async (e: React.TouchEvent) => {
    if (!touchDraggedTask || !isDraggingTouch) return

    const touch = e.changedTouches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // Find the column element
    const columnElement = elementBelow?.closest('[data-column]')
    const newStatus = columnElement?.getAttribute('data-column') as TaskStatus
    
    if (newStatus && newStatus !== touchDraggedTask.status) {
      await moveTask(touchDraggedTask.id, newStatus)
    }

    setTouchDraggedTask(null)
    setIsDraggingTouch(false)
    setDragPosition({ x: 0, y: 0 })
  }

  const handleUndoMove = async () => {
    await undoMove()
  }

  const handleKeyboardMove = async (taskId: string, direction: 'left' | 'right') => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const statusOrder: TaskStatus[] = ['todo', 'in-progress', 'done']
    const currentIndex = statusOrder.indexOf(task.status)
    
    let newIndex: number
    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - 1)
    } else {
      newIndex = Math.min(statusOrder.length - 1, currentIndex + 1)
    }
    
    const newStatus = statusOrder[newIndex]
    if (newStatus !== task.status) {
      await moveTask(taskId, newStatus)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleUpdateTask = async (taskId: string, updates: UpdateTaskData): Promise<boolean> => {
    return await updateTask(taskId, updates)
  }

  const handleDeleteTask = async (taskId: string): Promise<boolean> => {
    return await deleteTask(taskId)
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="h-8 bg-muted rounded-lg w-64 animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
            </motion.div>
            <LoadingSkeleton />
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl font-bold text-foreground truncate"
                >
                  Sprint Board Lite
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs sm:text-sm text-muted-foreground mt-1 truncate"
                >
                  Welcome back, <span className="font-medium text-foreground">{user?.email}</span>
                </motion.p>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1 sm:space-x-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">New Task</span>
                  <span className="sm:hidden">New</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  disabled={!mounted}
                  className="p-2 sm:p-3 text-muted-foreground hover:text-foreground transition-all duration-200 disabled:opacity-50 bg-secondary rounded-lg shadow-sm hover:shadow-md border border-border"
                  title={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Loading theme...'}
                >
                  {mounted ? (
                    theme === 'light' ? (
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )
                  ) : (
                    <div className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse bg-muted rounded"></div>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="text-muted-foreground hover:text-red-500 text-xs sm:text-sm transition-all duration-200 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/10 backdrop-blur-sm border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 px-4 sm:px-6 py-4 rounded-xl mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-sm">{error}</span>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <button
                  onClick={() => {
                    clearError()
                    fetchTasks()
                  }}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 text-sm font-medium transition-colors duration-200"
                >
                  Retry
                </button>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600 transition-colors duration-200"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            <Column
              status="todo"
              tasks={tasksByStatus.todo}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onEditTask={handleEditTask}
              draggedTask={draggedTask}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              touchDraggedTask={touchDraggedTask}
              onKeyboardMove={handleKeyboardMove}
            />
            <Column
              status="in-progress"
              tasks={tasksByStatus['in-progress']}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onEditTask={handleEditTask}
              draggedTask={draggedTask}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              touchDraggedTask={touchDraggedTask}
              onKeyboardMove={handleKeyboardMove}
            />
            <Column
              status="done"
              tasks={tasksByStatus.done}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onEditTask={handleEditTask}
              draggedTask={draggedTask}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              touchDraggedTask={touchDraggedTask}
              onKeyboardMove={handleKeyboardMove}
            />
          </motion.div>
        </main>

        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={createTask}
        />

        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingTask(null)
          }}
          task={editingTask}
          onSubmit={handleUpdateTask}
          onDelete={handleDeleteTask}
        />

        <UndoToast
          isVisible={!!undoAction}
          onUndo={handleUndoMove}
          onDismiss={() => undoMove()}
        />

        <KeyboardShortcutsHelp />
      </div>
    </AuthGuard>
  )
}
