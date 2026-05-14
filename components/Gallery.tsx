'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface GalleryImage {
  public_id: string
  url: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/images')
      .then((r) => r.json())
      .then((data) => {
        setImages(data.images || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="galeri" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">
            Çalışmalarımız
          </span>
          <h2 className="text-4xl font-black text-white mt-2">Galeri</h2>
          <p className="text-gray-400 mt-3">Tamamladığımız işlerden örnekler</p>
        </div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📷</div>
            <p>Henüz fotoğraf eklenmedi.</p>
          </div>
        )}

        {!loading && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.public_id}
                className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-500/50 transition-all"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={img.url}
                  alt="Bilge Elektronik çalışma"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-3xl">🔍</span>
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
    </section>
  )
}
