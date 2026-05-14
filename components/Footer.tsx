export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-500 text-xl">⚡</span>
              <span className="text-white font-black">
                BİLGE<span className="text-orange-500"> ELEKTRONİK</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nazilli&apos;de televizyon, uydu ve elektronik cihaz tamirinde güvenilir adresiniz.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Hızlı Linkler</h4>
            <div className="space-y-2">
              {[
                ['#hizmetler', 'Hizmetler'],
                ['#galeri', 'Galeri'],
                ['#hakkimizda', 'Hakkımızda'],
                ['#iletisim', 'İletişim'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block text-slate-400 hover:text-orange-400 text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">İletişim</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Yeni Mahalle 161. Sokak No:9/B</p>
              <p>Nazilli / Aydın</p>
              <a href="tel:05427963140" className="block text-orange-400 hover:text-orange-300">
                0542 796 31 40
              </a>
              <p>08:30 – 19:00 (Her Gün)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Bilge Elektronik – Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
