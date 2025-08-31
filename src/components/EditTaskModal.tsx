'use client'

import { useState, useEffect } from 'react'
import { Task, UpdateTaskData, TaskPriority } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

interface EditTaskModalProps {
  isOpen: boolean
  task: Task | null
  onClose: () => void
  onSubmit: (taskId: string, updates: UpdateTaskData) => Promise<boolean>
  onDelete: (taskId: string) => Promise<boolean>
}

export default function EditTaskModal({ isOpen, task, onClose, onSubmit, onDelete }: EditTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setPriority(task.priority)
      setError('')
      setShowDeleteConfirm(false)
    }
  }, [task])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task || !title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    setError('')

    const success = await onSubmit(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
    })

    if (success) {
      onClose()
    } else {
      setError('Failed to update task. Please try again.')
    }

    setLoading(false)
  }

  const handleDelete = async () => {
    if (!task) return
    
    setLoading(true)
    const success = await onDelete(task.id)
    
    if (success) {
      onClose()
    } else {
      setError('Failed to delete task. Please try again.')
    }
    
    setLoading(false)
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setError('')
    setShowDeleteConfirm(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && task && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-card rounded-xl shadow-2xl border border-border overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                        <svg className="h-6 w-6 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold leading-6 text-foreground">
                          Edit Task
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Update task details and status
                        </p>
                      </div>
                    </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-semibold text-foreground mb-2">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        id="edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 sm:py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground transition-all duration-200 shadow-sm text-sm sm:text-base"
                        placeholder="Enter task title"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="edit-description" className="block text-sm font-semibold text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 sm:py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground transition-all duration-200 shadow-sm resize-none text-sm sm:text-base"
                        placeholder="Describe what needs to be done (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="edit-priority" className="block text-sm font-semibold text-foreground mb-2">
                        Priority Level
                      </label>
                      <select
                        id="edit-priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as TaskPriority)}
                        className="w-full px-4 py-3 sm:py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground transition-all duration-200 shadow-sm text-sm sm:text-base custom-select cursor-pointer"
                      >
                        <option value="low">⚪ Low Priority</option>
                        <option value="medium">⚫ Medium Priority</option>
                        <option value="high">⚫ High Priority</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="order-2 sm:order-1">
                    {!showDeleteConfirm ? (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full sm:w-auto inline-flex justify-center items-center space-x-2 rounded-lg border border-red-300 dark:border-red-600 bg-card px-4 py-2 sm:py-3 text-sm font-medium text-red-700 dark:text-red-400 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete Task</span>
                      </button>
                    ) : (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          type="button"
                          onClick={handleDelete}
                          disabled={loading}
                          className="w-full sm:w-auto inline-flex justify-center items-center space-x-2 rounded-lg border border-transparent bg-red-600 px-4 py-2 sm:py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Confirm Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-border bg-card px-4 py-2 sm:py-3 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 order-1 sm:order-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-border bg-card px-4 py-2 sm:py-3 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 sm:py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
