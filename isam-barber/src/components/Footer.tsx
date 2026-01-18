import { Scissors, Phone, Mail, MapPin, Clock, Instagram, Facebook, LayoutDashboard, Youtube, Video } from 'lucide-react'
import { QRCodeSVG } from "qrcode.react"

interface FooterProps {
  onAdminClick: () => void
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer id="contatti" className="py-16 border-t border-[#2a2a2a] light:border-gray-200 light:bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                <Scissors className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold gold-gradient">ISAM-BARBER</span>
            </div>
            <p className="text-gray-300 light:text-gray-700 text-sm mb-6">
              L'arte del taglio incontra l'innovazione. La tua destinazione premium per la cura maschile a Terni.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/barber_shopp61?igsh=d3M1aGpmNjJjeXdh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1a1a] light:bg-gray-100 border border-[#2a2a2a] light:border-gray-300 flex items-center justify-center text-gray-400 light:text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/share/1DB2hj8QVr/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1a1a] light:bg-gray-100 border border-[#2a2a2a] light:border-gray-300 flex items-center justify-center text-gray-400 light:text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@esamnasser523?_r=1&_t=ZN-92JC2VdR9a2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1a1a] light:bg-gray-100 border border-[#2a2a2a] light:border-gray-300 flex items-center justify-center text-gray-400 light:text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all hover:scale-110">
                <Video className="w-5 h-5" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=393533564591&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1a1a] light:bg-gray-100 border border-[#2a2a2a] light:border-gray-300 flex items-center justify-center text-gray-400 light:text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all hover:scale-110">
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8">
              <p className="text-[10px] text-gray-500 light:text-gray-400 mb-3 uppercase tracking-[0.2em] font-bold text-[#D4AF37]/80">Digital Access / Prenota Mobile</p>
              <div className="bg-white p-2 rounded-xl inline-block shadow-2xl shadow-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 group">
                <QRCodeSVG
                  value="https://isam-barbershoptr.netlify.app"
                  size={110}
                  level="H"
                  includeMargin={true}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-6 uppercase tracking-wider text-sm border-b border-[#D4AF37]/30 pb-2 inline-block">Sede 1</h4>
            <div className="space-y-4 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium">Corso Vecchio, 61, Terni</span>
              </div>
              <a href="tel:+393509065386" className="flex items-center gap-3 hover:text-[#D4AF37] group transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+39 350 906 5386</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-6 uppercase tracking-wider text-sm border-b border-[#D4AF37]/30 pb-2 inline-block">Sede 2</h4>
            <div className="space-y-4 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium">Via G. di Vittorio, 9, Terni</span>
              </div>
              <a href="tel:+393533564591" className="flex items-center gap-3 hover:text-[#D4AF37] group transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+39 353 356 4591</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-6 uppercase tracking-wider text-sm border-b border-[#D4AF37]/30 pb-2 inline-block">Orari</h4>
            <div className="space-y-4 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium">Lun - Sab: 09:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Domenica: Chiuso</span>
              </div>
              <a href="mailto:anas019p@gmail.com" className="flex items-center gap-3 hover:text-[#D4AF37] group transition-colors pt-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span>anas019p@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2a2a2a] light:border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 light:text-gray-600 text-xs">© 2024 ISAM-BARBER. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 text-black bg-[#D4AF37] hover:bg-[#B8960C] transition-all border border-[#D4AF37] px-5 py-2 rounded-xl shadow-lg shadow-[#D4AF37]/20 active:scale-95"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-black" /> <span>AREA ADMIN</span>
              </button>
              <a href="#" className="text-gray-500 light:text-gray-500 hover:text-[#D4AF37] transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 light:text-gray-500 hover:text-[#D4AF37] transition-colors">Termini</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
