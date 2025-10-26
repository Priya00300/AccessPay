import { forwardRef } from 'react'
import styles from './Button.module.css'
import clsx from 'clsx'

/**
 * Accessible Button Component
 * - Follows WCAG 2.1 AA standards
 * - Supports keyboard navigation
 * - Clear focus indicators
 * - Proper ARIA attributes
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ariaLabel,
  ariaDescribedBy,
  onClick,
  className,
  ...props
}, ref) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.loading]: loading,
      [styles.fullWidth]: fullWidth,
      [styles.iconOnly]: icon && !children,
      [styles.iconRight]: iconPosition === 'right'
    },
    className
  )

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <span className={styles.spinnerCircle}></span>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      
      {children && <span className={styles.text}>{children}</span>}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      
      {loading && (
        <span className="sr-only">Loading</span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button