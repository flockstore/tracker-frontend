import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TrackingForm } from '../views/Tracking/partials/TrackingForm/TrackingForm'

describe('TrackingForm', () => {
  const renderComponent = () => {
    return render(<TrackingForm />)
  }

  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByLabelText('Order Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /track order/i })).toBeInTheDocument()
  })

  it('shows validation error when fields are empty and touched', async () => {
    renderComponent()

    const orderInput = screen.getByLabelText('Order Number')
    const emailInput = screen.getByLabelText('Email')

    fireEvent.blur(orderInput)
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText('Order number is required.')).toBeInTheDocument()
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    renderComponent()

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    renderComponent()

    fireEvent.change(screen.getByLabelText('Order Number'), { target: { value: '12345' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /track order/i }))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        orderNumber: 12345,
        email: 'test@example.com',
      })
    })

    consoleSpy.mockRestore()
  })
})
