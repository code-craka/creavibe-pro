"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getApiTokens, 
  getApiToken, 
  createApiToken, 
  updateApiToken, 
  deleteApiToken,
  validateApiToken,
  subscribeToApiTokens,
  ApiToken,
  ApiTokenInsert,
  ApiTokenUpdate
} from '@/lib/db/api-tokens'
import { useToast } from '@/hooks/use-toast'

export function useApiTokens() {
  const { user } = useAuth()
  const [apiTokens, setApiTokens] = useState<ApiToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchApiTokens = useCallback(async () => {
    if (!user) {
      setApiTokens([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getApiTokens(user.id)
      setApiTokens(data)
    } catch (err) {
      console.error('Error fetching API tokens:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch API tokens'))
      toast({
        title: 'Error',
        description: 'Failed to load API tokens. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeApiTokens = async () => {
      if (!user) {
        if (isMounted) {
          setApiTokens([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchApiTokens()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToApiTokens(user.id, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setApiTokens(prev => [payload.new, ...prev])
            } else if (payload.new && payload.old) {
              // UPDATE event
              setApiTokens(prev => 
                prev.map(token => token.id === payload.new.id ? payload.new : token)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setApiTokens(prev => 
                prev.filter(token => token.id !== payload.old.id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing API tokens:', err)
        }
      }
    }

    initializeApiTokens()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, fetchApiTokens])

  const addApiToken = async (name: string, expiresAt?: Date | null) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create an API token.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newToken = await createApiToken({
        name,
        expires_at: expiresAt,
        user_id: user.id,
      })
      
      toast({
        title: 'Success',
        description: 'API token created successfully.',
        variant: 'success',
      })
      
      return newToken
    } catch (err) {
      console.error('Error creating API token:', err)
      toast({
        title: 'Error',
        description: 'Failed to create API token. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editApiToken = async (tokenId: string, updates: ApiTokenUpdate) => {
    try {
      setIsLoading(true)
      const updatedToken = await updateApiToken(tokenId, updates)
      
      toast({
        title: 'Success',
        description: 'API token updated successfully.',
        variant: 'success',
      })
      
      return updatedToken
    } catch (err) {
      console.error('Error updating API token:', err)
      toast({
        title: 'Error',
        description: 'Failed to update API token. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeApiToken = async (tokenId: string) => {
    try {
      setIsLoading(true)
      await deleteApiToken(tokenId)
      
      toast({
        title: 'Success',
        description: 'API token deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting API token:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete API token. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const validateToken = async (token: string) => {
    try {
      setIsLoading(true)
      const userId = await validateApiToken(token)
      
      return userId
    } catch (err) {
      console.error('Error validating API token:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    apiTokens,
    isLoading,
    error,
    fetchApiTokens,
    addApiToken,
    editApiToken,
    removeApiToken,
    validateToken,
  }
}

export function useApiToken(tokenId: string | undefined) {
  const [apiToken, setApiToken] = useState<ApiToken | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true

    const fetchApiToken = async () => {
      if (!tokenId) {
        if (isMounted) {
          setApiToken(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getApiToken(tokenId)
        
        if (isMounted) {
          setApiToken(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching API token:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch API token'))
          toast({
            title: 'Error',
            description: 'Failed to load API token. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchApiToken()

    return () => {
      isMounted = false
    }
  }, [tokenId, toast])

  const updateTokenDetails = async (updates: ApiTokenUpdate) => {
    if (!tokenId) {
      toast({
        title: 'Error',
        description: 'Token ID is required to update an API token.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedToken = await updateApiToken(tokenId, updates)
      
      toast({
        title: 'Success',
        description: 'API token updated successfully.',
        variant: 'success',
      })
      
      return updatedToken
    } catch (err) {
      console.error('Error updating API token:', err)
      toast({
        title: 'Error',
        description: 'Failed to update API token. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTokenById = async () => {
    if (!tokenId) {
      toast({
        title: 'Error',
        description: 'Token ID is required to delete an API token.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteApiToken(tokenId)
      
      toast({
        title: 'Success',
        description: 'API token deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting API token:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete API token. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    apiToken,
    isLoading,
    error,
    updateApiToken: updateTokenDetails,
    deleteApiToken: deleteTokenById,
  }
}
