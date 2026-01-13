import { MapPin, Phone, Clock } from 'lucide-react'

const locations = [
  {
    name: 'Corso Vecchio, 61',
    address: 'Corso Vecchio, 61, 05100 Terni TR',
    phone: '+39 350 906 5386',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2936.742879023!2d12.642636!3d42.561899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132ee8e9a9a9a9a9%3A0x0!2sCorso%20Vecchio%2C%2061%2C%2005100%20Terni%20TR!5e0!3m2!1sit!2sit!4v1234567890'
  },
  {
    name: 'Via G. di Vittorio, 9',
    address: 'Via G. di Vittorio, 9, 05100 Terni TR',
    phone: '+39 353 356 4591',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2936.742879023!2d12.642636!3d42.561899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132ee8e9a9a9a9a9%3A0x0!2sVia%20G.%20di%20Vittorio%2C%209%2C%2005100%20Terni%20TR!5e0!3m2!1sit!2sit!4v1234567890'
  }
]

export default function Locations() {
  return (
    <section id="sedi" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient">Le Nostre Sedi</span>
          </h2>
          <p className="text-gray-400 text-lg">Due location a Terni per servirti al meglio.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-gray-400">Visualizza su Google Maps</p>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:text-[#F4E4BC] text-sm mt-2 inline-block"
                  >
                    Apri in Google Maps
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{loc.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span>{loc.address}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37] transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    <span>{loc.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <span>Lun-Sab: 09:00-20:00</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
