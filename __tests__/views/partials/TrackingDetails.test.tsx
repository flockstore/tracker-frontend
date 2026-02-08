import { render, screen, fireEvent } from '@testing-library/react'
import { TrackingDetails } from '../../../views/OrderDetails/partials/TrackingDetails/TrackingDetails'

describe('TrackingDetails Partial', () => {
    const mockTracking = [
        { tracking_number: 'TRACK1', tracking_provider: 'fedex' }
    ]
    const mockPreloadedData = {
        'TRACK1': {
            global_status: 'PROCESSING',
            history: [
                { text: 'Picked up', city: 'City A', date: '2023-01-01', code: 'PU' }
            ]
        }
    }

    it('should render tracking list', () => {
        render(
            <TrackingDetails
                tracking={mockTracking}
                preloadedData={mockPreloadedData}
                isLoading={false}
            />
        )

        expect(screen.getByText('title')).toBeInTheDocument() // t('title')
        expect(screen.getByText('TRACK1')).toBeInTheDocument()
    })

    it('should toggle details on click', () => {
        render(
            <TrackingDetails
                tracking={mockTracking}
                preloadedData={mockPreloadedData}
                isLoading={false}
            />
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(screen.getByText('Picked up')).toBeInTheDocument()
        expect(screen.getByText(/City A/)).toBeInTheDocument()
    })

    it('should render loading state', () => {
        render(
            <TrackingDetails
                tracking={mockTracking}
                preloadedData={{}}
                isLoading={true}
            />
        )

        expect(screen.getByText('loading')).toBeInTheDocument()
    })
})
