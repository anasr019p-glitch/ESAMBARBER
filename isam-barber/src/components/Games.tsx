import { Gamepad2, Play, Trophy, Sparkles } from 'lucide-react'

export default function Games() {
    const games = [
        {
            id: 1,
            title: 'Playstation (PSX)',
            description: 'Rivivi i grandi classici della prima Playstation direttamente nel browser.',
            icon: Gamepad2,
            badge: 'arcade',
            action: 'Gioca Ora',
            gradient: 'from-blue-600 to-purple-600',
            url: 'https://www.retrogames.cc/psx-games'
        },
        {
            id: 2,
            title: 'Crazy Games',
            description: 'Migliaia di giochi gratuiti di ogni genere per passare il tempo.',
            icon: Trophy,
            badge: 'web',
            action: 'Gioca Ora',
            gradient: 'from-orange-500 to-red-600',
            url: 'https://www.crazygames.com/it'
        },
        {
            id: 3,
            title: 'Konami GB Vol. 4',
            description: 'La leggendaria collezione Konami per GameBoy: Gradius, Castlevania e altro.',
            icon: Sparkles,
            badge: 'gameboy',
            action: 'Avvia Gioco',
            gradient: 'from-green-500 to-teal-600',
            url: 'https://www.retrogames.cc/gameboy-games/konami-gb-collection-vol-4-japan.html'
        },
        {
            id: 4,
            title: 'Mickey Mouse GB',
            description: 'Aiuta Topolino nella sua avventura magica su GameBoy Classic.',
            icon: Play,
            badge: 'gameboy',
            action: 'Avvia Gioco',
            gradient: 'from-pink-500 to-rose-600',
            url: 'https://www.retrogames.cc/gameboy-games/mickey-mouse-magic-wand-usa-europe.html'
        },
        {
            id: 5,
            title: 'Judge Dredd',
            description: 'Porta la legge nelle strade di Mega-City One in questo classico retro.',
            icon: Trophy,
            badge: 'gameboy',
            action: 'Avvia Gioco',
            gradient: 'from-yellow-600 to-red-700',
            url: 'https://www.retrogames.cc/gameboy-games/judge-dredd-usa-europe.html'
        },
        {
            id: 6,
            title: 'GameBoy Archive',
            description: 'Sfoglia centinaia di altri titoli per la console portatile più amata.',
            icon: Gamepad2,
            badge: 'retro',
            action: 'Sfoglia Tutti',
            gradient: 'from-gray-600 to-slate-800',
            url: 'https://www.retrogames.cc/gameboy-games'
        }
    ]

    return (
        <section id="giochi" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-bold mb-6">
                        <Gamepad2 className="w-4 h-4" /> ZONA RELAX
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Giochi & <span className="gold-gradient">Svago</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Rilassati mentre aspetti il tuo turno con giochi gratuiti e meme divertenti!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            onClick={() => window.open(game.url, '_blank')}
                            className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300 cursor-pointer border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <game.icon className="w-8 h-8 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                                    {game.badge}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                                {game.title}
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {game.description}
                            </p>

                            <button className="w-full btn-gold py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20">
                                <Play className="w-5 h-5" /> {game.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
