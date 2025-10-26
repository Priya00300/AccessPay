import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import { AnnouncerProvider } from './contexts/AnnouncerContext'
import SkipLink from './components/common/SkipLink/SkipLink'
import AccessibilityPanel from './components/accessibility/AccessibilityPanel/AccessibilityPanel'
import './styles/global.css'
import './styles/themes/light.css'
import './styles/themes/dark.css'
import './styles/themes/high-contrast.css'
import './styles/rtl.css'

function App() {
  return (
    <AccessibilityProvider>
      <AnnouncerProvider>
        <Router>
          <SkipLink />
          <div className="app">
            <Routes>
              <Route path="/" element={<div>Home Page - Coming in Phase 3</div>} />
              <Route path="/payment" element={<div>Payment Flow - Coming in Phase 3</div>} />
            </Routes>
          </div>
          <AccessibilityPanel />
        </Router>
      </AnnouncerProvider>
    </AccessibilityProvider>
  )
}

export default App