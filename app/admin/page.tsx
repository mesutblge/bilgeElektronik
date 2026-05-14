'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

interface GalleryImage {
  public_id: string
  url: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw')
    if (saved) {
      setPassword(saved)
      setAuthenticated(true)
      loadImages(saved)
    }
  }, [])

  async function loadImages(pw: string) {
    const res = await fetch('/api/images', {
      headers: { 'x-admin-password': pw },
    })
    const data = await res.json()
    setImages(data.images || [])
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/images', {
      headers: { 'x-admin-password': password },
    })
    if (res.status === 401) {
      setError('Şifre yanlış')
      return
    }
    const data = await res.json()
    sessionStorage.setItem('admin_pw', password)
    setAuthenticated(true)
    setImages(data.images || [])
    setError('')
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'x-admin-password': password },
      body: form,
    })
    await loadImages(password)
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(publicId: string) {
    setDeleting(publicId)
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    })
    await loadImages(password)
    setDeleting(null)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-xl border border-slate-700">
          <div className="text-center mb-6">
            <span className="text-orange-500 text-4xl">⚡</span>
            <h1 className="text-white font-black text-xl mt-2">Admin Paneli</h1>
            <p className="text-slate-400 text-sm mt-1">Bilge Elektronik</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Giriş Yap
            </button>
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
            <h1 className="text-white font-black text-2xl flex items-center gap-2">
              <span className="text-orange-500">⚡</span> Admin Paneli
            </h1>
            <p className="text-slate-400 text-sm mt-1">Galeri fotoğraflarını yönet</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="border border-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-colors"
            >
              ← Siteye Dön
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_pw')
                setAuthenticated(false)
                setPassword('')
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>

        <div
          className="bg-slate-800 border-2 border-dashed border-slate-600 hover:border-orange-500 rounded-2xl p-8 text-center mb-8 transition-colors cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          {uploading ? (
            <div className="text-orange-400 animate-pulse">Yükleniyor...</div>
          ) : (
            <>
              <div className="text-4xl mb-2">📷</div>
              <p className="text-white font-semibold">Fotoğraf Ekle</p>
              <p className="text-slate-400 text-sm mt-1">Tıkla veya dosya seç</p>
            </>
          )}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            Henüz fotoğraf yok. Yukarıdan ekleyin.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.public_id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-700"
              >
                <Image
                  src={img.url}
                  alt="galeri"
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    🔍 Gör
                  </button>
                  <button
                    onClick={() => handleDelete(img.public_id)}
                    disabled={deleting === img.public_id}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleting === img.public_id ? '...' : '🗑 Sil'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
