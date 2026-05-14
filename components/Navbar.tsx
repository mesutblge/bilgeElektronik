'use client'

import { useState, useEffect } from 'react'

const links = [
  { href: '#anasayfa', label: 'Ana Sayfa' },
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#anasayfa" className="flex items-center gap-2">
          <span className="text-orange-500 text-2xl">⚡</span>
          <span className="text-white font-black text-xl tracking-tight">
            BİLGE<span className="text-orange-500"> ELEKTRONİK</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate-300 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:05427963140"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-sm transition-all"
          >
            📞 Bizi Arayın
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-slate-300 hover:text-orange-400 py-2 text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:05427963140"
            className="block bg-orange-500 text-white text-center font-bold py-2 px-4 rounded-lg mt-3 text-sm"
          >
            📞 0542 796 31 40
          </a>
        </div>
      )}
    </nav>
  )
}
