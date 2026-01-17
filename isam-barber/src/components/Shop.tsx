import { useEffect, useState } from 'react'
import { ShoppingBag, Star, ArrowRight, Check } from 'lucide-react'
import { supabase, Product } from '../lib/supabase'

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [addedId, setAddedId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_active', true)

            if (!error && data) {
                setProducts(data)
            } else {
                setProducts([])
                if (error) console.error('Error fetching products:', error)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [])

    const handleAddToCart = (id: string) => {
        setAddedId(id)
        setTimeout(() => setAddedId(null), 2000)
    }

    return (
        <section id="shop" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <ShoppingBag className="w-3 h-3" /> Area Shop Online
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                            Shop <span className="gold-gradient">Premium</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                            I migliori prodotti professionali per la cura dell'uomo, selezionati dai nostri esperti barbieri per mantenere il tuo stile impeccabile anche a casa.
                        </p>
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: document.getElementById('shop')?.offsetTop, behavior: 'smooth' })}
                        className="group flex items-center gap-3 text-[#D4AF37] font-black uppercase tracking-widest text-xs hover:text-white transition-all bg-white/[0.03] px-6 py-3 rounded-full border border-[#D4AF37]/20"
                    >
                        Esplora Collezione <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="glass-card rounded-[2.5rem] overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-500 bg-white/[0.01]">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={product.image_url || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                    <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                                    <span className="text-white text-[10px] font-black tracking-widest uppercase">Best Seller</span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-1">Price</span>
                                        <span className="text-2xl font-black text-white">€{product.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl ${addedId === product.id
                                            ? 'bg-green-500 text-white shadow-green-500/40 ring-4 ring-green-500/20'
                                            : 'bg-gold-gradient text-black hover:scale-110 shadow-gold-500/30'
                                            }`}
                                    >
                                        {addedId === product.id ? (
                                            <Check className="w-7 h-7 animate-in zoom-in duration-300" />
                                        ) : (
                                            <ShoppingBag className="w-7 h-7" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

