import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component - Accessibility Tests', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Submit</Button>)
    
    const button = screen.getByRole('button', { name: 'Submit' })
    
    // Tab to focus
    await user.tab()
    expect(button).toHaveFocus()
    
    // Press Enter
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Press Space
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('has proper aria attributes when loading', () => {
    render(<Button loading>Submit</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading')).toHaveClass('sr-only')
  })

  it('is properly disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
  })

  it('has custom aria-label when provided', () => {
    render(<Button ariaLabel="Custom label">Icon</Button>)
    expect(screen.getByRole('button', { name: 'Custom label' })).toBeInTheDocument()
  })

  it('supports aria-describedby for additional context', () => {
    render(
      <>
        <Button ariaDescribedBy="help-text">Submit</Button>
        <div id="help-text">This will submit the form</div>
      </>
    )
    
    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('has minimum touch target size', () => {
    const { container } = render(<Button>Click</Button>)
    const button = container.querySelector('button')
    
    const styles = window.getComputedStyle(button)
    const height = parseInt(styles.minHeight)
    const width = parseInt(styles.minWidth)
    
    // WCAG requires minimum 44x44px touch targets
    expect(height).toBeGreaterThanOrEqual(44)
    expect(width).toBeGreaterThanOrEqual(44)
  })
})