import { supabase } from './supabase'
import type { Provider, AuthChangeEvent, Session, User, AuthError as SupabaseAuthError } from '@supabase/supabase-js'

export type AuthError = {
  message: string
  status?: number
}

export type AuthResponse<T = unknown> = {
  data: T | null
  error: AuthError | null
}

export const authService = {
  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, metadata?: Record<string, unknown>): Promise<AuthResponse<User | null>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { data: data.user, error: null }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to sign up',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse<User | null>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data: data.user, error: null }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to sign in',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Sign in with magic link (passwordless)
   */
  async signInWithMagicLink(email: string, redirectTo?: string): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
    try {
      // Build the redirect URL with an optional redirectTo parameter
      const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
      if (redirectTo) {
        callbackUrl.searchParams.append('redirectTo', redirectTo);
      }
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      })

      if (error) throw error

      return { 
        data: { user: data.user, session: data.session }, 
        error: null 
      }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to send magic link',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Sign in with OAuth provider (Google, GitHub, etc.)
   */
  async signInWithOAuth(provider: Provider): Promise<AuthResponse<{ provider: Provider; url: string | null }>> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { data, error: null } // data contains provider and url
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || `Failed to sign in with ${provider}`,
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<AuthResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      return { data: null, error: null }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to sign out',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<AuthResponse<null>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      return { data: null, error: null } // data is empty for this operation on success
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to send password reset email',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Update user's password (after reset)
   */
  async updatePassword(password: string): Promise<AuthResponse<User | null>> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      return { data: data.user, error: null }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to update password',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Get the current session
   */
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error.message)
      return null
    }
    return data.session
  },

  /**
   * Get the current user
   */
  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting user:', error.message)
      return null
    }
    return data.user
  },

  /**
   * Delete the current user's account
   * Note: This requires a server-side API endpoint to fully delete the account
   * For now, we'll sign out the user and let the server handle the deletion
   */
  async deleteAccount(): Promise<AuthResponse<null>> {
    try {
      // First, we'll make a request to a server endpoint that will handle the actual deletion
      // This is a placeholder - in a real implementation, you would create a server API endpoint
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      })

      if (!response.ok) {
        const errorData = await response.json() as { message?: string };
        throw new Error(errorData.message || 'Failed to delete account from server')
      }

      // Sign out the user after successful deletion
      await supabase.auth.signOut()

      return { data: null, error: null }
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      const ErrorResponse = error as Error;
      return {
        data: null,
        error: {
          message: supabaseError.message || ErrorResponse.message || 'Failed to delete account',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Record<string, unknown>): Promise<AuthResponse<User | null>> {
    try {
      // First update auth metadata if needed
      if (updates.full_name || updates.avatar_url) {
        const { error: userUpdateError } = await supabase.auth.updateUser({
          data: {
            full_name: updates.full_name as string | undefined,
            avatar_url: updates.avatar_url as string | undefined,
          },
        })

        if (userUpdateError) throw userUpdateError
      }

      // Then update the profile record
      const { data, error } = await supabase
        .from('profiles')
        .update({
          updated_at: new Date().toISOString(),
          ...updates,
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      return { data: data as User, error: null } // Assuming the select().single() returns a User like object or null
    } catch (error: unknown) {
      const supabaseError = error as SupabaseAuthError;
      return {
        data: null,
        error: {
          message: supabaseError.message || 'Failed to update profile',
          status: supabaseError.status,
        },
      }
    }
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },
}
