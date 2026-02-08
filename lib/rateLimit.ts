/**
 * Rate Limiting Utility
 *
 * Simple in-memory rate limiter for server actions.
 * Uses email or identifier to track request counts within a time window.
 */

/**
 * Rate Limit Entry Structure
 */
interface RateLimitEntry {
  /** Number of requests made in the current window */
  count: number
  /** Timestamp when the current window expires */
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Check if a request is allowed based on rate limiting rules.
 *
 * @param identifier - Unique identifier (e.g., email address)
 * @returns Object with allowed status and optional reset time
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean
  resetTime?: number
  remainingTime?: number
} {
  const now = Date.now()
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5')

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }

  // Get or create entry
  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetTime) {
    // New window - allow request
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true }
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    const remainingTime = Math.ceil((entry.resetTime - now) / 1000)
    return {
      allowed: false,
      resetTime: entry.resetTime,
      remainingTime,
    }
  }

  // Increment count and allow
  entry.count++
  return { allowed: true }
}
