import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext(null)

const FONT_SIZES = {
  small: '0.875rem',
  normal: '1rem',
  large: '1.25rem'
}

const THEMES = {
  light: 'light',
  dark: 'dark',
  highContrast: 'high-contrast'
}

export function AccessibilityProvider({ children }) {
  // Load saved preferences from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('accesspay-theme') || THEMES.light
  })

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('accesspay-fontSize') || 'normal'
  })

  const [reducedMotion, setReducedMotion] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('accesspay-theme', theme)
  }, [theme])

  // Apply font size to document
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZES[fontSize]
    localStorage.setItem('accesspay-fontSize', fontSize)
  }, [fontSize])

  // Listen for system reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = (e) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const increaseFontSize = () => {
    if (fontSize === 'small') setFontSize('normal')
    else if (fontSize === 'normal') setFontSize('large')
  }

  const decreaseFontSize = () => {
    if (fontSize === 'large') setFontSize('normal')
    else if (fontSize === 'normal') setFontSize('small')
  }

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    reducedMotion,
    themes: THEMES
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}