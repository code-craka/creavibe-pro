"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from './use-toast'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthError } from '@supabase/supabase-js'

export function useAuthState() {
  const { user, setUser, setProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        toast({
          title: 'Success',
          description: 'You have been signed in successfully.',
          variant: 'success',
        })
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Error signing in:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to sign in')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to sign in',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast, router])

  const signInWithMagicLink = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for a login link.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error sending magic link:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to send magic link')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to send magic link',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast])

  const signUp = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
          toast({
            title: 'Account Exists',
            description: 'An account with this email already exists. Try signing in instead.',
            variant: 'default',
          })
        } else {
          toast({
            title: 'Verification Email Sent',
            description: 'Please check your email to verify your account.',
            variant: 'success',
          })
          router.push('/auth/confirm')
        }
      }
      
      return true
    } catch (err) {
      console.error('Error signing up:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to sign up')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to sign up',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast, router])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      setUser(null)
      setProfile(null)
      
      toast({
        title: 'Signed Out',
        description: 'You have been signed out successfully.',
        variant: 'default',
      })
      
      router.push('/')
    } catch (err) {
      console.error('Error signing out:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to sign out')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to sign out',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast, router, setUser, setProfile])

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for a password reset link.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error resetting password:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to reset password')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to reset password',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast])

  const updatePassword = useCallback(async (newPassword: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
        variant: 'success',
      })
      
      router.push('/dashboard')
      return true
    } catch (err) {
      console.error('Error updating password:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to update password')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to update password',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast, router])

  const resendVerificationEmail = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Verification Email Resent',
        description: 'Please check your email to verify your account.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error resending verification email:', err)
      setError(err instanceof AuthError ? err.message : 'Failed to resend verification email')
      toast({
        title: 'Error',
        description: err instanceof AuthError ? err.message : 'Failed to resend verification email',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [supabase, toast])

  return {
    user,
    isLoading,
    error,
    signIn,
    signInWithMagicLink,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendVerificationEmail,
  }
}
