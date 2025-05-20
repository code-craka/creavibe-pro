"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getGenerations, 
  getGenerationsByType,
  getProjectGenerations,
  getGeneration, 
  createGeneration, 
  updateGeneration, 
  deleteGeneration,
  getUserStorageUsage,
  subscribeToGenerations,
  Generation, 
  GenerationInsert,
  GenerationUpdate,
  GenerationType
} from '@/lib/db/generations'
import { useToast } from '@/hooks/use-toast'

export function useGenerations(limit = 20) {
  const { user } = useAuth()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchGenerations = useCallback(async (newOffset = 0) => {
    if (!user) {
      setGenerations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, count } = await getGenerations(user.id, limit, newOffset)
      
      if (newOffset === 0) {
        setGenerations(data)
      } else {
        setGenerations(prev => [...prev, ...data])
      }
      
      setTotalCount(count || 0)
      setOffset(newOffset)
    } catch (err) {
      console.error('Error fetching generations:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch generations'))
      toast({
        title: 'Error',
        description: 'Failed to load generations. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, limit, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeGenerations = async () => {
      if (!user) {
        if (isMounted) {
          setGenerations([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchGenerations(0)
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToGenerations(user.id, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setGenerations(prev => [payload.new, ...prev])
              setTotalCount(prev => prev + 1)
            } else if (payload.new && payload.old) {
              // UPDATE event
              setGenerations(prev => 
                prev.map(generation => generation.id === payload.new.id ? payload.new : generation)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setGenerations(prev => 
                prev.filter(generation => generation.id !== payload.old.id)
              )
              setTotalCount(prev => prev - 1)
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing generations:', err)
        }
      }
    }

    initializeGenerations()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, fetchGenerations])

  const loadMore = () => {
    if (isLoading || generations.length >= totalCount) return
    fetchGenerations(offset + limit)
  }

  const addGeneration = async (generation: Omit<GenerationInsert, 'user_id'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a generation.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newGeneration = await createGeneration({
        ...generation,
        user_id: user.id,
      })
      
      toast({
        title: 'Success',
        description: 'Generation created successfully.',
        variant: 'success',
      })
      
      return newGeneration
    } catch (err) {
      console.error('Error creating generation:', err)
      toast({
        title: 'Error',
        description: 'Failed to create generation. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editGeneration = async (generationId: string, updates: GenerationUpdate) => {
    try {
      setIsLoading(true)
      const updatedGeneration = await updateGeneration(generationId, updates)
      
      toast({
        title: 'Success',
        description: 'Generation updated successfully.',
        variant: 'success',
      })
      
      return updatedGeneration
    } catch (err) {
      console.error('Error updating generation:', err)
      toast({
        title: 'Error',
        description: 'Failed to update generation. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeGeneration = async (generationId: string) => {
    try {
      setIsLoading(true)
      await deleteGeneration(generationId)
      
      toast({
        title: 'Success',
        description: 'Generation deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting generation:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete generation. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generations,
    totalCount,
    isLoading,
    error,
    hasMore: generations.length < totalCount,
    loadMore,
    refresh: () => fetchGenerations(0),
    addGeneration,
    editGeneration,
    removeGeneration,
  }
}

export function useGenerationsByType(type: GenerationType, limit = 20) {
  const { user } = useAuth()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchGenerationsByType = useCallback(async (newOffset = 0) => {
    if (!user) {
      setGenerations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, count } = await getGenerationsByType(user.id, type, limit, newOffset)
      
      if (newOffset === 0) {
        setGenerations(data)
      } else {
        setGenerations(prev => [...prev, ...data])
      }
      
      setTotalCount(count || 0)
      setOffset(newOffset)
    } catch (err) {
      console.error(`Error fetching ${type} generations:`, err)
      setError(err instanceof Error ? err : new Error(`Failed to fetch ${type} generations`))
      toast({
        title: 'Error',
        description: `Failed to load ${type} generations. Please try again.`,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, type, limit, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeGenerations = async () => {
      if (!user) {
        if (isMounted) {
          setGenerations([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchGenerationsByType(0)
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToGenerations(user.id, (payload) => {
            // Only process events for the specified type
            if (payload.new?.type === type || payload.old?.type === type) {
              if (payload.new && !payload.old && payload.new.type === type) {
                // INSERT event
                setGenerations(prev => [payload.new, ...prev])
                setTotalCount(prev => prev + 1)
              } else if (payload.new && payload.old && payload.new.type === type) {
                // UPDATE event
                setGenerations(prev => 
                  prev.map(generation => generation.id === payload.new.id ? payload.new : generation)
                )
              } else if (!payload.new && payload.old && payload.old.type === type) {
                // DELETE event
                setGenerations(prev => 
                  prev.filter(generation => generation.id !== payload.old.id)
                )
                setTotalCount(prev => prev - 1)
              }
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error initializing ${type} generations:`, err)
        }
      }
    }

    initializeGenerations()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, type, fetchGenerationsByType])

  const loadMore = () => {
    if (isLoading || generations.length >= totalCount) return
    fetchGenerationsByType(offset + limit)
  }

  return {
    generations,
    totalCount,
    isLoading,
    error,
    hasMore: generations.length < totalCount,
    loadMore,
    refresh: () => fetchGenerationsByType(0),
  }
}

export function useProjectGenerations(projectId: string | undefined) {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const fetchProjectGenerations = useCallback(async () => {
    if (!projectId) {
      setGenerations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getProjectGenerations(projectId)
      setGenerations(data)
    } catch (err) {
      console.error('Error fetching project generations:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch project generations'))
      toast({
        title: 'Error',
        description: 'Failed to load project generations. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [projectId, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeGenerations = async () => {
      if (!projectId || !user) {
        if (isMounted) {
          setGenerations([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchProjectGenerations()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToGenerations(user.id, (payload) => {
            // Only process events for the specified project
            if (payload.new?.project_id === projectId || payload.old?.project_id === projectId) {
              if (payload.new && !payload.old && payload.new.project_id === projectId) {
                // INSERT event
                setGenerations(prev => [payload.new, ...prev])
              } else if (payload.new && payload.old && payload.new.project_id === projectId) {
                // UPDATE event
                setGenerations(prev => 
                  prev.map(generation => generation.id === payload.new.id ? payload.new : generation)
                )
              } else if (!payload.new && payload.old && payload.old.project_id === projectId) {
                // DELETE event
                setGenerations(prev => 
                  prev.filter(generation => generation.id !== payload.old.id)
                )
              }
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing project generations:', err)
        }
      }
    }

    initializeGenerations()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, projectId, fetchProjectGenerations])

  return {
    generations,
    isLoading,
    error,
    refresh: fetchProjectGenerations,
  }
}

export function useGeneration(generationId: string | undefined) {
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true

    const fetchGeneration = async () => {
      if (!generationId) {
        if (isMounted) {
          setGeneration(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getGeneration(generationId)
        
        if (isMounted) {
          setGeneration(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching generation:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch generation'))
          toast({
            title: 'Error',
            description: 'Failed to load generation. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchGeneration()

    return () => {
      isMounted = false
    }
  }, [generationId, toast])

  const updateGenerationDetails = async (updates: GenerationUpdate) => {
    if (!generationId) {
      toast({
        title: 'Error',
        description: 'Generation ID is required to update a generation.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedGeneration = await updateGeneration(generationId, updates)
      
      toast({
        title: 'Success',
        description: 'Generation updated successfully.',
        variant: 'success',
      })
      
      return updatedGeneration
    } catch (err) {
      console.error('Error updating generation:', err)
      toast({
        title: 'Error',
        description: 'Failed to update generation. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteGenerationById = async () => {
    if (!generationId) {
      toast({
        title: 'Error',
        description: 'Generation ID is required to delete a generation.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteGeneration(generationId)
      
      toast({
        title: 'Success',
        description: 'Generation deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting generation:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete generation. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generation,
    isLoading,
    error,
    updateGeneration: updateGenerationDetails,
    deleteGeneration: deleteGenerationById,
  }
}

export function useStorageUsage() {
  const { user } = useAuth()
  const [storageUsage, setStorageUsage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchStorageUsage = useCallback(async () => {
    if (!user) {
      setStorageUsage(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getUserStorageUsage(user.id)
      setStorageUsage(data)
    } catch (err) {
      console.error('Error fetching storage usage:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch storage usage'))
      toast({
        title: 'Error',
        description: 'Failed to load storage usage. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    fetchStorageUsage()
  }, [fetchStorageUsage])

  return {
    storageUsage,
    isLoading,
    error,
    refresh: fetchStorageUsage,
    // Helper function to format the storage usage
    formattedUsage: () => {
      if (storageUsage < 1024) {
        return `${storageUsage} B`
      } else if (storageUsage < 1024 * 1024) {
        return `${(storageUsage / 1024).toFixed(2)} KB`
      } else if (storageUsage < 1024 * 1024 * 1024) {
        return `${(storageUsage / (1024 * 1024)).toFixed(2)} MB`
      } else {
        return `${(storageUsage / (1024 * 1024 * 1024)).toFixed(2)} GB`
      }
    },
  }
}
