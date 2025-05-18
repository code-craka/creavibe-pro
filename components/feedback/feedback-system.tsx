"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Clock, Filter, MessageSquare, Plus, Search, Star, ThumbsDown, ThumbsUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Types
interface Feedback {
  id: string
  userId: string
  userName: string
  userAvatar: string
  type: "bug" | "feature" | "improvement" | "question" | "other"
  title: string
  description: string
  rating?: number
  status: "new" | "in-progress" | "resolved" | "closed"
  category: string
  priority: "low" | "medium" | "high" | "critical"
  createdAt: string
  updatedAt: string
  responses: FeedbackResponse[]
  votes: {
    upvotes: number
    downvotes: number
  }
  tags: string[]
  screenshots?: string[]
  userVote?: "up" | "down" | null
}

interface FeedbackResponse {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  isStaff: boolean
}

// Mock data
const mockFeedback: Feedback[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "/abstract-geometric-shapes.png",
    type: "bug",
    title: "Editor crashes when pasting large content",
    description:
      "When I try to paste content that's larger than 1000 words, the editor freezes and then crashes. This happens consistently in Chrome and Firefox.",
    status: "in-progress",
    category: "Editor",
    priority: "high",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-16T14:45:00Z",
    responses: [
      {
        id: "resp1",
        userId: "staff1",
        userName: "Support Team",
        userAvatar: "/diverse-office-staff.png",
        content:
          "Thank you for reporting this issue. We've been able to reproduce it and our development team is working on a fix. We'll update you when it's resolved.",
        createdAt: "2023-06-16T09:20:00Z",
        isStaff: true,
      },
    ],
    votes: {
      upvotes: 12,
      downvotes: 0,
    },
    tags: ["bug", "editor", "performance"],
    userVote: "up",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Miller",
    userAvatar: "/abstract-geometric-shapes.png",
    type: "feature",
    title: "Add dark mode support",
    description:
      "It would be great to have a dark mode option for the application. This would reduce eye strain when working at night and would be a great accessibility feature.",
    rating: 4,
    status: "new",
    category: "UI/UX",
    priority: "medium",
    createdAt: "2023-06-14T15:45:00Z",
    updatedAt: "2023-06-14T15:45:00Z",
    responses: [],
    votes: {
      upvotes: 24,
      downvotes: 2,
    },
    tags: ["feature-request", "dark-mode", "accessibility"],
    userVote: null,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Michael Chen",
    userAvatar: "/diverse-group-collaborating.png",
    type: "improvement",
    title: "Improve loading time for large projects",
    description:
      "When opening projects with more than 20 files, the loading time is very slow. It can take up to 30 seconds to fully load all the files and resources.",
    rating: 3,
    status: "resolved",
    category: "Performance",
    priority: "high",
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-12T11:30:00Z",
    responses: [
      {
        id: "resp2",
        userId: "staff1",
        userName: "Support Team",
        userAvatar: "/diverse-office-staff.png",
        content:
          "We've identified the issue causing the slow loading times and have implemented a fix in our latest update (v2.3.0). Please update to the latest version and let us know if you're still experiencing issues.",
        createdAt: "2023-06-11T14:25:00Z",
        isStaff: true,
      },
      {
        id: "resp3",
        userId: "user3",
        userName: "Michael Chen",
        userAvatar: "/diverse-group-collaborating.png",
        content: "Thanks for the quick fix! I've updated to v2.3.0 and the loading time is much better now.",
        createdAt: "2023-06-12T10:15:00Z",
        isStaff: false,
      },
    ],
    votes: {
      upvotes: 8,
      downvotes: 1,
    },
    tags: ["performance", "loading", "optimization"],
    userVote: null,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emily Rodriguez",
    userAvatar: "/abstract-geometric-shapes.png",
    type: "question",
    title: "How to export projects in different formats?",
    description:
      "I need to export my project in PDF and DOCX formats, but I can only find the option to export as PDF. Is there a way to export in other formats?",
    status: "closed",
    category: "Export",
    priority: "low",
    createdAt: "2023-06-08T16:20:00Z",
    updatedAt: "2023-06-09T10:05:00Z",
    responses: [
      {
        id: "resp4",
        userId: "staff2",
        userName: "Product Team",
        userAvatar: "/diverse-office-team.png",
        content:
          "Currently, we only support PDF exports in the standard version. DOCX and other formats are available in the Pro version. You can upgrade your account to access these features.",
        createdAt: "2023-06-09T09:45:00Z",
        isStaff: true,
      },
    ],
    votes: {
      upvotes: 3,
      downvotes: 0,
    },
    tags: ["export", "formats", "question"],
    userVote: null,
  },
  {
    id: "5",
    userId: "user5",
    userName: "David Wilson",
    userAvatar: "/abstract-geometric-shapes.png",
    type: "feature",
    title: "Add collaboration features",
    description:
      "It would be great to have real-time collaboration features similar to Google Docs. This would make it easier for teams to work together on projects.",
    rating: 5,
    status: "new",
    category: "Collaboration",
    priority: "medium",
    createdAt: "2023-06-05T11:30:00Z",
    updatedAt: "2023-06-05T11:30:00Z",
    responses: [],
    votes: {
      upvotes: 35,
      downvotes: 1,
    },
    tags: ["feature-request", "collaboration", "teams"],
    userVote: "up",
  },
]

const categories = [
  "All Categories",
  "Editor",
  "UI/UX",
  "Performance",
  "Export",
  "Collaboration",
  "Authentication",
  "Billing",
  "Other",
]

const feedbackTypes = [
  { value: "all", label: "All Types" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "improvement", label: "Improvement" },
  { value: "question", label: "Question" },
  { value: "other", label: "Other" },
]

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
]

interface FeedbackSystemProps {
  variant?: "embedded" | "standalone"
  initialTab?: "submit" | "browse"
  contextualInfo?: {
    page?: string
    feature?: string
    category?: string
  }
}

export function FeedbackSystem({ variant = "standalone", initialTab = "browse", contextualInfo }: FeedbackSystemProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(mockFeedback)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [isRespondingToFeedback, setIsRespondingToFeedback] = useState(false)
  const [newFeedback, setNewFeedback] = useState({
    type: contextualInfo?.category ? contextualInfo.category : "bug",
    title: "",
    description: "",
    category: contextualInfo?.feature || "",
    rating: 0,
    tags: [] as string[],
    screenshots: [] as string[],
  })
  const [newResponse, setNewResponse] = useState("")
  const [newTag, setNewTag] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    category: "All Categories",
    searchQuery: "",
  })
  const [sortBy, setSortBy] = useState<"recent" | "votes" | "activity">("recent")
  const [showFilters, setShowFilters] = useState(false)

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    if (!newFeedback.title.trim() || !newFeedback.description.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and description for your feedback.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    const newFeedbackItem: Feedback = {
      id: `feedback-${Date.now()}`,
      userId: "current-user",
      userName: "Current User",
      userAvatar: "/abstract-user-representation.png",
      type: newFeedback.type as any,
      title: newFeedback.title,
      description: newFeedback.description,
      rating: newFeedback.type === "feature" || newFeedback.type === "improvement" ? newFeedback.rating : undefined,
      status: "new",
      category: newFeedback.category || "Other",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      votes: {
        upvotes: 1,
        downvotes: 0,
      },
      tags: newFeedback.tags,
      screenshots: newFeedback.screenshots,
      userVote: "up",
    }

    setFeedbackList([newFeedbackItem, ...feedbackList])

    // Reset form
    setNewFeedback({
      type: "bug",
      title: "",
      description: "",
      category: "",
      rating: 0,
      tags: [],
      screenshots: [],
    })

    setIsSubmittingFeedback(false)
    setActiveTab("browse")

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! Our team will review it shortly.",
    })
  }

  // Handle response submission
  const handleSubmitResponse = () => {
    if (!selectedFeedback || !newResponse.trim()) return

    const response: FeedbackResponse = {
      id: `resp-${Date.now()}`,
      userId: "current-user",
      userName: "Current User",
      userAvatar: "/abstract-user-representation.png",
      content: newResponse,
      createdAt: new Date().toISOString(),
      isStaff: false,
    }

    const updatedFeedback = {
      ...selectedFeedback,
      responses: [...selectedFeedback.responses, response],
      updatedAt: new Date().toISOString(),
    }

    setFeedbackList(feedbackList.map((item) => (item.id === selectedFeedback.id ? updatedFeedback : item)))
    setSelectedFeedback(updatedFeedback)
    setNewResponse("")
    setIsRespondingToFeedback(false)

    toast({
      title: "Response Added",
      description: "Your response has been added to the feedback.",
    })
  }

  // Handle vote
  const handleVote = (feedbackId: string, voteType: "up" | "down") => {
    setFeedbackList(
      feedbackList.map((item) => {
        if (item.id !== feedbackId) return item

        const currentVote = item.userVote
        let upvotes = item.votes.upvotes
        let downvotes = item.votes.downvotes

        // Remove current vote if exists
        if (currentVote === "up") upvotes--
        if (currentVote === "down") downvotes--

        // Add new vote if different from current
        if (currentVote !== voteType) {
          if (voteType === "up") upvotes++
          if (voteType === "down") downvotes++
        }

        return {
          ...item,
          votes: {
            upvotes,
            downvotes,
          },
          userVote: currentVote === voteType ? null : voteType,
        }
      }),
    )

    if (selectedFeedback && selectedFeedback.id === feedbackId) {
      const currentVote = selectedFeedback.userVote
      let upvotes = selectedFeedback.votes.upvotes
      let downvotes = selectedFeedback.votes.downvotes

      // Remove current vote if exists
      if (currentVote === "up") upvotes--
      if (currentVote === "down") downvotes--

      // Add new vote if different from current
      if (currentVote !== voteType) {
        if (voteType === "up") upvotes++
        if (voteType === "down") downvotes++
      }

      setSelectedFeedback({
        ...selectedFeedback,
        votes: {
          upvotes,
          downvotes,
        },
        userVote: currentVote === voteType ? null : voteType,
      })
    }
  }

  // Handle adding a tag
  const handleAddTag = () => {
    if (!newTag.trim()) return
    if (newFeedback.tags.includes(newTag.trim())) {
      toast({
        title: "Tag already exists",
        description: "This tag has already been added.",
        variant: "destructive",
      })
      return
    }

    setNewFeedback({
      ...newFeedback,
      tags: [...newFeedback.tags, newTag.trim()],
    })
    setNewTag("")
  }

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setNewFeedback({
      ...newFeedback,
      tags: newFeedback.tags.filter((t) => t !== tag),
    })
  }

  // Handle file upload for screenshots
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload these files to a server
    // For this example, we'll just use the file names
    const newScreenshots = Array.from(files).map((file) => URL.createObjectURL(file))

    setNewFeedback({
      ...newFeedback,
      screenshots: [...newFeedback.screenshots, ...newScreenshots],
    })
  }

  // Handle removing a screenshot
  const handleRemoveScreenshot = (screenshot: string) => {
    setNewFeedback({
      ...newFeedback,
      screenshots: newFeedback.screenshots.filter((s) => s !== screenshot),
    })
  }

  // Filter feedback items
  const filteredFeedback = feedbackList.filter((item) => {
    // Filter by type
    if (filters.type !== "all" && item.type !== filters.type) return false

    // Filter by status
    if (filters.status !== "all" && item.status !== filters.status) return false

    // Filter by category
    if (filters.category !== "All Categories" && item.category !== filters.category) return false

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Sort feedback items
  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "votes") {
      return b.votes.upvotes - b.votes.downvotes - (a.votes.upvotes - a.votes.downvotes)
    } else if (sortBy === "activity") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
    return 0
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "feature":
        return <Plus className="h-4 w-4 text-purple-500" />
      case "improvement":
        return <ThumbsUp className="h-4 w-4 text-blue-500" />
      case "question":
        return <MessageSquare className="h-4 w-4 text-yellow-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className={cn("bg-background", variant === "embedded" ? "rounded-lg border" : "")}>
      {variant === "standalone" && (
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Feedback Center</h1>
        </div>
      )}

      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <div
          className={cn(
            "flex justify-between items-center",
            variant === "embedded" ? "px-4 py-3 border-b" : "container mx-auto mb-6",
          )}
        >
          <TabsList>
            <TabsTrigger value="browse">Browse Feedback</TabsTrigger>
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          </TabsList>

          {activeTab === "browse" && (
            <div className="flex items-center gap-2">
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h3 className="font-medium">Filter Feedback</h3>

                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {feedbackTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters({ ...filters, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFilters({
                            type: "all",
                            status: "all",
                            category: "All Categories",
                            searchQuery: "",
                          })
                        }
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                  <SelectItem value="activity">Recent Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className={variant === "embedded" ? "p-4" : "container mx-auto pb-8"}>
          <TabsContent value="browse" className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-10"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              />
            </div>

            {/* Feedback List and Detail View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feedback List */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">
                  {filteredFeedback.length} {filteredFeedback.length === 1 ? "item" : "items"}
                </h2>

                <ScrollArea className={cn("pr-4", variant === "embedded" ? "h-[400px]" : "h-[600px]")}>
                  <div className="space-y-4">
                    {sortedFeedback.length > 0 ? (
                      sortedFeedback.map((item) => (
                        <Card
                          key={item.id}
                          className={cn(
                            "cursor-pointer hover:border-primary transition-colors",
                            selectedFeedback?.id === item.id && "border-primary",
                          )}
                          onClick={() => setSelectedFeedback(item)}
                        >
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                {getTypeIcon(item.type)}
                                <CardTitle className="text-base">{item.title}</CardTitle>
                              </div>
                              <div
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs text-white",
                                  getStatusColor(item.status),
                                )}
                              >
                                {item.status.replace("-", " ")}
                              </div>
                            </div>
                            <CardDescription className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              {formatDate(item.createdAt)}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <p className="text-sm line-clamp-2">{item.description}</p>

                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.tags.map((tag) => (
                                  <span key={tag} className="bg-muted text-xs px-2 py-0.5 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleVote(item.id, "up")
                                }}
                              >
                                <ThumbsUp className={cn("h-4 w-4 mr-1", item.userVote === "up" && "fill-current")} />
                                {item.votes.upvotes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleVote(item.id, "down")
                                }}
                              >
                                <ThumbsDown
                                  className={cn("h-4 w-4 mr-1", item.userVote === "down" && "fill-current")}
                                />
                                {item.votes.downvotes}
                              </Button>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageSquare className="h-4 w-4" />
                              {item.responses.length}
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No feedback found</h3>
                        <p className="text-muted-foreground mb-4">
                          {filters.searchQuery ||
                          filters.type !== "all" ||
                          filters.status !== "all" ||
                          filters.category !== "All Categories"
                            ? "Try adjusting your filters or search query."
                            : "Be the first to submit feedback!"}
                        </p>
                        {(filters.searchQuery ||
                          filters.type !== "all" ||
                          filters.status !== "all" ||
                          filters.category !== "All Categories") && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setFilters({
                                type: "all",
                                status: "all",
                                category: "All Categories",
                                searchQuery: "",
                              })
                            }
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Feedback Detail */}
              <div>
                {selectedFeedback ? (
                  <Card>
                    <CardHeader className="p-6 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(selectedFeedback.type)}
                            <CardTitle>{selectedFeedback.title}</CardTitle>
                          </div>
                          <CardDescription className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(selectedFeedback.createdAt)}
                          </CardDescription>
                        </div>
                        <div
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs text-white",
                            getStatusColor(selectedFeedback.status),
                          )}
                        >
                          {selectedFeedback.status.replace("-", " ")}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src={selectedFeedback.userAvatar || "/placeholder.svg"}
                          alt={selectedFeedback.userName}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm">{selectedFeedback.userName}</div>
                          <div className="text-xs text-muted-foreground">{selectedFeedback.category}</div>
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none dark:prose-invert mb-4">
                        {selectedFeedback.description.split("\n\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>

                      {selectedFeedback.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={cn(
                                "h-5 w-5",
                                index < selectedFeedback.rating!
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground",
                              )}
                            />
                          ))}
                          <span className="ml-2 text-sm">{selectedFeedback.rating}/5 rating</span>
                        </div>
                      )}

                      {selectedFeedback.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {selectedFeedback.tags.map((tag) => (
                            <span key={tag} className="bg-muted text-xs px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {selectedFeedback.screenshots && selectedFeedback.screenshots.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <h3 className="text-sm font-medium">Screenshots</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedFeedback.screenshots.map((screenshot, index) => (
                              <img
                                key={index}
                                src={screenshot || "/placeholder.svg"}
                                alt={`Screenshot ${index + 1}`}
                                className="rounded-md border object-cover w-full h-32"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVote(selectedFeedback.id, "up")}>
                            <ThumbsUp
                              className={cn("h-4 w-4 mr-1", selectedFeedback.userVote === "up" && "fill-current")}
                            />
                            {selectedFeedback.votes.upvotes}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleVote(selectedFeedback.id, "down")}>
                            <ThumbsDown
                              className={cn("h-4 w-4 mr-1", selectedFeedback.userVote === "down" && "fill-current")}
                            />
                            {selectedFeedback.votes.downvotes}
                          </Button>
                        </div>
                        <Dialog open={isRespondingToFeedback} onOpenChange={setIsRespondingToFeedback}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Respond to Feedback</DialogTitle>
                              <DialogDescription>Add your response to this feedback item.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Textarea
                                placeholder="Write your response..."
                                value={newResponse}
                                onChange={(e) => setNewResponse(e.target.value)}
                                className="min-h-[150px]"
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsRespondingToFeedback(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSubmitResponse}>Submit Response</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>

                    {/* Responses */}
                    {selectedFeedback.responses.length > 0 && (
                      <div className="border-t p-6">
                        <h3 className="font-medium mb-4">Responses ({selectedFeedback.responses.length})</h3>
                        <div className="space-y-4">
                          {selectedFeedback.responses.map((response) => (
                            <div key={response.id} className="flex gap-4">
                              <img
                                src={response.userAvatar || "/placeholder.svg"}
                                alt={response.userName}
                                className="h-8 w-8 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="font-medium text-sm">
                                    {response.userName}
                                    {response.isStaff && (
                                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                        Staff
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{formatDate(response.createdAt)}</div>
                                </div>
                                <div className="text-sm">{response.content}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Select a feedback item</h3>
                      <p className="text-muted-foreground">Choose a feedback item from the list to view its details.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Share your thoughts, report issues, or suggest improvements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="feedbackType">Feedback Type</Label>
                  <RadioGroup
                    id="feedbackType"
                    value={newFeedback.type}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, type: value })}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bug" id="bug" />
                      <Label htmlFor="bug" className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        Bug
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feature" id="feature" />
                      <Label htmlFor="feature" className="flex items-center gap-1">
                        <Plus className="h-4 w-4 text-purple-500" />
                        Feature
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="improvement" id="improvement" />
                      <Label htmlFor="improvement" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-blue-500" />
                        Improvement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="question" id="question" />
                      <Label htmlFor="question" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-yellow-500" />
                        Question
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your feedback"
                    value={newFeedback.title}
                    onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about your feedback..."
                    className="min-h-[150px]"
                    value={newFeedback.description}
                    onChange={(e) => setNewFeedback({ ...newFeedback, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newFeedback.category}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(newFeedback.type === "feature" || newFeedback.type === "improvement") && (
                  <div className="space-y-2">
                    <Label>Importance Rating</Label>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setNewFeedback({ ...newFeedback, rating: index + 1 })}
                        >
                          <Star
                            className={cn(
                              "h-6 w-6",
                              index < newFeedback.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground",
                            )}
                          />
                        </Button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {newFeedback.rating > 0 ? `${newFeedback.rating}/5` : "Not rated"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                  {newFeedback.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newFeedback.tags.map((tag) => (
                        <div key={tag} className="bg-muted flex items-center gap-1 px-2 py-1 rounded-full text-sm">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 rounded-full"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="screenshots">Screenshots (optional)</Label>
                  <Input id="screenshots" type="file" accept="image/*" multiple onChange={handleFileUpload} />
                  <p className="text-xs text-muted-foreground">
                    You can upload multiple images to help illustrate your feedback.
                  </p>

                  {newFeedback.screenshots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {newFeedback.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`Screenshot ${index + 1}`}
                            className="rounded-md border object-cover w-full h-24"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveScreenshot(screenshot)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("browse")}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
