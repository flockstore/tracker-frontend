import { getOrder } from '../../actions/GetOrder/GetOrder'
import { apiFetch } from '../../lib/api/client'
import { checkRateLimit } from '../../lib/rateLimit'

// Mock dependencies
jest.mock('../../lib/api/client')
jest.mock('../../lib/rateLimit')

describe('GetOrder Server Action', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should validate required inputs', async () => {
        const result = await getOrder({ orderId: '', email: '' })
        expect(result.success).toBe(false)
        expect(result.error?.message).toContain('required')
    })

    it('should validate email format', async () => {
        const result = await getOrder({ orderId: '123', email: 'invalid-email' })
        expect(result.success).toBe(false)
        expect(result.error?.message).toContain('valid email')
    })

    it('should handle rate limits', async () => {
        ; (checkRateLimit as jest.Mock).mockReturnValue({
            allowed: false,
            remainingTime: 60,
        })

        const result = await getOrder({ orderId: '123', email: 'test@example.com' })
        expect(result.success).toBe(false)
        expect(result.error?.message).toContain('Too many requests')
    })

    it('should return data on successful API call', async () => {
        ; (checkRateLimit as jest.Mock).mockReturnValue({ allowed: true })
        const mockOrder = { order_id: '123', status: 'CREATED' }
            ; (apiFetch as jest.Mock).mockResolvedValue(mockOrder)

        const result = await getOrder({ orderId: '123', email: 'test@example.com' })
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockOrder)
        expect(apiFetch).toHaveBeenCalled()
    })

    it('should handle API errors', async () => {
        ; (checkRateLimit as jest.Mock).mockReturnValue({ allowed: true })
        const error = { message: 'Not Found', status: 404 }
            ; (apiFetch as jest.Mock).mockRejectedValue(error)

        const result = await getOrder({ orderId: '123', email: 'test@example.com' })
        expect(result.success).toBe(false)
        expect(result.error).toEqual(error)
    })
})
