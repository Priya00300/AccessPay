import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteAnnouncement } from '../hooks/useFocusManagement'
import PayeeSelection from '../components/payment/PayeeSelection/PayeeSelection'
import PaymentReview from '../components/payment/PaymentReview/PaymentReview'
import PaymentStatus from '../components/payment/PaymentStatus/PaymentStatus'
import styles from './PaymentFlow.module.css'

/**
 * Payment Flow Page
 * Orchestrates the 3-step payment process
 * - Step 1: Payee Selection
 * - Step 2: Review
 * - Step 3: Status (Success/Failure)
 */
function PaymentFlow() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentData, setPaymentData] = useState({})
  const [paymentResult, setPaymentResult] = useState(null)

  useRouteAnnouncement(t('payment.title'))

  const handleStep1Next = (data) => {
    setPaymentData(data)
    setCurrentStep(2)
  }

  const handleStep2Back = () => {
    setCurrentStep(1)
  }

  const handleStep2Submit = (result) => {
    setPaymentResult(result)
    setCurrentStep(3)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setPaymentData({})
    setPaymentResult(null)
  }

  const steps = [
    { number: 1, label: t('payment.selectPayee') },
    { number: 2, label: t('payment.review') },
    { number: 3, label: 'Complete' }
  ]

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{t('payment.title')}</h1>

        {/* Progress Indicator */}
        {currentStep < 3 && (
          <nav 
            className={styles.progressBar} 
            aria-label="Payment progress"
            role="navigation"
          >
            <ol className={styles.stepList}>
              {steps.map((step) => (
                <li
                  key={step.number}
                  className={styles.stepItem}
                  aria-current={currentStep === step.number ? 'step' : undefined}
                >
                  <div 
                    className={`${styles.stepCircle} ${
                      currentStep > step.number ? styles.completed :
                      currentStep === step.number ? styles.active :
                      styles.upcoming
                    }`}
                    aria-label={`Step ${step.number}: ${step.label}`}
                  >
                    {currentStep > step.number ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className={styles.stepLabel}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Step Content */}
        <div className={styles.content}>
          {currentStep === 1 && (
            <PayeeSelection
              onNext={handleStep1Next}
              initialData={paymentData}
            />
          )}

          {currentStep === 2 && (
            <PaymentReview
              data={paymentData}
              onBack={handleStep2Back}
              onSubmit={handleStep2Submit}
            />
          )}

          {currentStep === 3 && paymentResult && (
            <PaymentStatus
              success={paymentResult.success}
              data={paymentData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default PaymentFlow