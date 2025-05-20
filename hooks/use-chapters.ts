"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getChapters, 
  getChapter, 
  createChapter, 
  updateChapter, 
  deleteChapter,
  reorderChapters,
  subscribeToChapters,
  subscribeToChapter,
  Chapter, 
  ChapterInsert,
  ChapterUpdate 
} from '@/lib/db/chapters'
import { useToast } from '@/hooks/use-toast'

export function useChapters(webbookId: string | undefined) {
  const { user } = useAuth()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchChapters = useCallback(async () => {
    if (!webbookId) {
      setChapters([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getChapters(webbookId)
      setChapters(data)
    } catch (err) {
      console.error('Error fetching chapters:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch chapters'))
      toast({
        title: 'Error',
        description: 'Failed to load chapters. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [webbookId, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeChapters = async () => {
      if (!webbookId) {
        if (isMounted) {
          setChapters([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchChapters()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToChapters(webbookId, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setChapters(prev => {
                const newChapters = [...prev, payload.new]
                return newChapters.sort((a, b) => a.order_index - b.order_index)
              })
            } else if (payload.new && payload.old) {
              // UPDATE event
              setChapters(prev => {
                const newChapters = prev.map(chapter => 
                  chapter.id === payload.new.id ? payload.new : chapter
                )
                return newChapters.sort((a, b) => a.order_index - b.order_index)
              })
            } else if (!payload.new && payload.old) {
              // DELETE event
              setChapters(prev => 
                prev.filter(chapter => chapter.id !== payload.old.id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing chapters:', err)
        }
      }
    }

    initializeChapters()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [webbookId, fetchChapters])

  const addChapter = async (chapter: Omit<ChapterInsert, 'webbook_id'>) => {
    if (!webbookId) {
      toast({
        title: 'Error',
        description: 'Webbook ID is required to create a chapter.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newChapter = await createChapter({
        ...chapter,
        webbook_id: webbookId,
      })
      
      toast({
        title: 'Success',
        description: 'Chapter created successfully.',
        variant: 'success',
      })
      
      return newChapter
    } catch (err) {
      console.error('Error creating chapter:', err)
      toast({
        title: 'Error',
        description: 'Failed to create chapter. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editChapter = async (chapterId: string, updates: ChapterUpdate) => {
    try {
      setIsLoading(true)
      const updatedChapter = await updateChapter(chapterId, updates)
      
      toast({
        title: 'Success',
        description: 'Chapter updated successfully.',
        variant: 'success',
      })
      
      return updatedChapter
    } catch (err) {
      console.error('Error updating chapter:', err)
      toast({
        title: 'Error',
        description: 'Failed to update chapter. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeChapter = async (chapterId: string) => {
    try {
      setIsLoading(true)
      await deleteChapter(chapterId)
      
      toast({
        title: 'Success',
        description: 'Chapter deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting chapter:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete chapter. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const reorderChaptersList = async (chapterIds: string[]) => {
    if (!webbookId) {
      toast({
        title: 'Error',
        description: 'Webbook ID is required to reorder chapters.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedChapters = await reorderChapters(webbookId, chapterIds)
      
      toast({
        title: 'Success',
        description: 'Chapters reordered successfully.',
        variant: 'success',
      })
      
      return updatedChapters
    } catch (err) {
      console.error('Error reordering chapters:', err)
      toast({
        title: 'Error',
        description: 'Failed to reorder chapters. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    chapters,
    isLoading,
    error,
    fetchChapters,
    addChapter,
    editChapter,
    removeChapter,
    reorderChapters: reorderChaptersList,
  }
}

export function useChapter(chapterId: string | undefined) {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const fetchChapter = async () => {
      if (!chapterId) {
        if (isMounted) {
          setChapter(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getChapter(chapterId)
        
        if (isMounted) {
          setChapter(data)
          
          // Set up real-time subscription for this specific chapter
          unsubscribe = subscribeToChapter(chapterId, (payload) => {
            if (payload.new) {
              setChapter(payload.new)
            } else if (!payload.new && payload.old) {
              // Chapter was deleted
              setChapter(null)
              toast({
                title: 'Chapter Deleted',
                description: 'This chapter has been deleted.',
                variant: 'default',
              })
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching chapter:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch chapter'))
          toast({
            title: 'Error',
            description: 'Failed to load chapter. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchChapter()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [chapterId, toast])

  const updateChapterContent = async (updates: ChapterUpdate) => {
    if (!chapterId) {
      toast({
        title: 'Error',
        description: 'Chapter ID is required to update a chapter.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedChapter = await updateChapter(chapterId, updates)
      
      toast({
        title: 'Success',
        description: 'Chapter updated successfully.',
        variant: 'success',
      })
      
      return updatedChapter
    } catch (err) {
      console.error('Error updating chapter:', err)
      toast({
        title: 'Error',
        description: 'Failed to update chapter. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteChapterById = async () => {
    if (!chapterId) {
      toast({
        title: 'Error',
        description: 'Chapter ID is required to delete a chapter.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteChapter(chapterId)
      
      toast({
        title: 'Success',
        description: 'Chapter deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting chapter:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete chapter. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    chapter,
    isLoading,
    error,
    updateChapter: updateChapterContent,
    deleteChapter: deleteChapterById,
  }
}
