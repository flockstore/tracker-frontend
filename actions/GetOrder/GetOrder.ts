'use server'

import { apiFetch } from '@/lib/api/client'
import type { Order } from '@/types/domain/Order'
import type { ApiResponse, ApiError } from '@/types/api/Response'

/**
 * Get Order Input
 */
export interface GetOrderInput {
  orderId: string
  email: string
}

/**
 * Get Order Server Action
 *
 * Fetches order details using Order ID and Email.
 * This server action proxies the request to the backend API,
 * hiding the real endpoint from the client.
 *
 * @param {GetOrderInput} input - The order ID and email
 * @returns {Promise<ApiResponse<Order>>} The order data or error
 */
export async function getOrder(input: GetOrderInput): Promise<ApiResponse<Order>> {
  try {
    // Validate inputs
    if (!input.orderId || !input.email) {
      return {
        success: false,
        error: {
          message: 'Order ID and email are required',
          ray_id: 'validation-error',
        },
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(input.email)) {
      return {
        success: false,
        error: {
          message: 'Please enter a valid email address',
          ray_id: 'validation-error',
        },
      }
    }

    // Fetch order from API
    const order = await apiFetch<Order>(
      `/orders/${input.orderId}?email=${encodeURIComponent(input.email)}`
    )

    return {
      success: true,
      data: order,
    }
  } catch (error) {
    return {
      success: false,
      error: error as ApiError,
    }
  }
}
