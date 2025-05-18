"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { TableOfContents } from "./table-of-contents"
import { ContentRenderer } from "./content-renderer"
import { TopBar } from "./top-bar"
import { NavigationControls } from "./navigation-controls"
import type { WebBook } from "@/types/web-book"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

// Sample book data for demonstration
const sampleBook: WebBook = {
  id: "1",
  title: "The Art of Content Creation",
  description: "A comprehensive guide to creating engaging content in the digital age",
  author: "Jane Smith",
  createdAt: "2023-01-15T12:00:00Z",
  updatedAt: "2023-03-20T14:30:00Z",
  isPublished: true,
  visibility: "public",
  theme: "light",
  fontFamily: "serif",
  fontSize: "16px",
  chapters: [
    {
      id: "intro",
      title: "Introduction",
      order: 1,
      content: `
        <h1>Introduction</h1>
        <p>Welcome to "The Art of Content Creation." In this comprehensive guide, we'll explore the fundamentals of creating engaging, valuable content in the digital age.</p>
        <p>Content creation has evolved from a niche skill to an essential part of modern communication. Whether you're a marketer, educator, entrepreneur, or creative professional, understanding how to craft compelling content is crucial for connecting with your audience.</p>
        <h2>Why Content Matters</h2>
        <p>In today's information-rich environment, quality content serves as the currency of the internet. It's how we share ideas, build relationships, and establish authority in our respective fields.</p>
        <p>Throughout this book, we'll examine various content formats, strategies, and best practices to help you develop your unique voice and create content that resonates with your target audience.</p>
      `,
      sections: [],
    },
    {
      id: "chapter1",
      title: "Understanding Your Audience",
      order: 2,
      content: `
        <h1>Understanding Your Audience</h1>
        <p>Before creating any piece of content, it's essential to have a clear understanding of who you're creating it for. This chapter explores methods for identifying, researching, and connecting with your target audience.</p>
        <h2>Audience Research Techniques</h2>
        <p>Effective audience research combines quantitative data with qualitative insights. Here are some approaches to consider:</p>
        <ul>
          <li>Demographic analysis</li>
          <li>Psychographic profiling</li>
          <li>Surveys and interviews</li>
          <li>Social media listening</li>
          <li>Competitive analysis</li>
        </ul>
        <p>By developing detailed audience personas, you can create content that addresses specific needs, answers relevant questions, and speaks in a voice that resonates with your readers.</p>
        <h2>The Empathy Factor</h2>
        <p>Understanding your audience goes beyond data points. True connection requires empathy—the ability to see the world from your audience's perspective.</p>
        <p>Ask yourself: What challenges do they face? What goals are they working toward? What language do they use to describe their experiences? How can your content make their lives better?</p>
      `,
      sections: [
        {
          id: "chapter1-section1",
          title: "Audience Research Techniques",
          content: "",
          order: 1,
        },
        {
          id: "chapter1-section2",
          title: "The Empathy Factor",
          content: "",
          order: 2,
        },
      ],
    },
    {
      id: "chapter2",
      title: "Content Strategy Fundamentals",
      order: 3,
      content: `
        <h1>Content Strategy Fundamentals</h1>
        <p>A coherent content strategy serves as the foundation for all your content creation efforts. This chapter covers the essential elements of developing a strategy that aligns with your goals and resonates with your audience.</p>
        <h2>Defining Your Content Mission</h2>
        <p>Every effective content strategy begins with a clear mission statement that answers three key questions:</p>
        <ol>
          <li>Who are you creating content for?</li>
          <li>What value will you provide through your content?</li>
          <li>What outcomes do you want to achieve?</li>
        </ol>
        <p>Your content mission should guide all your decisions, from topic selection to distribution channels.</p>
        <h2>Content Mapping</h2>
        <p>Content mapping involves planning content for different stages of the audience journey. Whether you're guiding customers through a sales funnel or readers through an educational process, your content should meet people where they are.</p>
        <p>Consider creating content for these journey stages:</p>
        <ul>
          <li>Awareness: Introducing concepts and addressing pain points</li>
          <li>Consideration: Providing deeper insights and comparative information</li>
          <li>Decision: Offering specific guidance and calls to action</li>
          <li>Retention: Supporting continued engagement and advanced applications</li>
        </ul>
      `,
      sections: [
        {
          id: "chapter2-section1",
          title: "Defining Your Content Mission",
          content: "",
          order: 1,
        },
        {
          id: "chapter2-section2",
          title: "Content Mapping",
          content: "",
          order: 2,
        },
      ],
    },
    {
      id: "chapter3",
      title: "Writing Compelling Content",
      order: 4,
      content: `
        <h1>Writing Compelling Content</h1>
        <p>The written word remains at the heart of most content strategies. This chapter explores techniques for crafting clear, engaging, and effective written content across various formats.</p>
        <h2>The Elements of Engaging Writing</h2>
        <p>Regardless of your subject matter or format, certain principles can make your writing more compelling:</p>
        <ul>
          <li><strong>Clarity:</strong> Express ideas in straightforward language</li>
          <li><strong>Conciseness:</strong> Respect your reader's time by being efficient with words</li>
          <li><strong>Coherence:</strong> Organize thoughts in a logical flow</li>
          <li><strong>Voice:</strong> Develop a consistent, authentic writing personality</li>
          <li><strong>Storytelling:</strong> Use narrative elements to create emotional connection</li>
        </ul>
        <h2>Headlines and Hooks</h2>
        <p>The first few words of any piece of content are crucial for capturing attention. Strong headlines and opening hooks should:</p>
        <ul>
          <li>Promise specific value</li>
          <li>Create curiosity</li>
          <li>Establish relevance to the reader's interests or needs</li>
          <li>Set appropriate expectations for what follows</li>
        </ul>
        <p>Remember that your headline is a promise to your reader. The content that follows must deliver on that promise.</p>
      `,
      sections: [
        {
          id: "chapter3-section1",
          title: "The Elements of Engaging Writing",
          content: "",
          order: 1,
        },
        {
          id: "chapter3-section2",
          title: "Headlines and Hooks",
          content: "",
          order: 2,
        },
      ],
    },
  ],
}

interface WebBookRendererProps {
  book?: WebBook
  onEditClick?: () => void
}

export function WebBookRenderer({ book = sampleBook, onEditClick }: WebBookRendererProps) {
  const [currentChapterId, setCurrentChapterId] = useState(book.chapters[0]?.id || "")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  // Find current chapter index
  const currentChapterIndex = book.chapters.findIndex((chapter) => chapter.id === currentChapterId)
  const currentChapter = book.chapters[currentChapterIndex]

  // Handle chapter navigation
  const goToNextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterId(book.chapters[currentChapterIndex + 1].id)
    }
  }

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterId(book.chapters[currentChapterIndex - 1].id)
    }
  }

  // Set up keyboard navigation
  useKeyboardNavigation({
    onNextChapter: goToNextChapter,
    onPreviousChapter: goToPreviousChapter,
  })

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Toggle publish state
  const togglePublish = () => {
    // In a real app, this would update the book's published state
    console.log("Toggle publish state")
  }

  // Handle edit click
  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick()
    } else {
      console.log("Edit in editor")
    }
  }

  // Close mobile nav when selecting a chapter on mobile
  const handleChapterSelect = (chapterId: string) => {
    setCurrentChapterId(chapterId)
    if (isMobile) {
      setMobileNavOpen(false)
    }
  }

  // Adjust sidebar based on screen size
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar
        book={book}
        onToggleSidebar={toggleSidebar}
        onToggleTheme={toggleTheme}
        isDarkTheme={theme === "dark"}
        onTogglePublish={togglePublish}
        onEditClick={handleEditClick}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div
            className={`border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 opacity-0 overflow-hidden"}`}
          >
            {sidebarOpen && (
              <TableOfContents
                chapters={book.chapters}
                currentChapterId={currentChapterId}
                onChapterSelect={handleChapterSelect}
              />
            )}
          </div>
        )}

        {/* Mobile Sidebar (Sheet) */}
        {isMobile && (
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
              <TableOfContents
                chapters={book.chapters}
                currentChapterId={currentChapterId}
                onChapterSelect={handleChapterSelect}
              />
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Chapter Title */}
          {isMobile && (
            <div className="px-4 py-2 border-b flex items-center">
              <Button variant="ghost" size="sm" className="mr-2 -ml-2" onClick={() => setMobileNavOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <h2 className="text-sm font-medium truncate">{currentChapter?.title}</h2>
            </div>
          )}

          {/* Content Renderer */}
          <div className="flex-1 overflow-hidden">
            <ContentRenderer
              content={currentChapter?.content || ""}
              fontSize={book.fontSize}
              fontFamily={book.fontFamily}
            />
          </div>

          {/* Navigation Controls */}
          <NavigationControls
            chapters={book.chapters}
            currentChapterIndex={currentChapterIndex}
            onNextChapter={goToNextChapter}
            onPreviousChapter={goToPreviousChapter}
          />
        </div>
      </div>
    </div>
  )
}
