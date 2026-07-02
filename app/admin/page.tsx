'use client'

import { useEffect, useRef, useState } from 'react'
import Lightbox from '@/components/Lightbox'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface GalleryImage {
  public_id: string
  url: string
}

interface ClickEntry {
  type: 'phone' | 'whatsapp'
  timestamp: string
  city: string | null
  region: string | null
  country: string | null
}

interface DayStats {
  date: string
  phone: number
  whatsapp: number
  visit: number
}

interface StatsData {
  today: { clicks: ClickEntry[]; phone: number; whatsapp: number; visit: number }
  weekly: DayStats[]
}

function SortableImage({
  img,
  index,
  deleting,
  onView,
  onDelete,
}: {
  img: GalleryImage
  index: number
  deleting: string | null
  onView: (i: number) => void
  onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.public_id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-700">
      <div {...attributes} {...listeners} className="absolute top-2 left-2 z-10 bg-black/50 rounded-lg p-1 cursor-grab active:cursor-grabbing">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
        </svg>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.url} alt="galeri" className="w-full h-full object-cover cursor-pointer" onClick={() => onView(index)} />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3 gap-2">
        <button onClick={() => onView(index)} className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg">🔍 Gör</button>
        <button onClick={() => onDelete(img.public_id)} disabled={deleting === img.public_id} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg disabled:opacity-50">
          {deleting === img.public_id ? '...' : '🗑 Sil'}
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [stats, setStats] = useState<StatsData>({ today: { clicks: [], phone: 0, whatsapp: 0, visit: 0 }, weekly: [] })
  const [weeklyOpen, setWeeklyOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => {
    fetch('/api/auth').then(res => {
      if (res.ok) { setAuthenticated(true); fetchImages(); fetchStats() }
    })
  }, [])

  useEffect(() => {
    if (!authenticated) return
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [authenticated])

  async function fetchImages() {
    const res = await fetch('/api/images')
    const data = await res.json()
    setImages(data.images || [])
  }

  async function fetchStats() {
    const res = await fetch('/api/stats')
    if (res.ok) {
      const data = await res.json()
      setStats(data)
    }
  }

  async function saveOrder(items: GalleryImage[]) {
    await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: items.map(i => i.url) }),
    })
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = images.findIndex(i => i.public_id === active.id)
    const newIndex = images.findIndex(i => i.public_id === over.id)
    const newImages = arrayMove(images, oldIndex, newIndex)
    setImages(newImages)
    await saveOrder(newImages)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) { setError('Şifre yanlış'); return }
    setAuthenticated(true); setError(''); setPassword('')
    fetchImages(); fetchStats()
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    setAuthenticated(false); setImages([])
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    await fetch('/api/upload', { method: 'POST', body: form })
    await fetchImages()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(publicId: string) {
    setDeleting(publicId)
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    })
    await fetchImages()
    setDeleting(null)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-xl border border-slate-700">
          <div className="text-center mb-6">
            <span className="text-red-500 text-4xl">⚡</span>
            <h1 className="text-white font-black text-xl mt-2">Admin Paneli</h1>
            <p className="text-slate-400 text-sm mt-1">Bilge Elektronik</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">Giriş Yap</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white font-black text-2xl flex items-center gap-2"><span className="text-red-500">⚡</span> Admin Paneli</h1>
            <p className="text-slate-400 text-sm mt-1">Sürükleyerek sıralamayı değiştirebilirsin</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="border border-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-colors">← Siteye Dön</a>
            <button onClick={handleLogout} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-sm transition-colors">Çıkış</button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-base">📊 Tıklama İstatistikleri</h2>
            <button onClick={fetchStats} className="text-slate-400 hover:text-white text-xs border border-slate-600 hover:border-slate-500 px-2 py-1 rounded-lg transition-colors">↻ Yenile</button>
          </div>

          {/* Bugün */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-blue-400">{stats.today.visit}</div>
              <div className="text-slate-400 text-sm mt-1">👁 Bugün Ziyaret</div>
            </div>
            <div className="bg-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-red-400">{stats.today.phone}</div>
              <div className="text-slate-400 text-sm mt-1">📞 Telefon</div>
            </div>
            <div className="bg-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-green-400">{stats.today.whatsapp}</div>
              <div className="text-slate-400 text-sm mt-1">💬 WhatsApp</div>
            </div>
          </div>

          {/* Bugünkü detay */}
          {stats.today.clicks.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-2">Bugün henüz tıklama yok.</p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 mb-4">
              <p className="text-slate-500 text-xs mb-1">Bugünkü Detay</p>
              {[...stats.today.clicks].reverse().map((click, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-700/50 rounded-lg px-3 py-2 text-xs">
                  <span className="text-slate-500 shrink-0">
                    {new Date(click.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={click.type === 'whatsapp' ? 'text-green-400 shrink-0' : 'text-red-400 shrink-0'}>
                    {click.type === 'whatsapp' ? '💬 WhatsApp' : '📞 Telefon'}
                  </span>
                  {(click.city || click.country) && (
                    <span className="text-slate-400 truncate">📍 {[click.city, click.region, click.country].filter(Boolean).join(', ')}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Son 7 gün - açılır/kapanır */}
          <button
            onClick={() => setWeeklyOpen(!weeklyOpen)}
            className="w-full flex items-center justify-between text-slate-400 hover:text-white text-xs border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2 mt-2 transition-colors"
          >
            <span>Son 7 Gün</span>
            <span>{weeklyOpen ? '▲' : '▼'}</span>
          </button>
          {weeklyOpen && stats.weekly.length > 0 && (
            <div className="space-y-1 mt-2">
              {stats.weekly.map((day) => (
                <div key={day.date} className="flex items-center gap-3 bg-slate-700/40 rounded-lg px-3 py-2 text-xs">
                  <span className="text-slate-400 w-24 shrink-0">{new Date(day.date + 'T12:00:00').toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  <span className="text-blue-400">👁 {day.visit}</span>
                  <span className="text-red-400">📞 {day.phone}</span>
                  <span className="text-green-400">💬 {day.whatsapp}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-800 border-2 border-dashed border-slate-600 hover:border-red-500 rounded-2xl p-8 text-center mb-8 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          {uploading ? <div className="text-red-400 animate-pulse">Yükleniyor...</div> : (
            <><div className="text-4xl mb-2">📷</div><p className="text-white font-semibold">Fotoğraf Ekle</p><p className="text-slate-400 text-sm mt-1">Tıkla veya dosya seç</p></>
          )}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-slate-500">Henüz fotoğraf yok. Yukarıdan ekleyin.</div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map(i => i.public_id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <SortableImage
                    key={img.public_id}
                    img={img}
                    index={i}
                    deleting={deleting}
                    onView={(idx) => setLightboxIndex(idx)}
                    onDelete={(id) => setConfirmDelete(id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="text-center mt-12 text-gray-600 text-sm">Babama sevgilerle ❤️</div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 shadow-xl">
            <div className="text-3xl text-center mb-3">⚠️</div>
            <h3 className="text-white font-bold text-lg text-center mb-2">Emin misin?</h3>
            <p className="text-slate-400 text-sm text-center mb-6">Bu işlem geri alınamaz, fotoğraf kalıcı olarak silinecek.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-slate-600 text-slate-300 hover:text-white py-2 rounded-xl text-sm transition-colors">İptal Et</button>
              <button onClick={() => { handleDelete(confirmDelete); setConfirmDelete(null) }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-sm transition-colors">Sil</button>
            </div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </div>
  )
}
