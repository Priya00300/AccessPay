import { createContext, useContext, useState, useCallback, useRef } from 'react'

const AnnouncerContext = createContext(null)

export function AnnouncerProvider({ children }) {
  const [message, setMessage] = useState('')
  const [politeness, setPoliteness] = useState('polite')
  const timeoutRef = useRef(null)

  const announce = useCallback((text, level = 'polite') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Clear message first to ensure it's re-announced even if the same
    setMessage('')
    setPoliteness(level)

    // Set new message after a brief delay
    setTimeout(() => {
      setMessage(text)
      
      // Clear message after it's been announced
      timeoutRef.current = setTimeout(() => {
        setMessage('')
      }, 5000)
    }, 100)
  }, [])

  const value = {
    announce,
    message,
    politeness
  }

  return (
    <AnnouncerContext.Provider value={value}>
      {children}
      {/* Live regions for screen reader announcements */}
      <div
        role="status"
        aria-live={politeness}
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
    </AnnouncerContext.Provider>
  )
}

export function useAnnouncer() {
  const context = useContext(AnnouncerContext)
  if (!context) {
    throw new Error('useAnnouncer must be used within AnnouncerProvider')
  }
  return context
}