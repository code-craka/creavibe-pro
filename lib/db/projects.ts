import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
import { z } from 'zod'

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
export type ProjectStatus = 'draft' | 'in_progress' | 'published' | 'archived'

// Validation schema for project creation
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  status: z.enum(['draft', 'in_progress', 'published', 'archived']).default('draft'),
})

/**
 * Fetch all projects for a user
 */
export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single project by ID
 */
export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    throw error
  }

  return data
}

/**
 * Create a new project
 */
export async function createProject(project: ProjectInsert) {
  // Validate project data
  const validatedData = projectSchema.parse(project)
  
  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...validatedData,
      user_id: project.user_id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw error
  }

  return data
}

/**
 * Update a project
 */
export async function updateProject(projectId: string, updates: ProjectUpdate) {
  // Validate project data
  const validatedData = projectSchema.partial().parse(updates)
  
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...validatedData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    throw error
  }

  return data
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)

  if (error) {
    console.error('Error deleting project:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to project changes
 */
export function subscribeToProjects(
  userId: string,
  callback: (payload: { new: Project; old: Project }) => void
) {
  const subscription = supabase
    .channel(`projects:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'projects',
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
 * Subscribe to a single project's changes
 */
export function subscribeToProject(
  projectId: string,
  callback: (payload: { new: Project; old: Project }) => void
) {
  const subscription = supabase
    .channel(`project:${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'projects',
        filter: `id=eq.${projectId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
