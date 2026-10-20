import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FaqComponent from './FaqComponent'

describe('FaqComponent', () => {
  it('renders closed answers into the page, hidden', () => {
    render(<FaqComponent title="FAQ" faqs={[{ question: 'How much?', answer: 'You set the price.' }]} />)

    const answer = screen.getByText('You set the price.')
    expect(answer).toBeInTheDocument()
    expect(answer).not.toBeVisible()
  })
})
