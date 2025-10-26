import { useEffect, useRef } from 'react'

/**
 * Hook to manage focus for accessibility
 * Useful for modals, page transitions, and error handling
 */
export function useFocusManagement(shouldFocus = false) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        elementRef.current?.focus()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [shouldFocus])

  return elementRef
}

/**
 * Hook to trap focus within a container (for modals)
 */
export function useFocusTrap(isActive = false) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Store the previously focused element
    const previouslyFocused = document.activeElement

    // Focus the first element
    firstElement?.focus()

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
      // Restore focus when trap is deactivated
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [isActive])

  return containerRef
}

/**
 * Hook to announce page changes to screen readers
 */
export function useRouteAnnouncement(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - AccessPay`
      
      // Announce to screen readers
      const announcement = document.createElement('div')
      announcement.setAttribute('role', 'status')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = `Navigated to ${title}`
      
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }
  }, [title])
}