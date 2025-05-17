"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/header"
import { TemplateLibraryHeader } from "@/components/templates/template-library-header"
import { TemplateGrid } from "@/components/templates/template-grid"
import { TemplateFilters } from "@/components/templates/template-filters"
import { EmptyTemplates } from "@/components/templates/empty-templates"
import type { Template } from "@/types/templates"
import { mockTemplates, templateCategories } from "@/lib/mock-data"

export default function TemplatesPage() {
  const { user, signOut } = useAuth()
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Fetch templates
  useEffect(() => {
    // In a real app, you would fetch templates from an API
    // For demo purposes, we'll use mock data
    const fetchTemplates = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setTemplates(mockTemplates)
      } catch (error) {
        console.error("Error fetching templates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  // Filter templates based on category and search query
  useEffect(() => {
    let filtered = templates

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((template) => template.category.id === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.category.name.toLowerCase().includes(query),
      )
    }

    setFilteredTemplates(filtered)
  }, [templates, selectedCategory, searchQuery])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle use template
  const handleUseTemplate = (templateId: string) => {
    // In a real app, you would redirect to the editor with the template
    console.log(`Using template: ${templateId}`)
    // For demo purposes, we'll just log the action
    alert(`Template ${templateId} selected! In a real app, this would open the editor with the template.`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <DashboardHeader
        displayName={user?.email?.split("@")[0] || "User"}
        avatarUrl={null}
        currentTime={currentTime}
        onSignOut={signOut}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <TemplateLibraryHeader />

        <div className="mb-8">
          <TemplateFilters
            categories={templateCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </div>

        {loading ? (
          <TemplateGrid loading={true} templates={[]} onUseTemplate={handleUseTemplate} />
        ) : filteredTemplates.length > 0 ? (
          <TemplateGrid loading={false} templates={filteredTemplates} onUseTemplate={handleUseTemplate} />
        ) : (
          <EmptyTemplates
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearFilters={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
          />
        )}
      </main>
    </div>
  )
}
