'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface Props {
  images: { url: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
      >
        ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
      >
        ‹
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].url}
          alt="Fotoğraf"
          width={1200}
          height={900}
          className="object-contain max-h-[85vh] w-full rounded-xl"
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {index + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
      >
        ›
      </button>
    </div>
  )
}
