'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent text-accent-foreground px-3 py-2 rounded-lg shadow-lg hover:bg-accent/90 transition-colors text-sm font-medium z-50"
        title="Keyboard shortcuts"
      >
        ⌨️ Shortcuts
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Focus on task card</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    Tab
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Move task left</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    [
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Move task right</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    ]
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Edit task</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    Enter
                  </kbd>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Use Tab to navigate between task cards, then use [ and ] keys to move tasks between columns.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
