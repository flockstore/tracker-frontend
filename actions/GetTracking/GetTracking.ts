'use server'

import { apiFetch } from '@/lib/api/client'
import type { TrackingHistory } from '@/types/domain/Tracking'
import type { ApiResponse, ApiError } from '@/types/api/Response'

/**
 * Get Tracking Input
 */
export interface GetTrackingInput {
  trackingNumber: string
  courier: string
}

/**
 * Get Tracking Server Action
 *
 * Retrieves the complete tracking history for a given tracking number and courier.
 * This server action proxies the request to the backend API,
 * hiding the real endpoint from the client.
 *
 * @param {GetTrackingInput} input - The tracking number and courier
 * @returns {Promise<ApiResponse<TrackingHistory>>} The tracking history or error
 */
export async function getTracking(input: GetTrackingInput): Promise<ApiResponse<TrackingHistory>> {
  try {
    // Validate inputs
    if (!input.trackingNumber || !input.courier) {
      return {
        success: false,
        error: {
          message: 'Tracking number and courier are required',
          ray_id: 'validation-error',
        },
      }
    }

    // Fetch tracking history from API
    const tracking = await apiFetch<TrackingHistory>(
      `/tracking/${input.trackingNumber}?courier=${encodeURIComponent(input.courier)}`
    )

    return {
      success: true,
      data: tracking,
    }
  } catch (error) {
    return {
      success: false,
      error: error as ApiError,
    }
  }
}
