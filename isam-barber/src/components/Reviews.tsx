import { useState, useEffect } from 'react'
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { supabase, Review } from '../lib/supabase'

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [newReview, setNewReview] = useState({
        customer_name: '',
        rating: 5,
        comment: ''
    })

    useEffect(() => {
        fetchReviews()
    }, [])

    async function fetchReviews() {
        const { data } = await supabase
            .from('reviews')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })

        if (data) setReviews(data)
        setLoading(false)
    }

    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const { error: submitError } = await supabase
            .from('reviews')
            .insert([{
                ...newReview,
                status: 'pending' // Default status
            }])

        if (!submitError) {
            setSubmitted(true)
            setNewReview({ customer_name: '', rating: 5, comment: '' })
        } else {
            console.error('Review submission error:', submitError)
            setError('Errore nell\'invio della recensione. Riprova più tardi.')
        }
        setIsSubmitting(false)
    }

    return (
        <section id="recensioni" className="py-24 relative bg-black/50 light:bg-gray-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gold-gradient">Cosa dicono di noi</span>
                    </h2>
                    <p className="text-gray-400 light:text-gray-600">La soddisfazione dei nostri clienti è la nostra priorità.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Review Form */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-8 rounded-2xl sticky top-24 border-[#D4AF37]/20">
                            <h3 className="text-xl font-bold text-white light:text-gray-900 mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                                Lascia una recensione
                            </h3>

                            {submitted ? (
                                <div className="text-center py-8 animate-fade-in">
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h4 className="text-white light:text-gray-900 font-bold mb-2">Grazie mille!</h4>
                                    <p className="text-gray-400 light:text-gray-500 text-sm">
                                        La tua recensione è stata inviata e sarà visibile dopo l'approvazione del team.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 text-[#D4AF37] hover:underline text-sm font-medium"
                                    >
                                        Scrivi un'altra recensione
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 light:text-gray-600 mb-2">Nome</label>
                                        <input
                                            type="text"
                                            required
                                            value={newReview.customer_name}
                                            onChange={e => setNewReview({ ...newReview, customer_name: e.target.value })}
                                            placeholder="Il tuo nome"
                                            className="w-full bg-black/40 light:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 light:text-gray-600 mb-2">Valutazione</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-6 h-6 ${star <= newReview.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 light:text-gray-600 mb-2">Commento</label>
                                        <textarea
                                            required
                                            value={newReview.comment}
                                            onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                            placeholder="Raccontaci la tua esperienza..."
                                            className="w-full h-32 bg-black/40 light:bg-white"
                                        />
                                    </div>
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs animate-shake">
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-gold py-3 rounded-lg flex items-center justify-center gap-2 font-bold"
                                    >
                                        {isSubmitting ? 'Invio...' : 'Invia Recensione'}
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="text-center py-20 text-[#D4AF37]">Caricamento recensioni...</div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-20 glass-card rounded-2xl">
                                <p className="text-gray-500">Non ci sono ancora recensioni approvate.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="glass-card p-6 rounded-2xl border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-white light:text-gray-900 font-bold">{review.customer_name}</h4>
                                                <p className="text-gray-500 text-xs">
                                                    {new Date(review.created_at).toLocaleDateString('it-IT')}
                                                </p>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-700'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 light:text-gray-600 text-sm italic">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
