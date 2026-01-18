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
            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold text-[#D4AF37]">Scansiona per App</p>
              <div className="bg-white p-2 rounded-lg inline-block shadow-lg shadow-gold-500/10 border-2 border-[#D4AF37]">
                <QRCodeSVG
                  value="https://isam-barbershoptr.netlify.app"
                  size={100}
                  style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-4">Sede 1</h4>
            <div className="space-y-3 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium light:text-gray-700">Corso Vecchio, 61, Terni</span>
              </div>
              <a href="tel:+393509065386" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="light:text-gray-700">+39 350 906 5386</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-4">Sede 2</h4>
            <div className="space-y-3 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium light:text-gray-700">Via G. di Vittorio, 9, Terni</span>
              </div>
              <a href="tel:+393533564591" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="light:text-gray-700">+39 353 356 4591</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white light:text-gray-900 font-semibold mb-4">Orari</h4>
            <div className="space-y-3 text-gray-300 light:text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium light:text-gray-700">Lun - Sab: 09:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 light:text-gray-500">Domenica: Chiuso</span>
              </div>
              <a href="mailto:anas019p@gmail.com" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span className="light:text-gray-700">anas019p@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] light:border-gray-200 text-center text-gray-300 light:text-gray-700 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>2024 ISAM-BARBER. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 text-black bg-[#D4AF37] hover:bg-[#B8960C] transition-colors border border-[#D4AF37] px-4 py-2 rounded-lg shadow-lg shadow-gold-500/30"
              >
                <LayoutDashboard className="w-3 h-3 text-black" /> <span className="text-black font-extrabold">AREA ADMIN</span>
              </button>
              <a href="#" className="text-gray-400 light:text-gray-600 hover:text-[#D4AF37] transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 light:text-gray-600 hover:text-[#D4AF37] transition-colors">Termini</a>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}
