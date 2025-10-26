import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useVoiceRecognition } from '../../../hooks/useVoiceRecognition'
import { useAnnouncer } from '../../../contexts/AnnouncerContext'
import styles from './VoiceInput.module.css'
import clsx from 'clsx'

/**
 * Voice Input Modal Component
 * Uses Web Speech API for voice recognition
 * Accessible with proper ARIA attributes and keyboard controls
 */
function VoiceInput({ 
  isOpen, 
  onClose, 
  onTranscript, 
  fieldName,
  language = 'en-US' 
}) {
  const { t, i18n } = useTranslation()
  const { announce } = useAnnouncer()
  const {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition()

  // Map i18n language to speech recognition language
  const getSpeechLanguage = () => {
    const langMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'ar': 'ar-SA'
    }
    return langMap[i18n.language] || language
  }

  useEffect(() => {
    if (isOpen && isSupported) {
      announce(t('accessibility.voiceInputActive'), 'assertive')
      startListening(getSpeechLanguage())
    }

    return () => {
      if (isListening) {
        stopListening()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
      announce(t('accessibility.voiceInputInactive'), 'polite')
      handleClose()
    }
  }, [transcript])

  useEffect(() => {
    if (error) {
      announce(`Voice input error: ${error}`, 'assertive')
    }
  }, [error])

  const handleClose = () => {
    if (isListening) {
      stopListening()
    }
    resetTranscript()
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isOpen) return null

  if (!isSupported) {
    return (
      <div 
        className={styles.overlay}
        role="dialog"
        aria-labelledby="voice-input-title"
        aria-modal="true"
      >
        <div className={styles.modal}>
          <h2 id="voice-input-title" className={styles.title}>
            {t('accessibility.voiceInput')}
          </h2>
          <p className={styles.message}>
            Voice input is not supported in your browser. Please try Chrome, Edge, or Safari.
          </p>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            autoFocus
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={styles.overlay}
      role="dialog"
      aria-labelledby="voice-input-title"
      aria-describedby="voice-input-description"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeIcon}
          onClick={handleClose}
          aria-label={t('common.cancel')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={clsx(styles.microphoneIcon, {
            [styles.listening]: isListening
          })}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>

          <h2 id="voice-input-title" className={styles.title}>
            {isListening 
              ? t('accessibility.voiceInputActive')
              : t('accessibility.voiceInput')
            }
          </h2>

          <p id="voice-input-description" className={styles.description}>
            {isListening 
              ? `Speak the ${fieldName} now...`
              : 'Click the microphone to start'
            }
          </p>

          {error && (
            <div className={styles.error} role="alert">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>
                {error === 'not-allowed' 
                  ? 'Microphone access denied. Please enable it in your browser settings.'
                  : `Error: ${error}`
                }
              </span>
            </div>
          )}

          <div className={styles.actions}>
            {!isListening ? (
              <button
                className={styles.startButton}
                onClick={() => startListening(getSpeechLanguage())}
                autoFocus
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                </svg>
                Start Listening
              </button>
            ) : (
              <button
                className={styles.stopButton}
                onClick={stopListening}
                autoFocus
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
                Stop
              </button>
            )}

            <button
              className={styles.cancelButton}
              onClick={handleClose}
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceInput