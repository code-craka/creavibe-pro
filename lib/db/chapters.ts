import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
import { z } from 'zod'

export type Chapter = Database['public']['Tables']['chapters']['Row']
export type ChapterInsert = Database['public']['Tables']['chapters']['Insert']
export type ChapterUpdate = Database['public']['Tables']['chapters']['Update']

// Validation schema for chapter creation and updates
export const chapterSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().optional(),
  order_index: z.number().int('Order must be an integer').min(0, 'Order must be positive'),
  webbook_id: z.string().uuid('Invalid webbook ID'),
})

/**
 * Fetch all chapters for a webbook
 */
export async function getChapters(webbookId: string) {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('webbook_id', webbookId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching chapters:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single chapter by ID
 */
export async function getChapter(chapterId: string) {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single()

  if (error) {
    console.error('Error fetching chapter:', error)
    throw error
  }

  return data
}

/**
 * Create a new chapter
 */
export async function createChapter(chapter: ChapterInsert) {
  // Validate chapter data
  const validatedData = chapterSchema.parse(chapter)
  
  const { data, error } = await supabase
    .from('chapters')
    .insert(validatedData)
    .select()
    .single()

  if (error) {
    console.error('Error creating chapter:', error)
    throw error
  }

  return data
}

/**
 * Update a chapter
 */
export async function updateChapter(chapterId: string, updates: ChapterUpdate) {
  // Validate chapter data
  const validatedData = chapterSchema.partial().parse(updates)
  
  const { data, error } = await supabase
    .from('chapters')
    .update({
      ...validatedData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', chapterId)
    .select()
    .single()

  if (error) {
    console.error('Error updating chapter:', error)
    throw error
  }

  return data
}

/**
 * Delete a chapter
 */
export async function deleteChapter(chapterId: string) {
  const { error } = await supabase
    .from('chapters')
    .delete()
    .eq('id', chapterId)

  if (error) {
    console.error('Error deleting chapter:', error)
    throw error
  }

  return true
}

/**
 * Reorder chapters in a webbook
 * @param webbookId The ID of the webbook
 * @param chapterIds Array of chapter IDs in the desired order
 */
export async function reorderChapters(webbookId: string, chapterIds: string[]) {
  // Start a transaction to update all chapters
  const updates = chapterIds.map((chapterId, index) => {
    return supabase
      .from('chapters')
      .update({ order_index: index })
      .eq('id', chapterId)
      .eq('webbook_id', webbookId)
  })

  try {
    // Execute all updates
    await Promise.all(updates)
    
    // Fetch the updated chapters
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('webbook_id', webbookId)
      .order('order_index', { ascending: true })
      
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error reordering chapters:', error)
    throw error
  }
}

/**
 * Subscribe to chapter changes for a webbook
 */
export function subscribeToChapters(
  webbookId: string,
  callback: (payload: { new: Chapter; old: Chapter }) => void
) {
  const subscription = supabase
    .channel(`chapters:${webbookId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'chapters',
        filter: `webbook_id=eq.${webbookId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

/**
 * Subscribe to a single chapter's changes
 */
export function subscribeToChapter(
  chapterId: string,
  callback: (payload: { new: Chapter; old: Chapter }) => void
) {
  const subscription = supabase
    .channel(`chapter:${chapterId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'chapters',
        filter: `id=eq.${chapterId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
