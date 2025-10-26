import { useTranslation } from 'react-i18next'
import styles from './SkipLink.module.css'

/**
 * Skip to Main Content Link
 * Critical accessibility feature for keyboard users
 * Allows users to bypass navigation and go directly to main content
 */
function SkipLink() {
  const { t } = useTranslation()

  return (
    <a 
      href="#main-content" 
      className={styles.skipLink}
    >
      {t('nav.skipToMain')}
    </a>
  )
}

export default SkipLink