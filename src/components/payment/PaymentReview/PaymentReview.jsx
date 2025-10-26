import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAnnouncer } from '../../../contexts/AnnouncerContext'
import Button from '../../common/Button/Button'
import styles from './PaymentReview.module.css'

/**
 * Step 2: Payment Review
 * - Read-only confirmation screen
 * - Semantic description list for screen readers
 * - Clear visual hierarchy
 * - Edit and submit options
 */
function PaymentReview({ data, onBack, onSubmit }) {
  const { t } = useTranslation()
  const { announce } = useAnnouncer()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    announce('Submitting payment...', 'polite')

    try {
      // Simulate API call to mock server
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payeeId: data.payeeId,
          amount: parseFloat(data.amount),
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        announce('Payment submitted successfully', 'assertive')
        onSubmit({ success: true })
      } else {
        announce('Payment failed', 'assertive')
        onSubmit({ success: false })
      }
    } catch (error) {
      console.error('Payment error:', error)
      announce('Payment failed', 'assertive')
      onSubmit({ success: false })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('payment.review')}</h2>
      
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Payment Details</h3>
        
        {/* Using description list for semantic structure */}
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
              <span className={styles.amount}>
                {formatCurrency(data.amount)}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Confirmation Message */}
      <div className={styles.confirmationBox} role="note" aria-label="Payment confirmation notice">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className={styles.infoIcon}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p className={styles.confirmationText}>
          Please review the payment details carefully before confirming. This action cannot be undone.
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="large"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {t('common.back')}
        </Button>

        <Button
          variant="primary"
          size="large"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t('common.confirm')}
        </Button>
      </div>
    </div>
  )
}

export default PaymentReview