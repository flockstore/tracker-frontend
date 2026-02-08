import type { ApiError } from '@/types/api/Response'

/**
 * Base URL for API requests.
 * Defaults to localhost for development if not specified in environment variables.
 */
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080'

/**
 * API Fetch Wrapper
 *
 * Type-safe fetch wrapper with centralized error handling.
 *
 * @template T - The expected response data type
 * @param {string} endpoint - The API endpoint (e.g., '/orders/123')
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<T>} The parsed response data
 * @throws {ApiError} If the request fails
 */
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      const error = errorData as ApiError
      error.status = response.status
      throw error
    }

    return await response.json()
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      throw error as ApiError
    }

    throw {
      message: 'An unexpected error occurred',
      ray_id: 'unknown',
    } as ApiError
  }
}
