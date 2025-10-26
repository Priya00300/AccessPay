import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRouteAnnouncement } from '../hooks/useFocusManagement'
import Button from '../components/common/Button/Button'
import styles from './Home.module.css'

/**
 * Home Page
 * - Clear heading hierarchy
 * - Semantic landmarks
 * - Accessible call-to-action
 */
function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  useRouteAnnouncement(t('nav.home'))

  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security and encryption.'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: 'Fast Processing',
      description: 'Payments are processed instantly, ensuring your bills are paid on time.'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Accessible for All',
      description: 'Built to WCAG 2.1 AA standards, ensuring everyone can use our service.'
    }
  ]

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to {t('common.appName')}
          </h1>
          <p className={styles.heroDescription}>
            A fully accessible bill payment portal built with inclusivity in mind. 
            Pay your bills quickly, securely, and with confidence.
          </p>
          <div className={styles.heroActions}>
            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/payment')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
              iconPosition="right"
            >
              Pay a Bill
            </Button>
          </div>
        </div>
      </div>

      <section className={styles.features} aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.featuresTitle}>
          Why Choose AccessPay?
        </h2>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <article key={index} className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.ctaTitle}>
          Ready to Get Started?
        </h2>
        <p className={styles.ctaDescription}>
          Make your first payment in just a few simple steps.
        </p>
        <Button
          variant="primary"
          size="large"
          onClick={() => navigate('/payment')}
        >
          Start Payment Process
        </Button>
      </section>
    </main>
  )
}

export default Home