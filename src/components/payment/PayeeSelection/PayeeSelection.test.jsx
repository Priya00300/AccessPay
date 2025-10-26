import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/config'
import { AnnouncerProvider } from '../../../contexts/AnnouncerContext'
import PayeeSelection from './PayeeSelection'

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
      const payeeLabel = screen.getByText(/payee/i).closest('label')
      expect(payeeLabel).toHaveTextContent('*')
    })

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

    // Should show error messages
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
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

    // Tab through form fields
    await user.tab()
    expect(screen.getByLabelText(/payee/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/amount/i)).toHaveFocus()

    await user.tab()
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
    await user.type(amountInput, '100.00')

    // Submit
    const submitButton = screen.getByRole('button', { name: /next/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith(
        expect.objectContaining({
          payeeId: '1',
          amount: '100.00'
        })
      )
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

    // Error message should have role="alert" for screen reader announcement
    await waitFor(() => {
      const errorRegion = screen.getByRole('alert')
      expect(errorRegion).toBeInTheDocument()
    })
  })
})