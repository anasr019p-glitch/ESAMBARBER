import { useEffect, useState } from 'react'
import { Camera } from 'lucide-react'
import { supabase, GalleryItem } from '../lib/supabase'

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      setItems(data || [])
      setLoading(false)
    }
    fetchGallery()
  }, [])

  return (
    <section id="galleria" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white light:text-black">
            <span className="gold-gradient">La Nostra Galleria</span>
          </h2>
          <p className="text-gray-400 light:text-gray-600 text-lg">I nostri lavori parlano da soli.</p>
        </div>

        {loading ? (
          <div className="text-center text-[#D4AF37]">Caricamento...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">La galleria sara presto disponibile</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-xl overflow-hidden group relative"
              >
                {item.media_type === 'video' ? (
                  <video
                    src={item.media_url}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title || 'Gallery'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
