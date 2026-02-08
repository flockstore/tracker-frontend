/**
 * Retry Utility with Exponential Backoff
 *
 * Retries a function multiple times with exponential backoff delays.
 */

/**
 * Retry a function with exponential backoff.
 *
 * @param fn - The async function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param initialDelayMs - Initial delay in milliseconds (default: 1000)
 * @returns The result of the function
 * @throws The last error if all retries fail
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // Don't delay after the last attempt
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s, 8s, etc.
        const delay = initialDelayMs * Math.pow(2, attempt)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  // All retries failed, throw the last error
  throw lastError
}
