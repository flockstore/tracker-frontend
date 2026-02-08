import { getBanner } from '../../actions/GetBanner/GetBanner'
import { apiFetch } from '../../lib/api/client'

// Mock dependencies
jest.mock('../../lib/api/client')

describe('GetBanner Server Action', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return banner data on success', async () => {
        const mockBanner = { id: 1, title: 'Test Banner' }
            ; (apiFetch as jest.Mock).mockResolvedValue(mockBanner)

        const result = await getBanner()
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockBanner)
    })

    it('should return null data on 404 (no banner)', async () => {
        const error = { status: 404 }
            ; (apiFetch as jest.Mock).mockRejectedValue(error)

        const result = await getBanner()
        expect(result.success).toBe(true)
        expect(result.data).toBeNull()
    })

    it('should return error for other API errors', async () => {
        const error = { status: 500, message: 'Server Error' }
            ; (apiFetch as jest.Mock).mockRejectedValue(error)

        const result = await getBanner()
        expect(result.success).toBe(false)
        expect(result.error).toEqual(error)
    })
})
