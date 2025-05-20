"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject, 
  subscribeToProjects,
  Project, 
  ProjectInsert,
  ProjectUpdate 
} from '@/lib/db/projects'
import { useToast } from '@/hooks/use-toast'

export function useProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getProjects(user.id)
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'))
      toast({
        title: 'Error',
        description: 'Failed to load projects. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const initializeProjects = async () => {
      if (!user) {
        if (isMounted) {
          setProjects([])
          setIsLoading(false)
        }
        return
      }

      try {
        await fetchProjects()
        
        if (isMounted) {
          // Set up real-time subscription
          unsubscribe = subscribeToProjects(user.id, (payload) => {
            if (payload.new && !payload.old) {
              // INSERT event
              setProjects(prev => [payload.new, ...prev])
            } else if (payload.new && payload.old) {
              // UPDATE event
              setProjects(prev => 
                prev.map(project => project.id === payload.new.id ? payload.new : project)
              )
            } else if (!payload.new && payload.old) {
              // DELETE event
              setProjects(prev => 
                prev.filter(project => project.id !== payload.old.id)
              )
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing projects:', err)
        }
      }
    }

    initializeProjects()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, fetchProjects])

  const addProject = async (project: Omit<ProjectInsert, 'user_id'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a project.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const newProject = await createProject({
        ...project,
        user_id: user.id,
      })
      
      toast({
        title: 'Success',
        description: 'Project created successfully.',
        variant: 'success',
      })
      
      return newProject
    } catch (err) {
      console.error('Error creating project:', err)
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const editProject = async (projectId: string, updates: ProjectUpdate) => {
    try {
      setIsLoading(true)
      const updatedProject = await updateProject(projectId, updates)
      
      toast({
        title: 'Success',
        description: 'Project updated successfully.',
        variant: 'success',
      })
      
      return updatedProject
    } catch (err) {
      console.error('Error updating project:', err)
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const removeProject = async (projectId: string) => {
    try {
      setIsLoading(true)
      await deleteProject(projectId)
      
      toast({
        title: 'Success',
        description: 'Project deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting project:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    addProject,
    editProject,
    removeProject,
  }
}

export function useProject(projectId: string | undefined) {
  const { user } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | undefined

    const fetchProject = async () => {
      if (!user || !projectId) {
        if (isMounted) {
          setProject(null)
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getProject(projectId)
        
        if (isMounted) {
          setProject(data)
          
          // Set up real-time subscription for this specific project
          unsubscribe = subscribeToProjects(user.id, (payload) => {
            if (payload.new && payload.new.id === projectId) {
              setProject(payload.new)
            } else if (!payload.new && payload.old && payload.old.id === projectId) {
              // Project was deleted
              setProject(null)
              toast({
                title: 'Project Deleted',
                description: 'This project has been deleted.',
                variant: 'default',
              })
            }
          })
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching project:', err)
          setError(err instanceof Error ? err : new Error('Failed to fetch project'))
          toast({
            title: 'Error',
            description: 'Failed to load project. Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProject()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user, projectId, toast])

  const updateProjectDetails = async (updates: ProjectUpdate) => {
    if (!projectId) {
      toast({
        title: 'Error',
        description: 'Project ID is required to update a project.',
        variant: 'destructive',
      })
      return null
    }

    try {
      setIsLoading(true)
      const updatedProject = await updateProject(projectId, updates)
      
      toast({
        title: 'Success',
        description: 'Project updated successfully.',
        variant: 'success',
      })
      
      return updatedProject
    } catch (err) {
      console.error('Error updating project:', err)
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProjectById = async () => {
    if (!projectId) {
      toast({
        title: 'Error',
        description: 'Project ID is required to delete a project.',
        variant: 'destructive',
      })
      return false
    }

    try {
      setIsLoading(true)
      await deleteProject(projectId)
      
      toast({
        title: 'Success',
        description: 'Project deleted successfully.',
        variant: 'success',
      })
      
      return true
    } catch (err) {
      console.error('Error deleting project:', err)
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    project,
    isLoading,
    error,
    updateProject: updateProjectDetails,
    deleteProject: deleteProjectById,
  }
}
