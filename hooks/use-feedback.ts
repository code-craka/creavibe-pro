"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getUserFeedback, 
  getAllFeedback,
  getFeedback, 
  createFeedback, 
  updateFeedback, 
  deleteFeedback,
  subscribeToUserFeedback,
  subscribeToAllFeedback,
  Feedback, 
  FeedbackInsert,
  FeedbackUpdate
} from '@/lib/db/feedback'
import { useToast } from '@/hooks/use-toast'

/**
 * Hook for managing user feedback
 */
export function useFeedback() {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchFeedback = useCallback(async () => {
    if (!user) {
      setFeedback([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getUserFeedback(user.id)
      setFeedback(data)
    } catch (err) {
      console.error('Error fetching feedback:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch feedback'))
      toast({
        title: 'Error',
        description: 'Failed to load feedback. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeFeedback = async () => {
      if (!user) {
        if (isMounted) {
          setFeedback([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchFeedback()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToUserFeedback(user.id, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setFeedback(prev => [payload.new!, ...prev])
            } else if (payload.new && payload.old) {
              // UPDATE event
              setFeedback(prev => 
                prev.map(item => item.feedback_id === payload.new!.feedback_id ? payload.new! : item)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setFeedback(prev => 
                prev.filter(item => item.feedback_id !== payload.old!.feedback_id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing feedback:', err)
        }
      }
    }

    initializeFeedback()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, fetchFeedback])

  const addFeedback = async (feedbackData: { text: string; rating: number; context?: Record<string, any> }) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit feedback.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newFeedback = await createFeedback({
        ...feedbackData,
        user_id: user.id,
      })
      
      toast({
        title: 'Success',
        description: 'Feedback submitted successfully.',
        variant: 'success',
      })
      
      return newFeedback
    } catch (err) {
      console.error('Error submitting feedback:', err)
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editFeedback = async (feedbackId: string, updates: FeedbackUpdate) => {
    try {
      setIsLoading(true)
      const updatedFeedback = await updateFeedback(feedbackId, updates)
      
      toast({
        title: 'Success',
        description: 'Feedback updated successfully.',
        variant: 'success',
      })
      
      return updatedFeedback
    } catch (err) {
      console.error('Error updating feedback:', err)
      toast({
        title: 'Error',
        description: 'Failed to update feedback. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeFeedback = async (feedbackId: string) => {
    try {
      setIsLoading(true)
      await deleteFeedback(feedbackId)
      
      toast({
        title: 'Success',
        description: 'Feedback deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting feedback:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete feedback. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    feedback,
    isLoading,
    error,
    fetchFeedback,
    addFeedback,
    editFeedback,
    removeFeedback,
  }
}

/**
 * Hook for a single feedback item
 */
export function useSingleFeedback(feedbackId: string | undefined) {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true

    const fetchSingleFeedback = async () => {
      if (!feedbackId) {
        if (isMounted) {
          setFeedback(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getFeedback(feedbackId)
        
        if (isMounted) {
          setFeedback(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching feedback:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch feedback'))
          toast({
            title: 'Error',
            description: 'Failed to load feedback. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSingleFeedback()

    return () => {
      isMounted = false
    }
  }, [feedbackId, toast])

  const updateFeedbackDetails = async (updates: FeedbackUpdate) => {
    if (!feedbackId) {
      toast({
        title: 'Error',
        description: 'Feedback ID is required to update feedback.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedFeedback = await updateFeedback(feedbackId, updates)
      
      toast({
        title: 'Success',
        description: 'Feedback updated successfully.',
        variant: 'success',
      })
      
      return updatedFeedback
    } catch (err) {
      console.error('Error updating feedback:', err)
      toast({
        title: 'Error',
        description: 'Failed to update feedback. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFeedbackById = async () => {
    if (!feedbackId) {
      toast({
        title: 'Error',
        description: 'Feedback ID is required to delete feedback.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteFeedback(feedbackId)
      
      toast({
        title: 'Success',
        description: 'Feedback deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting feedback:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete feedback. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    feedback,
    isLoading,
    error,
    updateFeedback: updateFeedbackDetails,
    deleteFeedback: deleteFeedbackById,
  }
}

/**
 * Admin hook for viewing all feedback
 */
export function useAdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchAdminFeedback = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getAllFeedback()
      setFeedback(data)
    } catch (err) {
      console.error('Error fetching admin feedback:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch admin feedback'))
      toast({
        title: 'Error',
        description: 'Failed to load feedback. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeFeedback = async () => {
      try {
        await fetchAdminFeedback()
        
        if (isMounted) {
          // Set up real-time subscription for all feedback
          unsubscribe = subscribeToAllFeedback((payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setFeedback(prev => [payload.new!, ...prev])
            } else if (payload.new && payload.old) {
              // UPDATE event
              setFeedback(prev => 
                prev.map(item => item.feedback_id === payload.new!.feedback_id ? payload.new! : item)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setFeedback(prev => 
                prev.filter(item => item.feedback_id !== payload.old!.feedback_id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing admin feedback:', err)
        }
      }
    }

    initializeFeedback()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [fetchAdminFeedback])

  return {
    feedback,
    isLoading,
    error,
    refresh: fetchAdminFeedback,
  }
}
