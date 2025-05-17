"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Save } from "lucide-react"
import { MarkdownEditor } from "./markdown-editor"
import { MarkdownPreview } from "./markdown-preview"
import { HistoryPanel } from "./history-panel"
import { ContentSaveStatus } from "./content-save-status"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

export interface ContentVersion {
  id: string
  content: string
  timestamp: number
  wordCount: number
}

export interface ContentEditorProps {
  projectId: string
  initialContent?: string
  onSave?: (content: string) => Promise<void>
  onAIRegenerate?: (content: string) => Promise<string>
  className?: string
}

export function ContentEditor({
  projectId,
  initialContent = "",
  onSave,
  onAIRegenerate,
  className,
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [activeTab, setActiveTab] = useState("editor")
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved")
  const [isRegenerating, setIsRegenerating] = useState(false)
  const lastSavedContent = useRef(initialContent)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Local storage key for this specific project's history
  const historyStorageKey = `creavibe-content-history-${projectId}`

  // Get history from local storage
  const [history, setHistory] = useLocalStorage<ContentVersion[]>(historyStorageKey, [])

  // Initialize history if empty
  useEffect(() => {
    if (history.length === 0 && initialContent) {
      const initialVersion: ContentVersion = {
        id: Date.now().toString(),
        content: initialContent,
        timestamp: Date.now(),
        wordCount: countWords(initialContent),
      }
      setHistory([initialVersion])
    }
  }, [history, initialContent, setHistory])

  // Function to count words in content
  function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setSaveStatus("unsaved")

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set a new timeout for autosave
    saveTimeoutRef.current = setTimeout(() => {
      saveContent(newContent)
    }, 5000) // Autosave after 5 seconds of inactivity
  }

  // Save content function
  const saveContent = async (contentToSave: string) => {
    if (contentToSave === lastSavedContent.current) {
      return // Don't save if content hasn't changed
    }

    setSaveStatus("saving")

    try {
      // Call the onSave callback if provided
      if (onSave) {
        await onSave(contentToSave)
      }

      // Create a new version for history
      const newVersion: ContentVersion = {
        id: Date.now().toString(),
        content: contentToSave,
        timestamp: Date.now(),
        wordCount: countWords(contentToSave),
      }

      // Update history (limit to last 50 versions)
      setHistory((prev) => [newVersion, ...prev].slice(0, 50))

      // Update last saved content
      lastSavedContent.current = contentToSave

      setSaveStatus("saved")
      toast({
        title: "Content saved",
        description: "Your content has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving content:", error)
      setSaveStatus("unsaved")
      toast({
        title: "Save failed",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Manual save function
  const handleManualSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }
    saveContent(content)
  }

  // Restore from history
  const handleRestore = (version: ContentVersion) => {
    setContent(version.content)
    setActiveTab("editor")
    setSaveStatus("unsaved")
    toast({
      title: "Version restored",
      description: `Content from ${new Date(version.timestamp).toLocaleString()} has been restored.`,
    })
  }

  // AI regeneration
  const handleAIRegenerate = async () => {
    if (!onAIRegenerate) {
      toast({
        title: "AI regeneration not available",
        description: "This feature is not available in the current context.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsRegenerating(true)
      const regeneratedContent = await onAIRegenerate(content)
      setContent(regeneratedContent)
      setSaveStatus("unsaved")
      toast({
        title: "Content regenerated",
        description: "AI has successfully regenerated your content.",
      })
    } catch (error) {
      console.error("Error regenerating content:", error)
      toast({
        title: "Regeneration failed",
        description: "There was an error regenerating your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      // Save any unsaved changes when component unmounts
      if (content !== lastSavedContent.current) {
        saveContent(content)
      }
    }
  }, [content])

  // Warn user before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (content !== lastSavedContent.current) {
        const message = "You have unsaved changes. Are you sure you want to leave?"
        e.returnValue = message
        return message
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [content])

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 ml-4">
          <ContentSaveStatus status={saveStatus} />

          <Button
            variant="outline"
            size="sm"
            onClick={handleManualSave}
            disabled={saveStatus === "saving" || content === lastSavedContent.current}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleAIRegenerate}
            disabled={isRegenerating}
            className="bg-primary text-primary-foreground"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isRegenerating ? "Regenerating..." : "AI Regenerate"}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[500px]">
        <TabsContent value="editor" className="mt-0 h-full">
          <MarkdownEditor value={content} onChange={handleContentChange} />
        </TabsContent>

        <TabsContent value="preview" className="mt-0 h-full">
          <MarkdownPreview content={content} />
        </TabsContent>

        <TabsContent value="history" className="mt-0 h-full">
          <HistoryPanel history={history} currentContent={content} onRestore={handleRestore} />
        </TabsContent>
      </div>
    </div>
  )
}
