import { render, screen } from '@testing-library/react'
import { OrderStatus } from '../../../views/OrderDetails/partials/OrderStatus/OrderStatus'

// Mock StatusAlert
jest.mock('../../../components/ui/StatusAlert/StatusAlert', () => ({
    StatusAlert: ({ title, subtitle, showIncidenceBadge }: any) => (
        <div data-testid="status-alert">
            <span>{title}</span>
            <span>{subtitle}</span>
            {showIncidenceBadge && <span>INCIDENCE_BADGE</span>}
        </div>
    ),
}))

describe('OrderStatus Partial', () => {
    const mockT = (key: string) => key

    it('should render status title and subtitle', () => {
        render(<OrderStatus status="CREATED" isLoading={false} t={mockT as any} />)

        expect(screen.getByText('status.title')).toBeInTheDocument()
        expect(screen.getByText('statusSubtitles.CREATED')).toBeInTheDocument()
        expect(screen.getByText('statusMessages.CREATED')).toBeInTheDocument()
    })

    it('should show incidence badge for INCIDENCE status', () => {
        render(<OrderStatus status="INCIDENCE" isLoading={false} t={mockT as any} />)
        expect(screen.getByText('INCIDENCE_BADGE')).toBeInTheDocument()
    })

    it('should NOT show incidence badge for RETURN status', () => {
        render(<OrderStatus status="RETURN" isLoading={false} t={mockT as any} />)
        expect(screen.queryByText('INCIDENCE_BADGE')).not.toBeInTheDocument()
    })

    it('should NOT show incidence badge for CREATED status', () => {
        render(<OrderStatus status="CREATED" isLoading={false} t={mockT as any} />)
        expect(screen.queryByText('INCIDENCE_BADGE')).not.toBeInTheDocument()
    })
})
