'use client'

import { motion } from 'framer-motion'

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {[0, 1, 2].map((columnIndex) => (
        <div key={columnIndex} className="bg-card/60 backdrop-blur-md rounded-2xl p-6 border-2 border-border shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-muted rounded-xl animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-muted rounded-lg w-20 animate-pulse mb-2"></div>
              <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            {[0, 1, 2].map((cardIndex) => (
              <motion.div
                key={cardIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (columnIndex * 3 + cardIndex) * 0.1 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-border shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-4 bg-muted rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
