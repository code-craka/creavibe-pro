"use client"

import { useState, useEffect, useRef } from "react"

// Sample book content
const sampleBookContent = {
  title: "The Art of Content Creation",
  author: "Jane Smith",
  chapters: [
    {
      id: "intro",
      title: "Introduction",
      content: `
        <h1>Introduction</h1>
        <p>Welcome to "The Art of Content Creation." In this comprehensive guide, we'll explore the fundamentals of creating engaging, valuable content in the digital age.</p>
        <p>Content creation has evolved from a niche skill to an essential part of modern communication. Whether you're a marketer, educator, entrepreneur, or creative professional, understanding how to craft compelling content is crucial for connecting with your audience.</p>
        <h2>Why Content Matters</h2>
        <p>In today's information-rich environment, quality content serves as the currency of the internet. It's how we share ideas, build relationships, and establish authority in our respective fields.</p>
        <p>Throughout this book, we'll examine various content formats, strategies, and best practices to help you develop your unique voice and create content that resonates with your target audience.</p>
      `,
    },
    {
      id: "chapter1",
      title: "Understanding Your Audience",
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
    },
    {
      id: "chapter2",
      title: "Content Strategy Fundamentals",
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
    },
    {
      id: "chapter3",
      title: "Writing Compelling Content",
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
    },
  ],
}

export function WebBookRenderer() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [fontSize, setFontSize] = useState(16)
  const [theme, setTheme] = useState("light")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [showHighlighter, setShowHighlighter] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState({})
  const [highlights, setHighlights] = useState([])
  const [bookmarks, setBookmarks] = useState([])

  const contentRef = useRef(null)
  const containerRef = useRef(null)

  // Handle chapter navigation
  const goToNextChapter = () => {
    if (currentChapter < sampleBookContent.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
    setFullscreen(!fullscreen)
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const results = []
    sampleBookContent.chapters.forEach((chapter, chapterIndex) => {
      const content = chapter.content.toLowerCase()
      const query = searchQuery.toLowerCase()

      if (content.includes(query)) {
        // Find all occurrences
        let index = content.indexOf(query)
        while (index !== -1) {
          const start = Math.max(0, index - 40)
          const end = Math.min(content.length, index + query.length + 40)
          let excerpt = content.substring(start, end)

          if (start > 0) excerpt = "..." + excerpt
          if (end < content.length) excerpt = excerpt + "..."

          results.push({
            chapterIndex,
            chapterTitle: chapter.title,
            excerpt,
          })

          index = content.indexOf(query, index + 1)
        }
      }
    })

    setSearchResults(results)
  }

  // Handle bookmark toggle
  const toggleBookmark = () => {
    const currentChapterData = sampleBookContent.chapters[currentChapter]
    const isBookmarked = bookmarks.some((b) => b.id === currentChapterData.id)

    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.id !== currentChapterData.id))
    } else {
      setBookmarks([
        ...bookmarks,
        {
          id: currentChapterData.id,
          title: currentChapterData.title,
          chapterIndex: currentChapter,
        },
      ])
    }
  }

  // Handle note saving
  const saveNote = () => {
    if (!note.trim()) return

    const chapterId = sampleBookContent.chapters[currentChapter].id
    setNotes({
      ...notes,
      [chapterId]: [
        ...(notes[chapterId] || []),
        {
          id: Date.now(),
          text: note,
          timestamp: new Date().toISOString(),
        },
      ],
    })

    setNote("")
  }

  // Handle text highlighting
  const handleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString().trim() === "") return

    const range = selection.getRangeAt(0)
    const selectedText = selection.toString()
    const chapterId = sampleBookContent.chapters[currentChapter].id

    // In a real app, you would need to store the exact position
    // Here we just store the text for demonstration
    setHighlights([
      ...highlights,
      {
        id: Date.now(),
        chapterId,
        text: selectedText,
        color: "yellow",
      },
    ])

    // Clear selection
    selection.removeAllRanges()
    setShowHighlighter(false)
  }

  // Check if current chapter is bookmarked
  const isCurrentChapterBookmarked = () => {
    const currentChapterData = sampleBookContent.chapters[currentChapter]
    return bookmarks.some((b) => b.id === currentChapterData.id)
  }

  // Get current chapter notes
  const getCurrentChapterNotes = () => {
    const chapterId = sampleBookContent.chapters[currentChapter].id
    return notes[chapterId] || []
  }

  // Get current chapter highlights
  const getCurrentChapterHighlights = () => {
    const chapterId = sampleBookContent.chapters[currentChapter].id
    return highlights.filter((h) => h.chapterId === chapterId)
  }

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: sampleBookContent.title,
        text: `Check out this chapter: ${sampleBookContent.chapters[currentChapter].title}`,
        url: window.location.href,
      })
    } else {
      alert("Share functionality is not available in your browser")
    }
  }

  // Apply theme class
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.className = `prose max-w-none ${theme === "dark" ? "prose-invert" : theme === "sepia" ? "prose-sepia" : ""}`
      contentRef.current.style.fontSize = `${fontSize}px`
    }
  }, [theme, fontSize, currentChapter])

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])
}
