import { useState, useEffect, useCallback } from 'react'
import {
  X, LogOut, Image, Scissors, Calendar, Plus, Trash2, Edit2, Check,
  Users, ShoppingBag, MessageSquare, Package, Settings as SettingsIcon,
  Clock, AlertCircle, RefreshCw, Database, Monitor, Globe, Shield, Video,
  Star
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  supabase, Service, Booking, GalleryItem, Staff, Product, Order, Review, Settings
} from '../lib/supabase'
import { uploadFile } from '../utils/supabaseStorage'
import { getErrors, clearErrors, AppError } from '../utils/errorLogger'

interface Props {
  onClose: () => void
}

type AdminTab = 'today' | 'hours' | 'staff' | 'shop' | 'bookings' | 'reviews' | 'orders' | 'customers' | 'gallery' | 'settings' | 'profile'

export default function AdminPanel({ onClose }: Props) {
  const { signOut } = useAuth()
  const [tab, setTab] = useState<AdminTab>('today')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  // Data states
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      switch (tab) {
        case 'bookings':
        case 'today': {
          const { data: bData } = await supabase.from('bookings').select('*').order('booking_date', { ascending: false })
          setBookings(bData || [])
          break
        }
        case 'hours':
        case 'staff': {
          const { data: sData } = await supabase.from('staff').select('*')
          setStaff(sData || [])
          break
        }
        case 'shop': {
          const { data: pData } = await supabase.from('products').select('*')
          setProducts(pData || [])
          break
        }
        case 'gallery': {
          const { data: gData } = await supabase.from('gallery').select('*').order('sort_order')
          setGallery(gData || [])
          break
        }
        case 'orders': {
          const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
          setOrders(oData || [])
          break
        }
        case 'reviews': {
          const { data: rData } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
          setReviews(rData || [])
          break
        }
        case 'settings': {
          const { data: setRes } = await supabase.from('settings').select('*').single()
          setSettings(setRes)
          break
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const showNotification = (msg: string) => {
    setStatus(msg)
    setTimeout(() => setStatus(null), 3000)
  }

  const handleLogout = async () => {
    await signOut()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="glass px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] p-0.5">
            <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
              <img src="/logo_3d.png" alt="Logo" className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold gold-gradient leading-none">Pannello Admin</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Gestione completa ISAM-BARBER</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setTab('profile')} className="hidden md:flex flex-col items-end hover:opacity-80 transition-opacity cursor-pointer text-right">
            <span className="text-sm font-medium text-white light:text-black">Amministratore</span>
            <span className="text-[10px] text-green-500">Gestisci Profilo</span>
          </button>
          <button onClick={handleLogout} className="p-2 text-gray-400 light:text-gray-600 hover:text-red-400 transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 light:text-gray-600 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Navigation Sidebar */}
        <aside className="w-64 glass border-r border-[#D4AF37]/10 p-4 space-y-2 overflow-y-auto">
          <NavItem active={tab === 'today'} icon={Clock} label="Oggi" onClick={() => setTab('today')} />
          <NavItem active={tab === 'profile'} icon={Users} label="Mio Profilo" onClick={() => setTab('profile')} />
          <NavItem active={tab === 'hours'} icon={Calendar} label="Orari" onClick={() => setTab('hours')} />
          <NavItem active={tab === 'staff'} icon={Users} label="Staff" onClick={() => setTab('staff')} />
          <NavItem active={tab === 'shop'} icon={ShoppingBag} label="Shop" onClick={() => setTab('shop')} />
          <NavItem active={tab === 'bookings'} icon={Scissors} label="Prenotazioni" onClick={() => setTab('bookings')} />
          <NavItem active={tab === 'reviews'} icon={MessageSquare} label="Recensioni" onClick={() => setTab('reviews')} />
          <NavItem active={tab === 'orders'} icon={Package} label="Ordini" onClick={() => setTab('orders')} />
          <NavItem active={tab === 'customers'} icon={Users} label="Clienti" onClick={() => setTab('customers')} />
          <NavItem active={tab === 'gallery'} icon={Image} label="Galleria" onClick={() => setTab('gallery')} />
          <NavItem active={tab === 'settings'} icon={SettingsIcon} label="Impostazioni" onClick={() => setTab('settings')} />
        </aside>

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-5xl mx-auto">
            {tab === 'today' && <TodaySection bookings={bookings} />}
            {tab === 'hours' && <HoursSection />}
            {tab === 'staff' && <StaffSection staff={staff} onUpdate={fetchData} />}
            {tab === 'shop' && <ShopSection products={products} onUpdate={fetchData} />}
            {tab === 'bookings' && <BookingsList bookings={bookings} onUpdate={fetchData} />}
            {tab === 'orders' && <OrdersSection orders={orders} onUpdate={fetchData} />}
            {tab === 'reviews' && <ReviewsSection reviews={reviews} onUpdate={fetchData} />}
            {tab === 'customers' && <CustomersSection bookings={bookings} />}
            {tab === 'gallery' && <GallerySection gallery={gallery} onUpdate={fetchData} />}
            {tab === 'settings' && <SettingsSection settings={settings} onUpdate={fetchData} />}
            {tab === 'profile' && <ProfileSection />}
          </div>

          {loading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
              <RefreshCw className="w-10 h-10 text-[#D4AF37] animate-spin" />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Notification */}
      {status && (
        <div className="fixed bottom-6 right-6 glass px-6 py-3 rounded-xl border border-[#D4AF37]/30 text-white animate-bounce-in flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          {status}
        </div>
      )}
    </div>
  )
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active
        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-semibold shadow-lg shadow-gold-500/20'
        : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
        }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-black' : ''}`} />
      <span className="text-sm">{label}</span>
    </button>
  )
}

// Sub-components for sections
function TodaySection({ bookings }: { bookings: Booking[] }) {
  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter(b => b.booking_date === today)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Riepilogo Oggi</h2>
        <span className="text-gray-400">{new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Appuntamenti" value={todayBookings.length.toString()} icon={Scissors} color="gold" />
        <StatCard label="Posti Liberi" value="8" icon={Clock} color="green" />
        <StatCard label="Status Negozio" value="Aperto" icon={Globe} color="blue" />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Prossimi Appuntamenti
        </h3>
        <div className="space-y-4">
          {todayBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Nessun appuntamento per oggi</div>
          ) : (
            todayBookings.map(b => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold">
                    {b.customer_name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{b.customer_name}</h4>
                    <p className="text-xs text-gray-500">{b.booking_time} - Barbiere Express</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                  {b.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        <Icon className="w-12 h-12" />
      </div>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <h4 className="text-3xl font-bold text-white">{value}</h4>
    </div>
  )
}

function HoursSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestione Orari</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-[#D4AF37] font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Orario Settimanale
          </h3>
          <div className="space-y-4">
            {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].map(day => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-300 w-24 text-sm">{day}</span>
                <div className="flex items-center gap-2">
                  <input type="text" defaultValue="09:00" className="w-20 text-xs text-center p-1" />
                  <span className="text-gray-600">-</span>
                  <input type="text" defaultValue="19:30" className="w-20 text-xs text-center p-1" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full btn-gold mt-8 py-3 rounded-xl font-bold text-sm">Salva Orari</button>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-red-400 font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Giorni di Chiusura
          </h3>
          <p className="text-sm text-gray-500 mb-6">Seleziona date specifiche per festività o ferie.</p>
          {/* Calendar placeholder */}
          <div className="aspect-square bg-white/5 rounded-xl border border-white/5 p-4 text-center flex flex-col items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Modulo Calendario</p>
          </div>
          <button className="w-full glass-card mt-6 py-3 rounded-xl text-sm font-medium hover:bg-white/5">Aggiungi Chiusura</button>
        </div>
      </div>
    </div>
  )
}

function StaffSection({ staff, onUpdate }: { staff: Staff[], onUpdate: () => void }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: '', avatar_url: '' })

  const handleAdd = async () => {
    if (!newStaff.name || !newStaff.role) return
    const { error } = await supabase.from('staff').insert([newStaff])
    if (!error) {
      setIsAdding(false)
      setNewStaff({ name: '', role: '', avatar_url: '' })
      onUpdate()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Eliminare questo barbiere?')) {
      const { error } = await supabase.from('staff').delete().eq('id', id)
      if (!error) onUpdate()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Staff Barbieri</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-gold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Aggiungi Barbiere
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 rounded-2xl animate-fade-in mb-8">
          <h3 className="text-[#D4AF37] font-bold mb-4">Nuovo Membro Staff</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Nome Completo"
              value={newStaff.name}
              onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
            />
            <input
              placeholder="Ruolo (es. Senior Barber)"
              value={newStaff.role}
              onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
            />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Carica Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadFile('staff', file);
                      setNewStaff({ ...newStaff, avatar_url: url });
                    } catch (err: any) {
                      alert('Errore nel caricamento: ' + err.message);
                    }
                  }
                }}
                className="text-xs"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleAdd} className="btn-gold px-6 py-2 rounded-lg">Salva</button>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">Annulla</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staff.length === 0 ? (
          <div className="col-span-2 glass-card py-20 text-center text-gray-500 border-dashed border-2 border-white/5">
            Nessun barbiere registrato. Aggiungine uno sopra.
          </div>
        ) : (
          staff.map(member => (
            <div key={member.id} className="glass-card p-4 rounded-xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-black p-0.5 overflow-hidden">
                  <img src={member.avatar_url || 'https://via.placeholder.com/150'} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{member.name}</h4>
                  <p className="text-gray-500 text-xs">{member.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(member.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function ShopSection({ products, onUpdate }: { products: Product[], onUpdate: () => void }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    image_url: '',
    discount: 0,
    is_active: true
  })

  const handleAdd = async () => {
    if (!newProduct.name || newProduct.price <= 0) return
    const { error } = await supabase.from('products').insert([newProduct])
    if (!error) {
      setIsAdding(false)
      setNewProduct({
        name: '',
        price: 0,
        stock: 0,
        category: '',
        description: '',
        image_url: '',
        discount: 0,
        is_active: true
      })
      onUpdate()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Eliminare questo prodotto?')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) onUpdate()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestione Shop</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-gold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nuovo Prodotto
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 rounded-2xl animate-fade-in mb-8">
          <h3 className="text-[#D4AF37] font-bold mb-4">Nuovo Prodotto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Nome Prodotto"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Prezzo (€)"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            />
            <input
              placeholder="Categoria"
              value={newProduct.category}
              onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              placeholder="URL Immagine"
              value={newProduct.image_url}
              onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
            />
            <input
              type="number"
              placeholder="Sconto (€)"
              value={newProduct.discount}
              onChange={e => setNewProduct({ ...newProduct, discount: parseFloat(e.target.value) })}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active_product"
                checked={newProduct.is_active}
                onChange={e => setNewProduct({ ...newProduct, is_active: e.target.checked })}
              />
              <label htmlFor="is_active_product" className="text-gray-300 text-sm">Prodotto Attivo</label>
            </div>
            <div className="flex border-2 border-dashed border-white/10 rounded-xl p-4 flex-col items-center justify-center gap-2 hover:border-[#D4AF37]/50 transition-colors">
              <Plus className="w-5 h-5 text-gray-500" />
              <label className="text-[10px] text-gray-500 uppercase font-bold cursor-pointer">Carica Immagine Prodotto</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadFile('products', file);
                      setNewProduct({ ...newProduct, image_url: url });
                    } catch (err: any) {
                      alert('Errore nel caricamento: ' + err.message);
                    }
                  }
                }}
                className="hidden"
                id="product-upload"
              />
              <button
                type="button"
                onClick={() => document.getElementById('product-upload')?.click()}
                className="text-[10px] bg-white/5 px-2 py-1 rounded"
              >
                Scegli File
              </button>
              {newProduct.image_url && <span className="text-[8px] text-green-500 truncate w-full text-center">Caricato!</span>}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleAdd} className="btn-gold px-6 py-2 rounded-lg">Aggiungi</button>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">Annulla</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="glass-card rounded-2xl overflow-hidden group border border-white/5">
            <div className="aspect-video relative overflow-hidden bg-black">
              <img src={p.image_url || 'https://via.placeholder.com/300x200'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-black/60 backdrop-blur p-2 rounded-lg text-red-400 hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-bold">{p.name}</h4>
                <p className="text-[#D4AF37] font-black">€{p.price}</p>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Stock: {p.stock}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${p.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {p.stock > 0 ? 'Disponibile' : 'Esaurito'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingsList({ bookings, onUpdate }: { bookings: Booking[], onUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Appuntamenti Registrati</h2>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#D4AF37]/10 text-[#D4AF37] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Servizio</th>
              <th className="px-6 py-4">Data/Ora</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{b.customer_name}</div>
                  <div className="text-xs text-gray-500">{b.customer_phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-400">Taglio Barba & Capelli</td>
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{b.booking_date}</div>
                  <div className="text-xs text-[#D4AF37]">{b.booking_time}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${b.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>{b.status}</span>
                </td>
                <td className="px-6 py-4 text-right flex gap-2 justify-end">
                  <button className="p-2 hover:bg-green-500/10 rounded-lg text-green-400"><Check className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-400"><X className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SettingsSection({ settings, onUpdate }: { settings: Settings | null, onUpdate: () => void }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  if (!settings) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
      <p className="text-gray-400 mb-4">Impostazioni non trovate nel database.</p>
      <button
        onClick={async () => {
          const { error } = await supabase.from('settings').insert([{ is_shop_open: true, announcement: 'Benvenuti!' }]);
          if (!error) onUpdate();
        }}
        className="btn-gold px-6 py-2 rounded-lg"
      >
        Inizializza Impostazioni
      </button>
    </div>
  )

  const toggleShop = async () => {
    const { error } = await supabase
      .from('settings')
      .update({ is_shop_open: !settings.is_shop_open })
      .eq('id', settings.id)
    if (!error) onUpdate()
  }

  const handleAction = (label: string) => {
    setLoading(true)
    setStatus(`Esecuzione: ${label}...`)
    setTimeout(() => {
      setLoading(false)
      setStatus(`Successo: ${label} completato!`)
      setTimeout(() => setStatus(null), 3000)
    }, 2000)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-white mb-8">Impostazioni Sistema</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Stato Negozio */}
        <div className="glass-card p-8 rounded-3xl border-[#D4AF37]/20 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Stato Negozio</h3>
            </div>
            <button
              onClick={toggleShop}
              className={`w-14 h-7 rounded-full transition-all relative ${settings.is_shop_open ? 'bg-green-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.is_shop_open ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
          <div className={`p-4 rounded-xl border ${settings.is_shop_open ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <p className={`font-bold uppercase text-xs mb-1 ${settings.is_shop_open ? 'text-green-500' : 'text-red-500'}`}>
              {settings.is_shop_open ? 'Online' : 'Offline'}
            </p>
            <p className="text-gray-400 text-sm">
              {settings.is_shop_open
                ? 'Il negozio è attualmente aperto e accetta prenotazioni online.'
                : 'Il negozio è chiuso. Le nuove prenotazioni sono disabilitate.'}
            </p>
          </div>
        </div>

        {/* Box 2: Sicurezza & Backup */}
        <div className="glass-card p-8 rounded-3xl border-blue-500/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Sicurezza & Backup</h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => handleAction('Backup Database')}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">Esegui Backup Database</span>
              </div>
              <RefreshCw className={`w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (confirm('Questo ricaricherà l\'applicazione per pulire la cache locale. Continuare?')) {
                  window.location.reload();
                }
              }}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-gray-200">Aggiorna & Pulisci Cache</span>
              </div>
              <Monitor className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Box 3: Informazioni Sistema */}
      <div className="glass-card p-8 rounded-3xl border-white/10">
        <h3 className="text-lg font-bold text-white mb-6">Informazioni Sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'App Version', value: '1.0.0' },
            { label: 'React Version', value: '18.3.1' },
            { label: 'Supabase', value: 'Connected' },
            { label: 'Piattaforma', value: 'Production' }
          ].map((item, i) => (
            <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Box 4: Log Errori (Nuovo) */}
      <ErrorsSection />

      {status && (
        <div className="fixed bottom-8 right-8 animate-fade-in z-50">
          <div className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
            <Check className="w-4 h-4" /> {status}
          </div>
        </div>
      )}
    </div>
  )
}

function InfoBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}

function OrdersSection({ orders, onUpdate }: { orders: Order[], onUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Ordini Shop</h2>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#D4AF37]/10 text-[#D4AF37] font-bold">
            <tr>
              <th className="px-6 py-4">Ordine ID</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Totale</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{o.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-white">{o.customer_name}</td>
                <td className="px-6 py-4 font-bold text-[#D4AF37]">€{o.total_amount}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">{o.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-white p-2">Dettagli</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ReviewsSection({ reviews, onUpdate }: { reviews: Review[], onUpdate: () => void }) {
  const approveReview = async (id: string) => {
    await supabase.from('reviews').update({ status: 'approved' }).eq('id', id)
    onUpdate()
  }

  const deleteReview = async (id: string) => {
    if (confirm('Sicuro di voler eliminare questa recensione?')) {
      await supabase.from('reviews').delete().eq('id', id)
      onUpdate()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Moderazione Recensioni</h2>
      <div className="grid grid-cols-1 gap-4">
        {reviews.map(review => (
          <div key={review.id} className={`glass-card p-6 rounded-2xl border ${review.status === 'approved' ? 'border-green-500/30' : 'border-white/10'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-bold">{review.customer_name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${review.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {review.status}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-700'}`} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic mb-2">"{review.comment}"</p>
                <p className="text-[10px] text-gray-500">{new Date(review.created_at).toLocaleDateString('it-IT')}</p>
              </div>
              <div className="flex gap-2">
                {review.status !== 'approved' && (
                  <button
                    onClick={() => approveReview(review.id)}
                    className="flex-1 md:flex-none btn-gold px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Check className="w-3 h-3" /> Approva
                  </button>
                )}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="flex-1 md:flex-none bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-3 h-3" /> Elimina
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomersSection({ bookings }: { bookings: Booking[] }) {
  const customers = Array.from(new Set(bookings.map(b => b.customer_phone))).map(phone => {
    return bookings.find(b => b.customer_phone === phone)
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Database Clienti</h2>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#D4AF37]/10 text-[#D4AF37] font-bold">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Telefono</th>
              <th className="px-6 py-4">Ultimo Appunt.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map(c => c && (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-white font-medium">{c.customer_name}</td>
                <td className="px-6 py-4 text-gray-400">{c.customer_phone}</td>
                <td className="px-6 py-4 text-gray-500">{c.booking_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function GallerySection({ gallery, onUpdate }: { gallery: GalleryItem[], onUpdate: () => void }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    media_url: '',
    media_type: 'image' as 'image' | 'video',
    is_active: true,
    sort_order: 0
  })

  const handleAdd = async () => {
    if (!newItem.media_url) return
    const { error } = await supabase.from('gallery').insert([newItem])
    if (!error) {
      setIsAdding(false)
      setNewItem({
        title: '',
        media_url: '',
        media_type: 'image',
        is_active: true,
        sort_order: 0
      })
      onUpdate()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestione Galleria</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-gold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Aggiungi Media
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 rounded-2xl animate-fade-in mb-8">
          <h3 className="text-[#D4AF37] font-bold mb-4">Nuovo Media Galleria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Titolo (opzionale)"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
            />
            <input
              placeholder="URL Media (Immagine o Video)"
              value={newItem.media_url}
              onChange={e => setNewItem({ ...newItem, media_url: e.target.value })}
            />
            <select
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
              value={newItem.media_type}
              onChange={e => setNewItem({ ...newItem, media_type: e.target.value as 'image' | 'video' })}
            >
              <option value="image" className="bg-black">Immagine</option>
              <option value="video" className="bg-black">Video</option>
            </select>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Carica File</label>
              <input
                type="file"
                accept={newItem.media_type === 'video' ? 'video/*' : 'image/*'}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadFile('gallery', file);
                      setNewItem({ ...newItem, media_url: url });
                    } catch (err: any) {
                      alert('Errore nel caricamento: ' + err.message);
                    }
                  }
                }}
                className="text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active_gallery"
                checked={newItem.is_active}
                onChange={e => setNewItem({ ...newItem, is_active: e.target.checked })}
              />
              <label htmlFor="is_active_gallery" className="text-gray-300 text-sm">Media Attivo</label>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleAdd} className="btn-gold px-6 py-2 rounded-lg">Aggiungi</button>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">Annulla</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="relative aspect-square group rounded-xl overflow-hidden glass-card border border-white/5">
            {item.media_type === 'video' ? (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <Video className="w-12 h-12 text-[#D4AF37]" />
                <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded text-white uppercase">Video</span>
              </div>
            ) : (
              <img src={item.media_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button className="p-2 bg-red-600 rounded-lg text-white" onClick={async () => {
                if (confirm('Eliminare questo media?')) {
                  await supabase.from('gallery').delete().eq('id', item.id);
                  onUpdate();
                }
              }}><Trash2 className="w-4 h-4" /></button>
            </div>
            {!item.is_active && (
              <div className="absolute top-2 left-2 bg-red-500/80 text-white text-[8px] px-2 py-0.5 rounded uppercase font-bold">Nascosto</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileSection() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Il Mio Profilo Admin</h2>
      <div className="glass-card p-8 rounded-2xl max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-4xl font-bold text-black border-4 border-black/20 shadow-xl">
            {user?.email?.[0].toUpperCase() || 'A'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{user?.email?.split('@')[0] || 'Admin'}</h3>
            <p className="text-[#D4AF37] font-medium">Amministratore di Sistema</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs uppercase font-bold mb-1">Email</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs uppercase font-bold mb-1">Ultimo Accesso</p>
              <p className="text-white font-medium">{new Date(user?.last_sign_in_at || '').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sicurezza & Preferenze</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full glass-card py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold text-[#D4AF37]">
                <RefreshCw className="w-4 h-4" /> Cambia Password
              </button>
              <button className="w-full glass-card py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold text-gray-400 hover:text-white">
                <SettingsIcon className="w-4 h-4" /> Preferenze notifiche
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorsSection() {
  const [errors, setErrors] = useState<AppError[]>([]);

  useEffect(() => {
    setErrors(getErrors());
    const handleNewError = () => setErrors(getErrors());
    window.addEventListener('app_error_logged', handleNewError);
    return () => window.removeEventListener('app_error_logged', handleNewError);
  }, []);

  const handleClear = () => {
    if (confirm('Sei sicuro di voler cancellare tutti i log degli errori?')) {
      clearErrors();
      setErrors([]);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border-red-500/10 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Log Errori App</h3>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
        >
          Cancella Log
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-hide">
        {errors.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-black/20 rounded-2xl border border-dashed border-white/5">
            Nessun errore registrato. Ottimo lavoro!
          </div>
        ) : (
          errors.map((err) => (
            <div key={err.id} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 group">
              <div className="flex items-start justify-between">
                <p className="text-red-400 text-sm font-bold flex-1">{err.message}</p>
                <span className="text-[10px] text-gray-500">{new Date(err.timestamp).toLocaleString('it-IT')}</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">{err.url}</p>
              {err.stack && (
                <details className="text-[10px] text-gray-600">
                  <summary className="cursor-pointer hover:text-gray-400 transition-colors">Visualizza Stack Trace</summary>
                  <pre className="mt-2 p-2 bg-black rounded overflow-x-auto whitespace-pre-wrap">{err.stack}</pre>
                </details>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
