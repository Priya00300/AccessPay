import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAnnouncer } from '../../../contexts/AnnouncerContext'
import Input from '../../common/Input/Input'
import Button from '../../common/Button/Button'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import VoiceInput from '../../common/VoiceInput/VoiceInput'
import styles from './PayeeSelection.module.css'

/**
 * Step 1: Payee Selection and Amount Entry
 * - Accessible form with proper labels
 * - Real-time validation
 * - Voice input support
 * - Error announcements for screen readers
 */
function PayeeSelection({ onNext, initialData = {} }) {
  const { t } = useTranslation()
  const { announce } = useAnnouncer()
  
  const [payees, setPayees] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    payeeId: initialData.payeeId || '',
    amount: initialData.amount || ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [voiceInputOpen, setVoiceInputOpen] = useState(false)
  const [voiceField, setVoiceField] = useState(null)

  // Fetch payees from mock API
  useEffect(() => {
    fetch('http://localhost:3001/payees')
      .then(res => res.json())
      .then(data => {
        setPayees(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching payees:', err)
        setLoading(false)
      })
  }, [])

  const validateField = (name, value) => {
    switch (name) {
      case 'payeeId':
        if (!value) {
          return t('validation.required')
        }
        if (!payees.find(p => p.id === value)) {
          return t('validation.invalidPayee')
        }
        return ''
      
      case 'amount':
        if (!value) {
          return t('validation.required')
        }
        const amount = parseFloat(value)
        if (isNaN(amount) || amount <= 0) {
          return t('validation.invalidAmount')
        }
        return ''
      
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleVoiceInput = (field) => {
    setVoiceField(field)
    setVoiceInputOpen(true)
  }

  const handleVoiceTranscript = (transcript) => {
    if (voiceField === 'amount') {
      // Extract numbers from transcript
      const numbers = transcript.match(/\d+/g)
      if (numbers) {
        const amount = numbers.join('.')
        setFormData(prev => ({ ...prev, amount }))
        announce(`Amount set to ${amount}`, 'polite')
      }
    } else if (voiceField === 'payee') {
      // Try to match payee name
      const matchedPayee = payees.find(p => 
        p.name.toLowerCase().includes(transcript.toLowerCase())
      )
      if (matchedPayee) {
        setFormData(prev => ({ ...prev, payeeId: matchedPayee.id }))
        announce(`Payee set to ${matchedPayee.name}`, 'polite')
      }
    }
    setVoiceInputOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    
    setErrors(newErrors)
    setTouched({ payeeId: true, amount: true })
    
    const errorCount = Object.keys(newErrors).length
    if (errorCount > 0) {
      announce(t('validation.formErrors', { count: errorCount }), 'assertive')
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0]
      document.querySelector(`[name="${firstErrorField}"]`)?.focus()
      return
    }
    
    // Get selected payee details
    const selectedPayee = payees.find(p => p.id === formData.payeeId)
    
    announce('Moving to review step', 'polite')
    onNext({
      ...formData,
      payeeName: selectedPayee.name,
      payeeAccount: selectedPayee.accountNumber
    })
  }

  const errorCount = Object.keys(errors).filter(k => errors[k]).length

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('payment.selectPayee')}</h2>
      
      {errorCount > 0 && (
        <ErrorMessage
          message={t('validation.formErrors', { count: errorCount })}
          id="form-errors"
          variant="error"
          role="alert"
        />
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Payee Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="payeeId" className={styles.label}>
            {t('payment.payee')}
            <span className={styles.required} aria-label={t('aria.required')}>*</span>
          </label>
          
          <div className={styles.selectWrapper}>
            <select
              id="payeeId"
              name="payeeId"
              value={formData.payeeId}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              required
              aria-invalid={Boolean(errors.payeeId)}
              aria-describedby={errors.payeeId ? 'payeeId-error' : undefined}
              className={styles.select}
            >
              <option value="">Select a payee</option>
              {payees.map(payee => (
                <option key={payee.id} value={payee.id}>
                  {payee.name} ({payee.accountNumber})
                </option>
              ))}
            </select>
            
            <button
              type="button"
              className={styles.voiceButton}
              onClick={() => handleVoiceInput('payee')}
              aria-label={t('accessibility.voiceInput')}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          </div>
          
          {errors.payeeId && touched.payeeId && (
            <div id="payeeId-error" className={styles.error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.payeeId}
            </div>
          )}
        </div>

        {/* Amount Input */}
        <Input
          label={t('payment.amount')}
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.amount ? errors.amount : ''}
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
          autoComplete="off"
          showVoiceInput
          onVoiceInput={() => handleVoiceInput('amount')}
        />

        {/* Submit Button */}
        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={loading}
          >
            {t('common.next')}
          </Button>
        </div>
      </form>

      {/* Voice Input Modal */}
      <VoiceInput
        isOpen={voiceInputOpen}
        onClose={() => setVoiceInputOpen(false)}
        onTranscript={handleVoiceTranscript}
        fieldName={voiceField === 'amount' ? 'payment amount' : 'payee name'}
      />
    </div>
  )
}

export default PayeeSelection