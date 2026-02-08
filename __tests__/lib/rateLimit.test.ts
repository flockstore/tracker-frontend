import { checkRateLimit } from '../../lib/rateLimit'

describe('Rate Limit Utility', () => {
    const originalEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...originalEnv }
        jest.useFakeTimers()
    })

    afterEach(() => {
        process.env = originalEnv
        jest.useRealTimers()
    })

    it('should allow requests within limit', () => {
        process.env.RATE_LIMIT_MAX_REQUESTS = '5'

        for (let i = 0; i < 5; i++) {
            const result = checkRateLimit('test-user')
            expect(result.allowed).toBe(true)
        }
    })

    it('should block requests exceeding limit', () => {
        process.env.RATE_LIMIT_MAX_REQUESTS = '2'

        expect(checkRateLimit('test-user-2').allowed).toBe(true)
        expect(checkRateLimit('test-user-2').allowed).toBe(true)

        const result = checkRateLimit('test-user-2')
        expect(result.allowed).toBe(false)
        expect(result.remainingTime).toBeGreaterThan(0)
    })

    it('should reset limit after window expires', () => {
        process.env.RATE_LIMIT_WINDOW_MS = '1000'
        process.env.RATE_LIMIT_MAX_REQUESTS = '1'

        expect(checkRateLimit('test-user-3').allowed).toBe(true)
        expect(checkRateLimit('test-user-3').allowed).toBe(false)

        // Advance time past window
        jest.advanceTimersByTime(1001)

        expect(checkRateLimit('test-user-3').allowed).toBe(true)
    })
})
