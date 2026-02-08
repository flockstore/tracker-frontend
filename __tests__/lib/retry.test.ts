import { retryWithBackoff } from '../../lib/utils/retry'

describe('Retry Utility', () => {
    it('should succeed on first attempt', async () => {
        const mockFn = jest.fn().mockResolvedValue('success')
        const result = await retryWithBackoff(mockFn)
        expect(result).toBe('success')
        expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should retry on failure and eventually succeed', async () => {
        const mockFn = jest.fn()
            .mockRejectedValueOnce(new Error('fail 1'))
            .mockResolvedValue('success')

        const result = await retryWithBackoff(mockFn, 3, 10)
        expect(result).toBe('success')
        expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should throw error after max retries', async () => {
        const mockFn = jest.fn().mockRejectedValue(new Error('persistent failure'))

        await expect(retryWithBackoff(mockFn, 2, 10)).rejects.toThrow('persistent failure')
        expect(mockFn).toHaveBeenCalledTimes(3) // Initial + 2 retries
    })
})
