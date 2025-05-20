import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
import { z } from 'zod'

export type ApiToken = Database['public']['Tables']['api_tokens']['Row']
export type ApiTokenInsert = Database['public']['Tables']['api_tokens']['Insert']
export type ApiTokenUpdate = Database['public']['Tables']['api_tokens']['Update']

// Validation schema for API token creation and updates
export const apiTokenSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  token: z.string().optional(), // Generated server-side
  expires_at: z.date().optional().nullable(),
  user_id: z.string().uuid('Invalid user ID'),
})

/**
 * Fetch all API tokens for a user
 */
export async function getApiTokens(userId: string) {
  const { data, error } = await supabase
    .from('api_tokens')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching API tokens:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single API token by ID
 */
export async function getApiToken(tokenId: string) {
  const { data, error } = await supabase
    .from('api_tokens')
    .select('*')
    .eq('id', tokenId)
    .single()

  if (error) {
    console.error('Error fetching API token:', error)
    throw error
  }

  return data
}

/**
 * Create a new API token
 */
export async function createApiToken(apiToken: Omit<ApiTokenInsert, 'token'>) {
  // Validate API token data
  const validatedData = apiTokenSchema.omit({ token: true }).parse(apiToken)
  
  // Generate a new token using the database function
  const { data: generatedToken, error: tokenError } = await supabase
    .rpc('generate_api_token')
  
  if (tokenError) {
    console.error('Error generating API token:', tokenError)
    throw tokenError
  }
  
  const { data, error } = await supabase
    .from('api_tokens')
    .insert({
      ...validatedData,
      token: generatedToken,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating API token:', error)
    throw error
  }

  return data
}

/**
 * Update an API token
 */
export async function updateApiToken(tokenId: string, updates: ApiTokenUpdate) {
  // Validate API token data
  const validatedData = apiTokenSchema.partial().omit({ token: true }).parse(updates)
  
  const { data, error } = await supabase
    .from('api_tokens')
    .update({
      ...validatedData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', tokenId)
    .select()
    .single()

  if (error) {
    console.error('Error updating API token:', error)
    throw error
  }

  return data
}

/**
 * Delete an API token
 */
export async function deleteApiToken(tokenId: string) {
  const { error } = await supabase
    .from('api_tokens')
    .delete()
    .eq('id', tokenId)

  if (error) {
    console.error('Error deleting API token:', error)
    throw error
  }

  return true
}

/**
 * Validate an API token
 */
export async function validateApiToken(token: string) {
  const { data, error } = await supabase
    .rpc('validate_api_token', { token_value: token })

  if (error) {
    console.error('Error validating API token:', error)
    throw error
  }

  return data
}

/**
 * Subscribe to API token changes for a user
 */
export function subscribeToApiTokens(
  userId: string,
  callback: (payload: { new: ApiToken; old: ApiToken }) => void
) {
  const subscription = supabase
    .channel(`api_tokens:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'api_tokens',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
