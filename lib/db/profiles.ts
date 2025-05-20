import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

/**
 * Fetch a profile by user ID
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    throw error
  }

  return data
}

/**
 * Update a user's profile
 */
export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    throw error
  }

  return data
}

/**
 * Check if a username is available
 */
export async function isUsernameAvailable(username: string, currentUserId?: string) {
  const query = supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .limit(1)

  // If checking for current user, exclude them from the check
  if (currentUserId) {
    query.neq('id', currentUserId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error checking username availability:', error)
    throw error
  }

  // If no data is returned, the username is available
  return data.length === 0
}

/**
 * Subscribe to profile changes
 */
export function subscribeToProfile(
  userId: string,
  callback: (payload: { new: Profile; old: Profile }) => void
) {
  const subscription = supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
