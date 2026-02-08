import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TrackingForm } from '../views/Tracking/partials/TrackingForm/TrackingForm'
import { getOrder } from '../actions/GetOrder/GetOrder'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('../actions/GetOrder/GetOrder')

describe('TrackingForm Partial', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form fields', () => {
    render(<TrackingForm />)
    expect(screen.getByLabelText('fields.orderNumber.label')).toBeInTheDocument()
    expect(screen.getByLabelText('fields.email.label')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument()
  })

  it('should show validation error for invalid email', async () => {
    render(<TrackingForm />)

    const emailInput = screen.getByLabelText('fields.email.label')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    // Trigger submit to show validation
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      // Zod validation message
      expect(screen.getByText('validation.emailInvalid')).toBeInTheDocument()
    })
  })

  it('should call getOrder on valid submission', async () => {
    ; (getOrder as jest.Mock).mockResolvedValue({
      success: true,
      data: { order_id: '123' }
    })

    render(<TrackingForm />)

    fireEvent.change(screen.getByLabelText('fields.orderNumber.label'), { target: { value: '123' } })
    fireEvent.change(screen.getByLabelText('fields.email.label'), { target: { value: 'test@example.com' } })

    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(getOrder).toHaveBeenCalledWith({
        orderId: '123',
        email: 'test@example.com'
      })
    })
  })

  it('should map fetch failed error to connection error', async () => {
    ; (getOrder as jest.Mock).mockResolvedValue({
      success: false,
      error: { message: 'fetch failed' }
    })

    render(<TrackingForm />)

    // Fill valid data
    fireEvent.change(screen.getByLabelText('fields.orderNumber.label'), { target: { value: '123' } })
    fireEvent.change(screen.getByLabelText('fields.email.label'), { target: { value: 'test@example.com' } })

    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getByText('errors.connectionError')).toBeInTheDocument()
    })
  })
})
