import { useState, useEffect, useRef, useCallback } from 'react'

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState(null)
  
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setTranscript(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setError(event.error)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  const startListening = useCallback((language = 'en-US') => {
    if (!recognitionRef.current || isListening) return

    setError(null)
    setTranscript('')
    recognitionRef.current.lang = language
    
    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error('Error starting recognition:', err)
      setError(err.message)
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return
    
    try {
      recognitionRef.current.stop()
    } catch (err) {
      console.error('Error stopping recognition:', err)
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  }
}