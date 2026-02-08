import { render, screen, waitFor } from '@testing-library/react'
import { OrderDetails } from '../../views/OrderDetails/OrderDetails'
import { getBanner } from '../../actions/GetBanner/GetBanner'
import { getTracking } from '../../actions/GetTracking/GetTracking'

// Mock dependencies
const mockRouter = { push: jest.fn() }
jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
}))

jest.mock('../../actions/GetBanner/GetBanner')
jest.mock('../../actions/GetTracking/GetTracking')

// Mock sessionStorage
const mockSessionStorage = (() => {
    let store: Record<string, string> = {}
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString()
        },
        clear: () => {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
})

describe('OrderDetails View', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        window.sessionStorage.clear()
            ; (getBanner as jest.Mock).mockResolvedValue({ success: true, data: null })
    })

    it('should render order details from session storage', async () => {
        const mockOrder = {
            order_id: '123',
            status: 'CREATED',
            create_date: '2023-01-01',
            items: [],
            tracking: [],
            name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            address: '123 St',
            city: 'City',
            state: 'State',
            payment_method: 'Credit Card',
        }
        window.sessionStorage.setItem('currentOrder', JSON.stringify(mockOrder))

        render(<OrderDetails />)

        await waitFor(() => {
            expect(screen.getByText('orderTitle')).toBeInTheDocument()
        })

        // Check for customer info
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Credit Card')).toBeInTheDocument()
    })

    it('should correctly calculate RETURN status', async () => {
        const mockOrder = {
            order_id: '123',
            status: 'SHIPPED',
            create_date: '2023-01-01',
            items: [],
            tracking: [
                { tracking_number: 'TRACK_RETURN', tracking_provider: 'fedex' }
            ],
            name: 'John', last_name: 'Doe', email: 'j@e.com', address: 'A', city: 'C', state: 'S', payment_method: 'P'
        }
        window.sessionStorage.setItem('currentOrder', JSON.stringify(mockOrder))

            ; (getTracking as jest.Mock).mockResolvedValue({
                success: true,
                data: {
                    global_status: 'RETURN',
                    history: []
                }
            })

        render(<OrderDetails />)

        await waitFor(() => {
            // Should show RETURN subtitle
            expect(screen.getByText('statusSubtitles.RETURN')).toBeInTheDocument()
        })
    })

    it('should correctly calculate INCIDENCE status (priority over RETURN)', async () => {
        const mockOrder = {
            order_id: '124',
            status: 'SHIPPED',
            tracking: [
                { tracking_number: 'TRACK_RET', tracking_provider: 'fedex' },
                { tracking_number: 'TRACK_INC', tracking_provider: 'fedex' }
            ],
            // ... required fields
            create_date: '2023-01-01', items: [], name: 'John', last_name: 'Doe', email: 'j@e.com', address: 'A', city: 'C', state: 'S', payment_method: 'P'
        }
        window.sessionStorage.setItem('currentOrder', JSON.stringify(mockOrder))

            ; (getTracking as jest.Mock).mockImplementation((input: any) => {
                if (input.trackingNumber === 'TRACK_RET') {
                    return Promise.resolve({ success: true, data: { global_status: 'RETURN', history: [] } })
                }
                if (input.trackingNumber === 'TRACK_INC') {
                    return Promise.resolve({ success: true, data: { global_status: 'INCIDENCE', history: [] } })
                }
                return Promise.resolve({ success: false })
            })

        render(<OrderDetails />)

        await waitFor(() => {
            // INCIDENCE should take precedence
            expect(screen.getByText('statusSubtitles.INCIDENCE')).toBeInTheDocument()
        })
    })
})
