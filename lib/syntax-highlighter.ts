"use server"

import type { Highlighter } from "shiki"
import { getHighlighter } from "shiki/bundle/web"

let highlighter: Highlighter | null = null

export async function highlightCode(code: string, language = "typescript") {
  // Initialize highlighter if not already done
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ["github-dark"],
      langs: ["typescript", "javascript", "jsx", "tsx", "html", "css", "json", "markdown", "bash", "shell"],
    })
  }

  try {
    // Fallback to typescript if language not supported
    const lang = highlighter.getLoadedLanguages().includes(language as any) ? language : "typescript"

    // Highlight the code
    const html = highlighter.codeToHtml(code, {
      lang,
      theme: "github-dark",
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
