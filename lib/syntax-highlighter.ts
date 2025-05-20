"use server"

// Import from the correct bundle location to avoid type errors
import * as shiki from 'shiki/bundle/web'
import type { Highlighter } from 'shiki/bundle/web'

// Using a promise to ensure singleton initialization
let highlighterPromise: Promise<Highlighter> | null = null

export async function highlightCode(code: string, language = "typescript") {
  try {
    // Initialize the highlighter promise only once
    if (!highlighterPromise) {
      highlighterPromise = shiki.createHighlighter({
        themes: ["github-dark"],
        langs: ["typescript", "javascript", "tsx", "jsx", "html", "css", "json", "markdown", "bash"],
      })
    }
    
    // Await the highlighter
    const highlighter = await highlighterPromise
    
    // Safely determine if language is supported
    const supportedLanguages = highlighter.getLoadedLanguages()
    const safeLanguage = typeof language === 'string' && 
      supportedLanguages.includes(language) ? 
      language : "typescript"
    
    // Highlight the code
    const html = highlighter.codeToHtml(code, {
      lang: safeLanguage,
      theme: "github-dark"
    })

    return html
  } catch (error) {
    console.error("Error highlighting code:", error)
    // Return pre-formatted code as fallback
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
