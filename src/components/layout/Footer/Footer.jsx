import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

/**
 * Accessible Footer Component
 * - Semantic <footer> element
 * - Proper content structure
 * - Links with clear labels
 */
function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.heading}>{t('common.appName')}</h3>
            <p className={styles.description}>
              A WCAG 2.1 AA compliant financial portal demonstrating enterprise-level accessibility.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" className={styles.link}>Terms of Service</a>
              </li>
              <li>
                <a href="#" className={styles.link}>Accessibility Statement</a>
              </li>
              <li>
                <a href="#" className={styles.link}>Contact Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Accessibility</h3>
            <p className={styles.description}>
              This application is built to WCAG 2.1 Level AA standards and is continuously tested for accessibility compliance.
            </p>
            <a 
              href="mailto:accessibility@accesspay.com"
              className={styles.link}
            >
              Report Accessibility Issue
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} AccessPay. All rights reserved. Built with accessibility in mind.
          </p>
          <p className={styles.disclaimer}>
            This is a portfolio project demonstrating accessibility best practices.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer