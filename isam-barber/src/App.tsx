import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Locations from './components/Locations'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import Shop from './components/Shop'
import Simulator from './components/Simulator'
import Games from './components/Games'
import './index.css'

function AppContent() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const { user } = useAuth()

  const handleAdminClick = () => {
    if (user) {
      setShowAdminPanel(true)
    } else {
      setShowAdminLogin(true)
    }
  }

  return (
    <div className="relative">
      <div className="particle-bg" />

      <Navbar onAdminClick={handleAdminClick} />

      <main className="relative z-10">
        <Hero />
        <Services />
        <Shop />
        <Simulator />
        <Gallery />
        <Reviews />
        <Booking />
        <Locations />
        <Games />
        <Footer onAdminClick={handleAdminClick} />
      </main>

      {showAdminLogin && !user && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}

      {user && showAdminLogin && (
        <>
          {setShowAdminLogin(false)}
          {setShowAdminPanel(true)}
        </>
      )}

      {showAdminPanel && user && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
