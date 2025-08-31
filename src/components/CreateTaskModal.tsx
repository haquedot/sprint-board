'use client'

import { useState } from 'react'
import { CreateTaskData, TaskPriority } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskData: CreateTaskData) => Promise<boolean>
}

export default function CreateTaskModal({ isOpen, onClose, onSubmit }: CreateTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    setError('')

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    })

    if (success) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      onClose()
    } else {
      setError('Failed to create task. Please try again.')
    }

    setLoading(false)
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-card rounded-xl shadow-2xl border border-border overflow-hidden"
            >
              <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6 sm:mb-8">
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
                        <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold leading-6 text-foreground">
                          Create New Task
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Add a new task to your sprint board
                        </p>
                      </div>
                    </div>
                    
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 sm:py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground transition-all duration-200 shadow-sm text-sm sm:text-base"
                        placeholder="Enter a descriptive task title"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 sm:py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground transition-all duration-200 shadow-sm resize-none text-sm sm:text-base"
                        placeholder="Describe what needs to be done (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-semibold text-foreground mb-2">
                        Priority Level
                      </label>
                      <select
                        id="priority"
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
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-border bg-card px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 order-2 sm:order-1"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-transparent bg-gradient-to-r from-neutral-600 to-neutral-700 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-white shadow-lg hover:from-neutral-700 hover:to-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 order-1 sm:order-2"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Task'
                    )}
                  </motion.button>
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
