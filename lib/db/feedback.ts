import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Define types based on the actual database schema
export interface Feedback {
  feedback_id: string
  user_id: string
  text: string
  rating: number
  context?: Record<string, any>
  created_at: string
}

export type FeedbackInsert = Omit<Feedback, 'feedback_id' | 'created_at'>
export type FeedbackUpdate = Partial<Omit<FeedbackInsert, 'user_id'>>

// Validation schema for feedback creation and updates
export const feedbackSchema = z.object({
  text: z.string().min(1, 'Feedback text is required').max(1000, 'Feedback text is too long'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  context: z.record(z.any()).optional(),
  user_id: z.string().uuid('Invalid user ID'),
})

/**
 * Fetch all feedback for a user
 */
export async function getUserFeedback(userId: string): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching feedback:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch all feedback (admin only)
 */
export async function getAllFeedback(): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all feedback:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch a single feedback item by ID
 */
export async function getFeedback(feedbackId: string): Promise<Feedback | null> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('feedback_id', feedbackId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') { // Record not found
      return null
    }
    console.error('Error fetching feedback:', error)
    throw error
  }

  return data
}

/**
 * Create new feedback
 */
export async function createFeedback(feedback: FeedbackInsert): Promise<Feedback> {
  // Validate feedback data
  const validatedData = feedbackSchema.parse(feedback)
  
  const { data, error } = await supabase
    .from('feedback')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    console.error('Error creating feedback:', error)
    throw error
  }

  return data
}

/**
 * Update feedback
 */
export async function updateFeedback(feedbackId: string, updates: FeedbackUpdate): Promise<Feedback> {
  // Validate feedback data
  const validatedData = feedbackSchema.partial().omit({ user_id: true }).parse(updates)
  
  const { data, error } = await supabase
    .from('feedback')
    .update(validatedData)
    .eq('feedback_id', feedbackId)
    .select()
    .single()

  if (error) {
    console.error('Error updating feedback:', error)
    throw error
  }

  return data
}

/**
 * Delete feedback
 */
export async function deleteFeedback(feedbackId: string): Promise<boolean> {
  const { error } = await supabase
    .from('feedback')
    .delete()
    .eq('feedback_id', feedbackId)

  if (error) {
    console.error('Error deleting feedback:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to feedback changes for a user
 */
export function subscribeToUserFeedback(
  userId: string,
  callback: (payload: { new: Feedback | null; old: Feedback | null }) => void
): () => void {
  const subscription = supabase
    .channel(`feedback:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'feedback',
        filter: `user_id=eq.${userId}`,
      },
      callback as any
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

/**
 * Subscribe to all feedback changes (admin only)
 */
export function subscribeToAllFeedback(
  callback: (payload: { new: Feedback | null; old: Feedback | null }) => void
): () => void {
  const subscription = supabase
    .channel('all_feedback')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'feedback',
      },
      callback as any
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
