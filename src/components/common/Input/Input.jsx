import { forwardRef, useId } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Input.module.css'
import clsx from 'clsx'

/**
 * Accessible Input Component
 * - Properly linked label and input using htmlFor
 * - Error handling with aria-describedby
 * - Required field indication
 * - Support for voice input
 */
const Input = forwardRef(({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder,
  autoComplete,
  min,
  max,
  step,
  pattern,
  maxLength,
  className,
  inputClassName,
  showVoiceInput = false,
  onVoiceInput,
  ...props
}, ref) => {
  const { t } = useTranslation()
  const inputId = useId()
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`
  const requiredId = `${inputId}-required`

  const hasError = Boolean(error)

  const describedBy = [
    hasError && errorId,
    helperText && helperId,
    required && requiredId
  ].filter(Boolean).join(' ')

  return (
    <div className={clsx(styles.inputGroup, className)}>
      {label && (
        <label 
          htmlFor={inputId}
          className={clsx(styles.label, {
            [styles.required]: required,
            [styles.disabled]: disabled,
            [styles.error]: hasError
          })}
        >
          {label}
          {required && (
            <span 
              id={requiredId}
              className={styles.requiredIndicator}
              aria-label={t('aria.required')}
            >
              *
            </span>
          )}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          className={clsx(styles.input, inputClassName, {
            [styles.error]: hasError,
            [styles.disabled]: disabled,
            [styles.withVoice]: showVoiceInput
          })}
          {...props}
        />

        {showVoiceInput && (
          <button
            type="button"
            className={styles.voiceButton}
            onClick={onVoiceInput}
            aria-label={t('accessibility.voiceInput')}
            disabled={disabled}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}
      </div>

      {hasError && (
        <div 
          id={errorId}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className={styles.errorIcon}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {helperText && !hasError && (
        <div 
          id={helperId}
          className={styles.helperText}
        >
          {helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input