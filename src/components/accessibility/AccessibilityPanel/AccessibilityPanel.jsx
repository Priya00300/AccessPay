import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccessibility } from '../../../contexts/AccessibilityContext'
import { useFocusTrap } from '../../../hooks/useFocusManagement'
import Button from '../../common/Button/Button'
import styles from './AccessibilityPanel.module.css'
import clsx from 'clsx'

/**
 * Accessibility Settings Panel
 * Allows users to customize:
 * - Theme (Light/Dark/High Contrast)
 * - Font Size
 * - Language
 */
function AccessibilityPanel() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize, themes } = useAccessibility()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useFocusTrap(isOpen)

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    // Update document direction for RTL languages
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Settings Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={togglePanel}
        aria-label={isOpen ? t('aria.closeSettings') : t('aria.openSettings')}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l-4.2-4.2" />
        </svg>
        <span className={styles.buttonText}>{t('accessibility.settings')}</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Settings Panel */}
      <aside
        id="accessibility-panel"
        ref={panelRef}
        className={clsx(styles.panel, { [styles.open]: isOpen })}
        role="dialog"
        aria-label={t('accessibility.settings')}
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{t('accessibility.settings')}</h2>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label={t('aria.closeSettings')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {/* Theme Selection */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('accessibility.theme')}</h3>
            <div className={styles.themeGrid} role="group" aria-label={t('accessibility.theme')}>
              <button
                className={clsx(styles.themeButton, { [styles.active]: theme === themes.light })}
                onClick={() => handleThemeChange(themes.light)}
                aria-pressed={theme === themes.light}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>{t('accessibility.themeLight')}</span>
              </button>

              <button
                className={clsx(styles.themeButton, { [styles.active]: theme === themes.dark })}
                onClick={() => handleThemeChange(themes.dark)}
                aria-pressed={theme === themes.dark}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>{t('accessibility.themeDark')}</span>
              </button>

              <button
                className={clsx(styles.themeButton, { [styles.active]: theme === themes.highContrast })}
                onClick={() => handleThemeChange(themes.highContrast)}
                aria-pressed={theme === themes.highContrast}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20" />
                </svg>
                <span>{t('accessibility.themeHighContrast')}</span>
              </button>
            </div>
          </section>

          {/* Font Size Control */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('accessibility.fontSize')}</h3>
            <div className={styles.fontSizeControl} role="group" aria-label={t('accessibility.fontSize')}>
              <button
                className={styles.fontButton}
                onClick={decreaseFontSize}
                disabled={fontSize === 'small'}
                aria-label="Decrease font size"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className={styles.fontLabel}>A-</span>
              </button>

              <span className={styles.fontSizeDisplay} aria-live="polite">
                {fontSize === 'small' && t('accessibility.fontSizeSmall')}
                {fontSize === 'normal' && t('accessibility.fontSizeNormal')}
                {fontSize === 'large' && t('accessibility.fontSizeLarge')}
              </span>

              <button
                className={styles.fontButton}
                onClick={increaseFontSize}
                disabled={fontSize === 'large'}
                aria-label="Increase font size"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className={styles.fontLabel}>A+</span>
              </button>
            </div>
          </section>

          {/* Language Selection */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('accessibility.language')}</h3>
            <div className={styles.languageGrid} role="group" aria-label={t('accessibility.language')}>
              <button
                className={clsx(styles.languageButton, { [styles.active]: i18n.language === 'en' })}
                onClick={() => handleLanguageChange('en')}
                aria-pressed={i18n.language === 'en'}
                lang="en"
              >
                🇺🇸 English
              </button>

              <button
                className={clsx(styles.languageButton, { [styles.active]: i18n.language === 'es' })}
                onClick={() => handleLanguageChange('es')}
                aria-pressed={i18n.language === 'es'}
                lang="es"
              >
                🇪🇸 Español
              </button>

              <button
                className={clsx(styles.languageButton, { [styles.active]: i18n.language === 'ar' })}
                onClick={() => handleLanguageChange('ar')}
                aria-pressed={i18n.language === 'ar'}
                lang="ar"
              >
                🇸🇦 العربية
              </button>
            </div>
          </section>

          {/* Information */}
          <section className={styles.info}>
            <p>
              These settings are saved to your browser and will persist across sessions.
            </p>
          </section>
        </div>
      </aside>
    </>
  )
}

export default AccessibilityPanel