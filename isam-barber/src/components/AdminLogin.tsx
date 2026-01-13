import { useState } from 'react'
import { Lock, Mail, X, KeyRound, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  onClose: () => void
}

export default function AdminLogin({ onClose }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const { signIn, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await signIn(email, password)

    if (authError) {
      setError('Credenziali non valide')
      setLoading(false)
      return
    }

    setLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await resetPassword(resetEmail)

    if (resetError) {
      setError('Errore nell\'invio dell\'email di recupero')
      setLoading(false)
      return
    }

    setResetSuccess(true)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold gold-gradient tracking-tight">Admin Login</h2>
        </div>

        {showResetPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <p className="text-gray-400 text-sm text-center">Inserisci la tua email per reimpostare la password</p>
            {resetSuccess ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-center">
                Email di recupero inviata con successo!
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  <label className="text-[12px] font-bold text-[#D4AF37] ml-8 block mb-2">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email Admin"
                    className="w-full bg-transparent border-b border-[#D4AF37]/30 focus:border-[#D4AF37] px-0 py-2 outline-none text-white transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? 'Invio...' : 'Invia Link Reset'}
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowResetPassword(false)}
              className="w-full text-gray-500 hover:text-[#D4AF37] text-sm font-bold transition-colors"
            >
              Torna al Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Email</label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anas019p@gmail.com"
                  className="w-full px-5 py-4 bg-black border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-[#D4AF37] transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Password</label>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-black border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-[#D4AF37] transition-all"
                  required
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors"
                  >
                    Password dimenticata?
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#D4AF37] text-black rounded-sm font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'AUTENTICAZIONE...' : 'Accedi'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
