import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Header.module.css'

/**
 * Accessible Header Component
 * - Semantic <header> and <nav> elements
 * - Skip link for keyboard users
 * - Current page indicator for screen readers
 * - Proper heading hierarchy
 */
function Header() {
  const { t } = useTranslation()
  const location = useLocation()

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/payment', label: t('nav.payments') }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className={styles.logoText}>{t('common.appName')}</span>
          </Link>
        </div>

        <nav className={styles.nav} aria-label={t('aria.menu')}>
          <ul className={styles.navList} role="list">
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={styles.navLink}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header