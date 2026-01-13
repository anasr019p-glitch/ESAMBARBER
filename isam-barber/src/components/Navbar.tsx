import { useState, useEffect } from 'react'
import { Menu, X, Settings, ShoppingBag, Sparkles, Sun, Moon } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface NavbarProps {
  onAdminClick: () => void
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const isDark = savedTheme === 'dark'
    setIsDarkMode(isDark)
    if (!isDark) document.documentElement.classList.add('light')

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { href: '#servizi', label: 'Servizi' },
    { href: '#shop', label: 'Shop', icon: ShoppingBag },
    { href: '#giochi', label: 'Giochi' },
    { href: '#simulatore', label: 'Simulatore', icon: Sparkles },
    { href: '#galleria', label: 'Galleria' },
    { href: '#sedi', label: 'Sedi' },
    { href: '#prenota', label: 'Prenota' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] p-0.5 shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src="/logo_3d.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gold-gradient tracking-wider">ISAM-BARBER</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Online Now</span>
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 light:text-gray-700 hover:text-[#D4AF37] transition-all duration-300 font-medium flex items-center gap-2 hover:translate-y-[-2px]"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </a>
            ))}
            {user && (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F4E4BC] transition-colors"
              >
                <Settings className="w-5 h-5" />
                Admin
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#D4AF37]"
              title={isDarkMode ? 'Passa a Light Mode' : 'Passa a Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white light:text-black p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-gray-300 light:text-gray-700 hover:text-[#D4AF37] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            {user && (
              <button
                onClick={() => { setIsMobileOpen(false); onAdminClick(); }}
                className="flex items-center gap-2 text-[#D4AF37] py-2"
              >
                <Settings className="w-5 h-5" />
                Admin Panel
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
