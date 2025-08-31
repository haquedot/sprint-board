'use client'

import { TaskPriority } from '@/types'
import { motion } from 'framer-motion'

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  priorityFilter: TaskPriority | 'all'
  onPriorityFilterChange: (priority: TaskPriority | 'all') => void
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
}: SearchAndFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
            Search Tasks
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-border rounded-lg leading-5 bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm text-sm sm:text-base"
              placeholder="Search tasks by title..."
            />
          </div>
        </div>

        <div className="sm:w-48 lg:w-64">
          <label htmlFor="priority-filter" className="block text-sm font-medium text-foreground mb-2">
            Filter by Priority
          </label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | 'all')}
            className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm text-sm sm:text-base custom-select cursor-pointer"
          >
            <option value="all">⚪ All Priorities</option>
            <option value="high">⚫ High Priority</option>
            <option value="medium">⚫ Medium Priority</option>
            <option value="low">⚪ Low Priority</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
