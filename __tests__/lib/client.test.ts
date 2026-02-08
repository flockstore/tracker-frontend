
// Mock global fetch
global.fetch = jest.fn()

describe('API Client', () => {
    let apiFetch: any

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()
        process.env.API_BASE_URL = 'http://test-api.com'
        // Dynamic import to pick up new env var
        apiFetch = require('../../lib/api/client').apiFetch
    })

    it('should make request to correct URL and return data', async () => {
        const mockData = { id: 1, name: 'Test' }
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockData,
            })

        const result = await apiFetch('/test')

        expect(global.fetch).toHaveBeenCalledWith(
            'http://test-api.com/test',
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
            })
        )
        expect(result).toEqual(mockData)
    })

    it('should throw ApiError when response is not ok', async () => {
        const mockError = { message: 'Not Found', ray_id: '123' }
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                json: async () => mockError,
            })

        await expect(apiFetch('/test')).rejects.toEqual(mockError)
    })

    it('should throw generic error on network failure', async () => {
        const networkError = new Error('Network Error')
            ; (global.fetch as jest.Mock).mockRejectedValue(networkError)

        await expect(apiFetch('/test')).rejects.toEqual(networkError)
    })
})
