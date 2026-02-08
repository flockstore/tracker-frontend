import { getTracking } from '../../actions/GetTracking/GetTracking'
import { apiFetch } from '../../lib/api/client'
import { retryWithBackoff } from '../../lib/utils/retry'

// Mock dependencies
jest.mock('../../lib/api/client')
jest.mock('../../lib/utils/retry')

describe('GetTracking Server Action', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should validate required inputs', async () => {
        const result = await getTracking({ trackingNumber: '', courier: '' })
        expect(result.success).toBe(false)
        expect(result.error?.message).toContain('required')
    })

    it('should call retryWithBackoff and return data', async () => {
        const mockTracking = { tracking_number: '123', events: [] }
            // retryWithBackoff calls the callback passed to it
            ; (retryWithBackoff as jest.Mock).mockImplementation(async (fn) => fn())
            ; (apiFetch as jest.Mock).mockResolvedValue(mockTracking)

        const result = await getTracking({ trackingNumber: '123', courier: 'fedex' })

        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockTracking)
        expect(retryWithBackoff).toHaveBeenCalled()
    })

    it('should handle API errors', async () => {
        const error = { message: 'API Error' }
            ; (retryWithBackoff as jest.Mock).mockRejectedValue(error)

        const result = await getTracking({ trackingNumber: '123', courier: 'fedex' })

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe(error.message)
    })
})
