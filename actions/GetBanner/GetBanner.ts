'use server'

import { apiFetch } from '@/lib/api/client'
import type { Banner } from '@/types/domain/Banner'
import type { ApiResponse, ApiError } from '@/types/api/Response'

/**
 * Get Banner Server Action
 *
 * Retrieves the active site-wide banner alert.
 *
 * @returns {Promise<ApiResponse<Banner>>} The banner data or error
 */
export async function getBanner(): Promise<ApiResponse<Banner>> {
  try {
    const banner = await apiFetch<Banner>('/banner')

    return {
      success: true,
      data: banner,
    }
  } catch (error) {
    // 404 means no banner, which is a valid state
    const apiError = error as ApiError
    if (apiError.status === 404) {
      return {
        success: true,
        data: null as unknown as Banner, // Valid null response
      }
    }

    return {
      success: false,
      error: apiError,
    }
  }
}
