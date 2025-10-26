import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/config'
import { AnnouncerProvider } from '../../../contexts/AnnouncerContext'
import PayeeSelection from './PayeeSelection'
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = vi.fn()

const mockPayees = [
  { id: '1', name: 'Electric Company', accountNumber: '****1234' },
  { id: '2', name: 'Water Utility', accountNumber: '****5678' }
]

const renderComponent = (props = {}) => {
  const defaultProps = {
    onNext: vi.fn(),
    initialData: {}
  }

  return render(
    <I18nextProvider i18n={i18n}>
      <AnnouncerProvider>
        <PayeeSelection {...defaultProps} {...props} />
      </AnnouncerProvider>
    </I18nextProvider>
  )
}

describe('PayeeSelection - Accessibility Tests', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: async () => mockPayees
    })
  })

  it('has proper form structure with labels', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByLabelText(/payee/i)).toBeInTheDocument()
    })

    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
  })

  it('indicates required fields', async () => {
    renderComponent()

    await waitFor(() => {
      // Use a more specific query to get the label text
      const payeeLabels = screen.getAllByText(/payee/i)
      const payeeLabel = payeeLabels.find(element => 
        element.tagName.toLowerCase() === 'label'
      )
      expect(payeeLabel).toBeInTheDocument()
    })

    // Check for required indicator using the required span
    const requiredSpans = screen.getAllByLabelText(/required/i)
    expect(requiredSpans.length).toBeGreaterThan(0)

    const amountInput = screen.getByLabelText(/amount/i)
    expect(amountInput).toBeRequired()
  })

  it('validates empty form submission', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    renderComponent({ onNext })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /next/i })
    await user.click(submitButton)

    // Should show error messages - use getAllByText since there are multiple
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/required/i)
      expect(errorMessages.length).toBeGreaterThan(0)
    })

    // Should not call onNext
    expect(onNext).not.toHaveBeenCalled()
  })

  it('displays errors with proper ARIA attributes', async () => {
    const user = userEvent.setup()
    renderComponent()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /next/i })
    await user.click(submitButton)

    await waitFor(() => {
      const payeeSelect = screen.getByLabelText(/payee/i)
      expect(payeeSelect).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('is keyboard navigable', async () => {
    const user = userEvent.setup()
    renderComponent()

    await waitFor(() => {
      expect(screen.getByLabelText(/payee/i)).toBeInTheDocument()
    })

    // Start from the beginning of the document
    await user.tab()
    
    // The first focusable element should be the payee select
    expect(screen.getByLabelText(/payee/i)).toHaveFocus()

    await user.tab()
    // The next focusable element should be the payee voice button
    expect(screen.getAllByLabelText(/use voice input/i)[0]).toHaveFocus()

    await user.tab()
    // Then the amount input
    expect(screen.getByLabelText(/amount/i)).toHaveFocus()

    await user.tab()
    // Then the amount voice button
    expect(screen.getAllByLabelText(/use voice input/i)[1]).toHaveFocus()

    await user.tab()
    // Finally the submit button
    expect(screen.getByRole('button', { name: /next/i })).toHaveFocus()
  })

  it('submits valid form data', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    renderComponent({ onNext })

    await waitFor(() => {
      expect(screen.getByLabelText(/payee/i)).toBeInTheDocument()
    })

    // Fill out form
    const payeeSelect = screen.getByLabelText(/payee/i)
    await user.selectOptions(payeeSelect, '1')

    const amountInput = screen.getByLabelText(/amount/i)
    await user.clear(amountInput) // Clear any existing value
    await user.type(amountInput, '100.00')

    // Submit
    const submitButton = screen.getByRole('button', { name: /next/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith({
        payeeId: '1',
        amount: '100', // HTML number inputs strip .00 decimals
        payeeName: 'Electric Company',
        payeeAccount: '****1234'
      })
    })
  })

  it('announces form errors to screen readers', async () => {
    const user = userEvent.setup()
    renderComponent()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /next/i })
    await user.click(submitButton)

    // Use getAllByRole and specifically look for the form errors alert
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert')
      const formErrorAlert = alerts.find(alert => 
        alert.textContent?.includes('form has') || alert.id === 'form-errors'
      )
      expect(formErrorAlert).toBeInTheDocument()
      expect(formErrorAlert).toHaveTextContent(/form has.*error/)
    })
  })
})