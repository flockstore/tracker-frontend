/**
 * API Error Response
 *
 * Standard error response from the API.
 */
export interface ApiError {
  /** Message is the error description */
  message: string
  /** RayID is the unique request identifier for debugging/tracing */
  /** RayID is the unique request identifier for debugging/tracing */
  ray_id: string
  /** HTTP status code (optional) */
  status?: number
}

/**
 * API Response Wrapper
 *
 * Generic wrapper for successful API responses.
 */
export type ApiResponse<T> =
  | {
    success: true
    data: T
  }
  | {
    success: false
    error: ApiError
  }

/**
 * Validation Error
 *
 * Client-side validation error.
 */
export interface ValidationError {
  field: string
  message: string
}
