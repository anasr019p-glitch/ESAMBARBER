import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react'
import { supabase, Service } from '../lib/supabase'

const locations = [
  { id: 'corso-vecchio', name: 'Corso Vecchio, 61', phone: '+39 350 906 5386' },
  { id: 'via-vittorio', name: 'Via G. di Vittorio, 9', phone: '+39 353 356 4591' },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

export default function Booking() {
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    service_id: '',
    location: '',
    booking_date: '',
    booking_time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      setServices(data || [])
    }
    fetchServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: insertError } = await supabase
      .from('bookings')
      .insert([{ ...formData, status: 'pending' }])

    if (insertError) {
      setError('Errore nella prenotazione. Riprova.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    setFormData({
      customer_name: '', customer_phone: '', customer_email: '',
      service_id: '', location: '', booking_date: '', booking_time: '', notes: ''
    })

    setTimeout(() => setSuccess(false), 5000)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="prenota" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient">Prenota Appuntamento</span>
          </h2>
          <p className="text-gray-400 text-lg">Scegli data, ora e servizio. Ti aspettiamo!</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Prenotazione Confermata!</h3>
              <p className="text-gray-400">Ti contatteremo per confermare l'appuntamento.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="Il tuo nome"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Telefono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="+39 xxx xxx xxxx"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  placeholder="email@esempio.com"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" /> Sede *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full"
                  >
                    <option value="">Seleziona sede</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Servizio *</label>
                  <select
                    required
                    value={formData.service_id}
                    onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                    className="w-full"
                  >
                    <option value="">Seleziona servizio</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} - EUR{Number(s.price).toFixed(0)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data *
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.booking_date}
                    onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" /> Ora *
                  </label>
                  <select
                    required
                    value={formData.booking_time}
                    onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                    className="w-full"
                  >
                    <option value="">Seleziona orario</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Note</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Richieste particolari..."
                  rows={3}
                  className="w-full"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-4 rounded-lg text-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Invio in corso...' : 'Conferma Prenotazione'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
