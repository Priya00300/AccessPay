import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAnnouncer } from '../../../contexts/AnnouncerContext'
import { useFocusManagement } from '../../../hooks/useFocusManagement'
import Button from '../../common/Button/Button'
import styles from './PaymentStatus.module.css'

/**
 * Step 3: Payment Status (Success/Failure)
 * - Announces status to screen readers automatically
 * - Clear visual indicators (not just color)
 * - Focus management
 * - Action buttons for next steps
 */
function PaymentStatus({ success, data, onReset }) {
  const { t } = useTranslation()
  const { announce } = useAnnouncer()
  const navigate = useNavigate()
  const headingRef = useFocusManagement(true)

  useEffect(() => {
    // Announce status immediately to screen readers
    const message = success
      ? t('payment.successMessage', { 
          amount: formatCurrency(data.amount), 
          payee: data.payeeName 
        })
      : t('payment.failureMessage')
    
    announce(message, 'assertive')
  }, [success, data, announce, t])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleNewPayment = () => {
    onReset()
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.statusCard}>
        {/* Status Icon */}
        <div 
          className={success ? styles.iconSuccess : styles.iconError}
          aria-hidden="true"
        >
          {success ? (
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
        </div>

        {/* Status Title */}
        <h2 
          ref={headingRef}
          className={styles.title}
          tabIndex={-1}
        >
          {success ? t('payment.success') : t('payment.failure')}
        </h2>

        {/* Live Region for Screen Reader Announcement */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className={styles.statusMessage}
        >
          {success ? (
            <p>
              {t('payment.successMessage', { 
                amount: formatCurrency(data.amount), 
                payee: data.payeeName 
              })}
            </p>
          ) : (
            <p>{t('payment.failureMessage')}</p>
          )}
        </div>

        {/* Payment Details (Success Only) */}
        {success && (
          <div className={styles.details}>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>{t('payment.payee')}</dt>
                <dd className={styles.detailValue}>{data.payeeName}</dd>
              </div>

              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>{t('payment.accountNumber')}</dt>
                <dd className={styles.detailValue}>{data.payeeAccount}</dd>
              </div>

              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>{t('payment.amount')}</dt>
                <dd className={styles.detailValue}>
                  {formatCurrency(data.amount)}
                </dd>
              </div>

              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Transaction ID</dt>
                <dd className={styles.detailValue}>
                  {Math.random().toString(36).substring(2, 15).toUpperCase()}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={handleNewPayment}
            fullWidth
          >
            Make Another Payment
          </Button>

          <Button
            variant="secondary"
            size="large"
            onClick={handleGoHome}
            fullWidth
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentStatus