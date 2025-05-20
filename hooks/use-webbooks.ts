"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getWebbooks, 
  getWebbook, 
  getPublicWebbooks,
  createWebbook, 
  updateWebbook, 
  deleteWebbook, 
  subscribeToWebbooks,
  subscribeToWebbook,
  Webbook, 
  WebbookInsert,
  WebbookUpdate 
} from '@/lib/db/webbooks'
import { useToast } from '@/hooks/use-toast'

export function useWebbooks() {
  const { user } = useAuth()
  const [webbooks, setWebbooks] = useState<Webbook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchWebbooks = useCallback(async () => {
    if (!user) {
      setWebbooks([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getWebbooks(user.id)
      setWebbooks(data)
    } catch (err) {
      console.error('Error fetching webbooks:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch webbooks'))
      toast({
        title: 'Error',
        description: 'Failed to load webbooks. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeWebbooks = async () => {
      if (!user) {
        if (isMounted) {
          setWebbooks([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchWebbooks()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToWebbooks(user.id, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setWebbooks(prev => [payload.new, ...prev])
            } else if (payload.new && payload.old) {
              // UPDATE event
              setWebbooks(prev => 
                prev.map(webbook => webbook.id === payload.new.id ? payload.new : webbook)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setWebbooks(prev => 
                prev.filter(webbook => webbook.id !== payload.old.id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing webbooks:', err)
        }
      }
    }

    initializeWebbooks()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, fetchWebbooks])

  const addWebbook = async (webbook: Omit<WebbookInsert, 'user_id'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a webbook.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newWebbook = await createWebbook({
        ...webbook,
        user_id: user.id,
      })
      
      toast({
        title: 'Success',
        description: 'Webbook created successfully.',
        variant: 'success',
      })
      
      return newWebbook
    } catch (err) {
      console.error('Error creating webbook:', err)
      toast({
        title: 'Error',
        description: 'Failed to create webbook. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editWebbook = async (webbookId: string, updates: WebbookUpdate) => {
    try {
      setIsLoading(true)
      const updatedWebbook = await updateWebbook(webbookId, updates)
      
      toast({
        title: 'Success',
        description: 'Webbook updated successfully.',
        variant: 'success',
      })
      
      return updatedWebbook
    } catch (err) {
      console.error('Error updating webbook:', err)
      toast({
        title: 'Error',
        description: 'Failed to update webbook. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeWebbook = async (webbookId: string) => {
    try {
      setIsLoading(true)
      await deleteWebbook(webbookId)
      
      toast({
        title: 'Success',
        description: 'Webbook deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting webbook:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete webbook. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    webbooks,
    isLoading,
    error,
    fetchWebbooks,
    addWebbook,
    editWebbook,
    removeWebbook,
  }
}

export function useWebbook(webbookId: string | undefined) {
  const { user } = useAuth()
  const [webbook, setWebbook] = useState<Webbook | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const fetchWebbook = async () => {
      if (!webbookId) {
        if (isMounted) {
          setWebbook(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getWebbook(webbookId)
        
        if (isMounted) {
          setWebbook(data)
          
          // Set up real-time subscription for this specific webbook
          unsubscribe = subscribeToWebbook(webbookId, (payload) => {
            if (payload.new) {
              setWebbook(payload.new)
            } else if (!payload.new && payload.old) {
              // Webbook was deleted
              setWebbook(null)
              toast({
                title: 'Webbook Deleted',
                description: 'This webbook has been deleted.',
                variant: 'default',
              })
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching webbook:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch webbook'))
          toast({
            title: 'Error',
            description: 'Failed to load webbook. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchWebbook()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [webbookId, toast])

  const updateWebbookDetails = async (updates: WebbookUpdate) => {
    if (!webbookId) {
      toast({
        title: 'Error',
        description: 'Webbook ID is required to update a webbook.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedWebbook = await updateWebbook(webbookId, updates)
      
      toast({
        title: 'Success',
        description: 'Webbook updated successfully.',
        variant: 'success',
      })
      
      return updatedWebbook
    } catch (err) {
      console.error('Error updating webbook:', err)
      toast({
        title: 'Error',
        description: 'Failed to update webbook. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteWebbookById = async () => {
    if (!webbookId) {
      toast({
        title: 'Error',
        description: 'Webbook ID is required to delete a webbook.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteWebbook(webbookId)
      
      toast({
        title: 'Success',
        description: 'Webbook deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting webbook:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete webbook. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    webbook,
    isLoading,
    error,
    updateWebbook: updateWebbookDetails,
    deleteWebbook: deleteWebbookById,
  }
}

export function usePublicWebbooks(limit = 10) {
  const [webbooks, setWebbooks] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchPublicWebbooks = useCallback(async (newOffset = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, count } = await getPublicWebbooks(limit, newOffset)
      
      if (newOffset === 0) {
        setWebbooks(data)
      } else {
        setWebbooks(prev => [...prev, ...data])
      }
      
      setTotalCount(count || 0)
      setOffset(newOffset)
    } catch (err) {
      console.error('Error fetching public webbooks:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch public webbooks'))
      toast({
        title: 'Error',
        description: 'Failed to load public webbooks. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [limit, toast])

  useEffect(() => {
    fetchPublicWebbooks(0)
  }, [fetchPublicWebbooks])

  const loadMore = () => {
    if (isLoading || webbooks.length >= totalCount) return
    fetchPublicWebbooks(offset + limit)
  }

  return {
    webbooks,
    isLoading,
    error,
    hasMore: webbooks.length < totalCount,
    loadMore,
    refresh: () => fetchPublicWebbooks(0),
  }
}
