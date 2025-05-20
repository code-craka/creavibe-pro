/**
 * A wrapper around the fetch API that handles common error cases
 * and provides better error messages
 */
export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T | null> {
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
      return JSON.parse(text) as T
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Response text:", text)
      // Add proper type guard for unknown error
      if (parseError instanceof Error) {
        throw new Error(`Failed to parse JSON response: ${parseError.message}`)
      } else {
        throw new Error(`Failed to parse JSON response: Unknown parsing error`)
      }
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
  data: unknown,
  replacer?: (key: string, value: unknown) => unknown | undefined,
  space?: string | number,
): string {
  try {
    return JSON.stringify(data, replacer, space)
  } catch (error) {
    console.error("JSON Stringify Error:", error)
    // Add proper type guard for unknown error
    if (error instanceof Error) {
      throw new Error(`Failed to stringify JSON data: ${error.message}`)
    } else {
      throw new Error(`Failed to stringify JSON data: Unknown error occurred`)
    }
  }
}
