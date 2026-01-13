import { useEffect, useState } from 'react'
import { Scissors, Sparkles, Crown } from 'lucide-react'
import { supabase, Service } from '../lib/supabase'

const icons: Record<string, React.ReactNode> = {
  taglio: <Scissors className="w-6 h-6" />,
  barba: <Scissors className="w-6 h-6" />,
  combo: <Crown className="w-6 h-6" />,
  estetica: <Sparkles className="w-6 h-6" />,
  trattamento: <Sparkles className="w-6 h-6" />,
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      setServices(data || [])
      setLoading(false)
    }
    fetchServices()
  }, [])

  if (loading) {
    return (
      <section id="servizi" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse text-[#D4AF37]">Caricamento...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="servizi" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient">I Nostri Servizi</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Qualita artigianale, tecniche moderne. Ogni taglio e un'opera d'arte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-xl p-6 hover:border-[#D4AF37] transition-all duration-300 group hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center text-[#D4AF37] group-hover:from-[#D4AF37] group-hover:text-black transition-all">
                  {icons[service.category || 'taglio']}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold gold-gradient">
                    {Number(service.price).toFixed(0)}
                  </span>
                  <span className="text-[#D4AF37] ml-1">EUR</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
              <a
                href="#prenota"
                className="mt-4 inline-block text-[#D4AF37] hover:text-[#F4E4BC] transition-colors text-sm font-medium"
              >
                Prenota questo servizio
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
