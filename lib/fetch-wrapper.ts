/**
 * A wrapper around the fetch API that handles common error cases
 * and provides better error messages
 */
export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options)

    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    // Check if response is empty
    const text = await response.text()
    if (!text) {
      return null // Return null for empty responses instead of trying to parse
    }

    // Safely parse JSON
    try {
      return JSON.parse(text)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Response text:", text)
      throw new Error(`Failed to parse JSON response: ${parseError.message}`)
    }
  } catch (error) {
    console.error("Fetch Error:", error)
    throw error
  }
}

/**
 * Helper function to safely stringify JSON with error handling
 */
export function safeJsonStringify(
  data: any,
  replacer?: (key: string, value: any) => any,
  space?: string | number,
): string {
  try {
    return JSON.stringify(data, replacer, space)
  } catch (error) {
    console.error("JSON Stringify Error:", error)
    throw new Error(`Failed to stringify JSON data: ${error.message}`)
  }
}
