import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
import { z } from 'zod'

export type Generation = Database['public']['Tables']['generations']['Row']
export type GenerationInsert = Database['public']['Tables']['generations']['Insert']
export type GenerationUpdate = Database['public']['Tables']['generations']['Update']
export type GenerationType = 'blog' | 'image' | 'video' | 'code' | 'other'

// Validation schema for generation creation and updates
export const generationSchema = z.object({
  type: z.enum(['blog', 'image', 'video', 'code', 'other']),
  prompt: z.string().min(1, 'Prompt is required'),
  result: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  project_id: z.string().uuid('Invalid project ID').optional().nullable(),
  user_id: z.string().uuid('Invalid user ID'),
})

/**
 * Fetch all generations for a user
 */
export async function getGenerations(userId: string, limit = 20, offset = 0) {
  const { data, error, count } = await supabase
    .from('generations')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching generations:', error)
    throw error
  }

  return { data, count }
}

/**
 * Fetch generations by type for a user
 */
export async function getGenerationsByType(userId: string, type: GenerationType, limit = 20, offset = 0) {
  const { data, error, count } = await supabase
    .from('generations')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('type', type)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error(`Error fetching ${type} generations:`, error)
    throw error
  }

  return { data, count }
}

/**
 * Fetch generations for a project
 */
export async function getProjectGenerations(projectId: string) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching project generations:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single generation by ID
 */
export async function getGeneration(generationId: string) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('id', generationId)
    .single()

  if (error) {
    console.error('Error fetching generation:', error)
    throw error
  }

  return data
}

/**
 * Create a new generation
 */
export async function createGeneration(generation: GenerationInsert) {
  // Validate generation data
  const validatedData = generationSchema.parse(generation)
  
  const { data, error } = await supabase
    .from('generations')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    console.error('Error creating generation:', error)
    throw error
  }

  return data
}

/**
 * Update a generation
 */
export async function updateGeneration(generationId: string, updates: GenerationUpdate) {
  // Validate generation data
  const validatedData = generationSchema.partial().parse(updates)
  
  const { data, error } = await supabase
    .from('generations')
    .update({
      ...validatedData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', generationId)
    .select()
    .single()

  if (error) {
    console.error('Error updating generation:', error)
    throw error
  }

  return data
}

/**
 * Delete a generation
 */
export async function deleteGeneration(generationId: string) {
  const { error } = await supabase
    .from('generations')
    .delete()
    .eq('id', generationId)

  if (error) {
    console.error('Error deleting generation:', error)
    throw error
  }

  return true
}

/**
 * Get user's total storage usage
 */
export async function getUserStorageUsage(userId: string) {
  const { data, error } = await supabase
    .rpc('get_user_storage_usage', { user_uuid: userId })

  if (error) {
    console.error('Error getting user storage usage:', error)
    throw error
  }

  return data
}

/**
 * Subscribe to generation changes for a user
 */
export function subscribeToGenerations(
  userId: string,
  callback: (payload: { new: Generation; old: Generation }) => void
) {
  const subscription = supabase
    .channel(`generations:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'generations',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
