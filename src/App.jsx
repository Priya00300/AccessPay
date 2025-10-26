import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import { AnnouncerProvider } from './contexts/AnnouncerContext'
import SkipLink from './components/common/SkipLink/SkipLink'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import AccessibilityPanel from './components/accessibility/AccessibilityPanel/AccessibilityPanel'
import Home from './pages/Home'
import PaymentFlow from './pages/PaymentFlow'
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
          <div className="app">
            <SkipLink />
            <Header />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payment" element={<PaymentFlow />} />
            </Routes>
            
            <Footer />
          </div>
          <AccessibilityPanel />
        </Router>
      </AnnouncerProvider>
    </AccessibilityProvider>
  )
}

export default App