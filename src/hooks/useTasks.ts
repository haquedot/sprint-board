'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, TaskStatus, CreateTaskData, UpdateTaskData, UndoAction } from '@/types'
import { taskAPI } from '@/lib/api'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null)

  const fetchTasks = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await taskAPI.getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      
      // Retry up to 2 times for read operations (less aggressive)
      if (retryCount < 2) {
        console.log(`Retrying fetch tasks... (attempt ${retryCount + 2}/3)`)
        setTimeout(() => fetchTasks(retryCount + 1), 1000 * (retryCount + 1)) // Exponential backoff
        return
      }
      
      setError('Unable to load tasks. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = async (taskData: CreateTaskData): Promise<boolean> => {
    try {
      const newTask = await taskAPI.createTask(taskData)
      setTasks(prev => [...prev, newTask])
      return true
    } catch (err) {
      setError('Failed to create task')
      console.error('Error creating task:', err)
      return false
    }
  }

  const updateTask = async (
    id: string, 
    updates: UpdateTaskData, 
    enableUndo = false
  ): Promise<boolean> => {
    const originalTask = tasks.find(task => task.id === id)
    if (!originalTask) return false

    // Optimistic update
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ))

    try {
      await taskAPI.updateTask(id, updates)
      
      // Set up undo action for status changes
      if (enableUndo && updates.status && originalTask.status !== updates.status) {
        setUndoAction({
          taskId: id,
          fromStatus: updates.status,
          toStatus: originalTask.status,
          timestamp: Date.now()
        })
        
        // Auto-clear undo after 5 seconds
        setTimeout(() => {
          setUndoAction(null)
        }, 5000)
      }
      
      return true
    } catch (err) {
      // Rollback optimistic update
      setTasks(prev => prev.map(task => 
        task.id === id ? originalTask : task
      ))
      setError('Failed to update task')
      console.error('Error updating task:', err)
      return false
    }
  }

  const deleteTask = async (id: string): Promise<boolean> => {
    const originalTasks = [...tasks]
    
    // Optimistic update
    setTasks(prev => prev.filter(task => task.id !== id))

    try {
      await taskAPI.deleteTask(id)
      return true
    } catch (err) {
      // Rollback
      setTasks(originalTasks)
      setError('Failed to delete task')
      console.error('Error deleting task:', err)
      return false
    }
  }

  const moveTask = async (taskId: string, newStatus: TaskStatus): Promise<boolean> => {
    return updateTask(taskId, { status: newStatus }, true)
  }

  const undoMove = async (): Promise<boolean> => {
    if (!undoAction) return false
    
    const success = await updateTask(undoAction.taskId, { status: undoAction.toStatus }, false)
    if (success) {
      setUndoAction(null)
    }
    return success
  }

  const clearError = () => setError(null)

  return {
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
  }
}
