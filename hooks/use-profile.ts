"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { getProfile, updateProfile, Profile, ProfileUpdate, subscribeToProfile } from '@/lib/db/profiles'
import { useToast } from '@/hooks/use-toast'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const fetchProfile = async () => {
      if (!user) {
        setProfile(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getProfile(user.id)
        
        if (isMounted) {
          setProfile(data)
          
          // Set up real-time subscription
          unsubscribe = subscribeToProfile(user.id, (payload) => {
            if (payload.new) {
              setProfile(payload.new)
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching profile:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch profile'))
          toast({
            title: 'Error',
            description: 'Failed to load profile. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, toast])

  const updateUserProfile = async (updates: ProfileUpdate) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update your profile.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedProfile = await updateProfile(user.id, updates)
      
      toast({
        title: 'Success',
        description: 'Your profile has been updated.',
        variant: 'success',
      })
      
      return updatedProfile
    } catch (err) {
      console.error('Error updating profile:', err)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateUserProfile,
  }
}
