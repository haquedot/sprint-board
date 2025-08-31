'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface UndoToastProps {
  isVisible: boolean
  onUndo: () => void
  onDismiss: () => void
}

export default function UndoToast({ isVisible, onUndo, onDismiss }: UndoToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50"
        >
          <div className="bg-foreground/95 backdrop-blur-md text-background rounded-xl shadow-2xl p-4 flex items-center justify-between border border-border">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-500 flex items-center justify-center mr-3">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Task moved successfully</p>
                <p className="text-xs opacity-70">Action completed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onUndo}
                className="bg-neutral-600 hover:bg-neutral-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                Undo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDismiss}
                className="opacity-70 hover:opacity-100 p-1 rounded-lg transition-opacity duration-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
