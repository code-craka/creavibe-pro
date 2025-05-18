/**
 * Utilities for safely handling JSON operations
 */

/**
 * Safely parse JSON with error handling
 * @param text The JSON string to parse
 * @param fallback Optional fallback value if parsing fails
 * @returns The parsed JSON object or the fallback value
 */
export function safeJsonParse<T>(text: string, fallback?: T): T | null {
  if (!text) return fallback || null

  try {
    return JSON.parse(text) as T
  } catch (error) {
    console.error("JSON Parse Error:", error)
    console.error("Failed to parse:", text)
    return fallback || null
  }
}

/**
 * Safely stringify JSON with error handling
 * @param data The data to stringify
 * @param replacer Optional replacer function
 * @param space Optional spacing for pretty printing
 * @returns The JSON string or an empty string if stringification fails
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
    return ""
  }
}

/**
 * Validates if a string is valid JSON
 * @param text The string to validate
 * @returns True if the string is valid JSON, false otherwise
 */
export function isValidJson(text: string): boolean {
  if (!text) return false

  try {
    JSON.parse(text)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Safely handles JSON responses from fetch requests
 * @param response The fetch response object
 * @returns The parsed JSON data or null
 */
export async function safeJsonResponse<T>(response: Response): Promise<T | null> {
  try {
    const text = await response.text()
    if (!text) return null
    return safeJsonParse<T>(text)
  } catch (error) {
    console.error("Error handling JSON response:", error)
    return null
  }
}
