import { useState } from 'react'
import { Sparkles, Upload, Camera, ImageIcon, ChevronRight, Check, Info, Zap, HelpCircle, ArrowLeft } from 'lucide-react'

const HAIRSTYLES = [
    { id: 1, name: 'Fade Classico', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop' },
    { id: 2, name: 'Undercut', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop' },
    { id: 3, name: 'Pompadour', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop' },
    { id: 4, name: 'Buzz Cut', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop' },
    { id: 5, name: 'Slick Back', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { id: 6, name: 'Crew Cut', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
]

const POPULAR_STYLES = [
    { name: 'Fade Moderno', desc: 'Sfumatura perfetta', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop' },
    { name: 'Pompadour', desc: 'Stile classico', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop' },
    { name: 'Undercut', desc: 'Look audace', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop' },
    { name: 'Texturizzato', desc: 'Naturale', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
]

export default function Simulator() {
    const [showInteractive, setShowInteractive] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
    const [styleDescription, setStyleDescription] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsUploading(true)
            setTimeout(() => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setSelectedImage(reader.result as string)
                    setIsUploading(false)
                }
                reader.readAsDataURL(file)
            }, 1000)
        }
    }

    const handleGenerate = () => {
        if (!selectedImage || !selectedStyle) return
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setShowResult(true)
        }, 3000)
    }

    if (!showInteractive) {
        return (
            <section id="simulatore" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 rounded-full bg-gold-gradient/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Virtual Hair <span className="gold-gradient">Try-On con AI</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                            Usa la nostra piattaforma AI gratuita per provare oltre 200 acconciature diverse.
                            Nessuna registrazione richiesta!
                        </p>
                        <a
                            href="https://righthair.ai/it/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold px-10 py-4 rounded-full font-bold flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-105 transition-all text-black w-fit"
                        >
                            <Sparkles className="w-5 h-5" /> Prova Ora Gratuitamente <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            { icon: Sparkles, title: "200+ Stili", desc: "Scegli tra centinaia di acconciature moderne e classiche" },
                            { icon: Info, title: "100% Gratuito", desc: "Nessun costo, nessuna registrazione necessaria" },
                            { icon: Zap, title: "Risultati Istantanei", desc: "Vedi immediatamente come staresti con ogni stile" }
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-8 rounded-2xl text-center border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all">
                                    <item.icon className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* How it Works & Popular Styles */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                        {/* Come Funziona */}
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-10">Come Funziona</h3>
                            <div className="space-y-10">
                                {[
                                    { title: "Carica la tua foto", desc: "Scatta un selfie o carica una foto frontale" },
                                    { title: "Scegli lo stile", desc: "Naviga tra centinaia di tagli diversi" },
                                    { title: "Visualizza il risultato", desc: "L'AI ti mostrerà come staresti in pochi secondi" }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold flex-shrink-0 shadow-lg shadow-gold-500/20">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                            <p className="text-gray-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stili Popolari */}
                        <div>
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-3xl font-bold text-white">I Nostri Stili Popolari</h3>
                                <div className="text-[#D4AF37] text-sm font-bold flex items-center gap-1">
                                    <Info className="w-4 h-4" /> TRENDING
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {POPULAR_STYLES.map((style, i) => (
                                    <div key={i} className="glass-card rounded-2xl overflow-hidden border-[#D4AF37]/10 group">
                                        <div className="aspect-square relative flex items-center justify-center bg-gray-900">
                                            <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-[#D4AF37] font-bold text-sm mb-1">{style.name}</p>
                                            <p className="text-gray-500 text-xs">{style.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="glass-card p-12 rounded-[2rem] text-center border-[#D4AF37]/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gold-gradient opacity-[0.03] pointer-events-none" />
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Pronto a Trovare il Tuo Look Perfetto?
                        </h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                            Dopo aver trovato lo stile che preferisci, prenota un appuntamento nel nostro salone e i nostri esperti barbieri lo realizzeranno per te!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://righthair.ai/it/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold px-12 py-4 rounded-full font-bold flex items-center justify-center gap-3 text-black"
                            >
                                <Sparkles className="w-5 h-5" /> Prova Virtual Try-On <ChevronRight className="w-5 h-5" />
                            </a>
                            <a
                                href="#prenota"
                                className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-12 py-4 rounded-full font-bold hover:bg-[#D4AF37] hover:text-black transition-all text-center"
                            >
                                Prenota Appuntamento
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="simulatore" className="py-24 relative overflow-hidden bg-[#0d0d0d] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <button
                    onClick={() => setShowInteractive(false)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Torna alla presentazione
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-bold mb-6">
                            <Sparkles className="w-4 h-4" /> SIMULATORE AI ATTIVO
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Personalizza il tuo <span className="gold-gradient">Stile Virtuale</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10">
                            Proprio come nelle nostre sedi, l'AI analizzerà la tua fisionomia per consigliarti il taglio migliore. Carica una foto nitida per il miglior risultato.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: "Selfie Frontale", desc: "Assicurati di avere una buona illuminazione." },
                                { title: "Niente Accessori", desc: "Rimuovi occhiali o cappelli per una precisione maggiore." },
                                { title: "Capelli Raccolti", desc: "Se hai i capelli lunghi, prova a raccoglierli se vuoi vedere un taglio corto." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold flex-shrink-0">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{step.title}</h4>
                                        <p className="text-gray-500 text-xs">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-card rounded-3xl p-8 border-[#D4AF37]/30 shadow-2xl shadow-gold-500/10 bg-black/50 backdrop-blur-2xl">
                            <div className={`aspect-square rounded-2xl border-2 border-dashed ${selectedImage ? 'border-[#D4AF37]' : 'border-gray-700'} flex flex-col items-center justify-center bg-black/40 group hover:border-[#D4AF37]/50 transition-all relative overflow-hidden shadow-inner`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    onChange={handleFileUpload}
                                />
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Uploaded" className={`w-full h-full object-cover absolute inset-0 z-10 transition-all ${showResult ? 'brightness-110 contrast-110' : ''}`} />
                                ) : (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Upload className="w-10 h-10 text-gray-500 group-hover:text-[#D4AF37]" />
                                        </div>
                                        <p className="font-bold mb-2">Seleziona la tua Foto</p>
                                        <p className="text-gray-500 text-sm mb-8">PNG, JPG fino a 10MB</p>

                                        <div className="flex gap-4 relative z-0 pointer-events-none">
                                            <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm border border-white/5">
                                                <Camera className="w-4 h-4" /> Camera
                                            </button>
                                            <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-sm border border-white/5">
                                                <ImageIcon className="w-4 h-4" /> Files
                                            </button>
                                        </div>
                                    </>
                                )}

                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
                                        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}

                                {isGenerating && (
                                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-40 text-center p-8">
                                        <div className="relative mb-6">
                                            <div className="w-16 h-16 border-4 border-[#D4AF37]/20 rounded-full"></div>
                                            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                                            <Sparkles className="w-6 h-6 text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                                        </div>
                                        <p className="gold-gradient font-black text-xl mb-2">AI STYLING...</p>
                                        <p className="text-gray-400 text-sm">Elaborazione biometria facciale per: <br /><span className="text-white font-bold">{HAIRSTYLES.find(h => h.id === selectedStyle)?.name}</span></p>
                                    </div>
                                )}

                                {showResult && (
                                    <div className="absolute top-4 right-4 z-40">
                                        <div className="bg-[#D4AF37] text-black px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-2xl shadow-gold-500/50 animate-bounce">
                                            <Check className="w-3 h-3" /> LOOK COMPLETATO
                                        </div>
                                    </div>
                                )}
                            </div>

                            {selectedImage && !showResult && (
                                <div className="mt-8 animate-fade-in">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-black text-sm uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" /> Selezione Stile
                                        </h3>
                                        {selectedStyle && <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-md font-bold uppercase">{HAIRSTYLES.find(h => h.id === selectedStyle)?.name}</span>}
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {HAIRSTYLES.map((style) => (
                                            <button
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style.id)}
                                                className={`relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedStyle === style.id
                                                    ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/10 scale-95'
                                                    : 'border-white/5 hover:border-[#D4AF37]/40'
                                                    }`}
                                            >
                                                <img src={style.image} alt={style.name} className="w-full aspect-square object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                                    <p className="text-[8px] font-black text-white uppercase">{style.name}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-[10px] font-black mb-2 text-gray-500 uppercase tracking-[0.2em]">
                                            Dettagli Extra (Opzionale)
                                        </label>
                                        <textarea
                                            value={styleDescription}
                                            onChange={(e) => setStyleDescription(e.target.value)}
                                            placeholder="Aggiungi note come: 'sfumatura più bassa', 'barba curata'..."
                                            className="w-full h-20 text-xs bg-white/[0.03] border-white/10 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none p-4"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-8">
                                {showResult ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => {
                                                setShowResult(false)
                                                setSelectedStyle(null)
                                            }}
                                            className="w-full bg-white/10 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
                                        >
                                            Prova un altro look
                                        </button>
                                        <a href="#prenota" className="btn-gold w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-black">
                                            Prenota questo taglio <ChevronRight className="w-5 h-5" />
                                        </a>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleGenerate}
                                        className="w-full btn-gold py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl shadow-gold-500/20 disabled:opacity-30 disabled:grayscale transition-all text-black"
                                        disabled={!selectedImage || !selectedStyle || isGenerating}
                                    >
                                        {isGenerating ? 'ANALISI IN CORSO...' : 'LANCIA SIMULAZIONE AI'} <Zap className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

