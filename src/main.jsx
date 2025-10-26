import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n/config'

// Initialize axe-core in development for accessibility testing
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)