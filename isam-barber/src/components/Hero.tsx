import { ChevronDown, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.png"
          alt="Barber Shop Interior"
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-10" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${7 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-[#D4AF37] blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] p-1 shadow-2xl shadow-gold-500/40 relative z-10 animate-float">
            <div className="w-full h-full bg-black rounded-[22px] flex items-center justify-center overflow-hidden">
              <img src="/logo_3d.png" alt="ISAM-BARBER Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 tracking-tighter">
          <span className="gold-gradient">ISAM</span>
          <span className="text-white">-BARBER</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          L'avanguardia del grooming maschile. Dove la tradizione incontra l'innovazione premium.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#prenota"
            className="btn-gold px-8 py-4 rounded-lg text-lg font-semibold inline-block"
          >
            Prenota Ora
          </a>
          <a
            href="#servizi"
            className="px-8 py-4 rounded-lg text-lg font-semibold border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all inline-block"
          >
            I Nostri Servizi
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">10+</div>
            <div className="text-gray-500 text-sm">Anni Esperienza</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">2</div>
            <div className="text-gray-500 text-sm">Sedi a Terni</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gold-gradient">5k+</div>
            <div className="text-gray-500 text-sm">Clienti Soddisfatti</div>
          </div>
        </div>
      </div>

      <a
        href="#servizi"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37] animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  )
}
