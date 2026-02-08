import { render, screen } from '@testing-library/react'

const Home = () => {
  return <h1>Tracker Next</h1>
}

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: 'Tracker Next' })
    expect(heading).toBeInTheDocument()
  })
})
