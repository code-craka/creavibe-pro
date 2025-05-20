import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
import { z } from 'zod'

export type Webbook = Database['public']['Tables']['webbooks']['Row']
export type WebbookInsert = Database['public']['Tables']['webbooks']['Insert']
export type WebbookUpdate = Database['public']['Tables']['webbooks']['Update']
export type WebbookVisibility = 'private' | 'public' | 'shared'

// Validation schema for webbook creation and updates
export const webbookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  cover_image_url: z.string().url('Invalid URL').optional().nullable(),
  visibility: z.enum(['private', 'public', 'shared']).default('private'),
  project_id: z.string().uuid('Invalid project ID').optional().nullable(),
})

/**
 * Fetch all webbooks for a user
 */
export async function getWebbooks(userId: string) {
  const { data, error } = await supabase
    .from('webbooks')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching webbooks:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single webbook by ID
 */
export async function getWebbook(webbookId: string) {
  const { data, error } = await supabase
    .from('webbooks')
    .select('*, chapters(*)')
    .eq('id', webbookId)
    .single()

  if (error) {
    console.error('Error fetching webbook:', error)
    throw error
  }

  return data
}

/**
 * Fetch public webbooks
 */
export async function getPublicWebbooks(limit = 10, offset = 0) {
  const { data, error, count } = await supabase
    .from('webbooks')
    .select('*, profiles(username, avatar_url)', { count: 'exact' })
    .eq('visibility', 'public')
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching public webbooks:', error)
    throw error
  }

  return { data, count }
}

/**
 * Create a new webbook
 */
export async function createWebbook(webbook: WebbookInsert) {
  // Validate webbook data
  const validatedData = webbookSchema.parse(webbook)
  
  const { data, error } = await supabase
    .from('webbooks')
    .insert({
      ...validatedData,
      user_id: webbook.user_id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating webbook:', error)
    throw error
  }

  return data
}

/**
 * Update a webbook
 */
export async function updateWebbook(webbookId: string, updates: WebbookUpdate) {
  // Validate webbook data
  const validatedData = webbookSchema.partial().parse(updates)
  
  const { data, error } = await supabase
    .from('webbooks')
    .update({
      ...validatedData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', webbookId)
    .select()
    .single()

  if (error) {
    console.error('Error updating webbook:', error)
    throw error
  }

  return data
}

/**
 * Delete a webbook
 */
export async function deleteWebbook(webbookId: string) {
  const { error } = await supabase
    .from('webbooks')
    .delete()
    .eq('id', webbookId)

  if (error) {
    console.error('Error deleting webbook:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to webbook changes
 */
export function subscribeToWebbooks(
  userId: string,
  callback: (payload: { new: Webbook; old: Webbook }) => void
) {
  const subscription = supabase
    .channel(`webbooks:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'webbooks',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

/**
 * Subscribe to a single webbook's changes
 */
export function subscribeToWebbook(
  webbookId: string,
  callback: (payload: { new: Webbook; old: Webbook }) => void
) {
  const subscription = supabase
    .channel(`webbook:${webbookId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'webbooks',
        filter: `id=eq.${webbookId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
