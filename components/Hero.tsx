export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="min-h-screen bg-gray-900 flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          Nazilli&apos;nin Güvenilir Elektronik Servisi
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight leading-none">
          BİLGE
          <br />
          <span className="text-red-500">ELEKTRONİK</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
          Televizyon · Uydu · Elektronik Tamir
        </p>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Nazilli&apos;de 20 yılı aşkın tecrübemizle her marka ve model televizyon, uydu sistemi
          ve elektronik cihaz tamiri yapıyoruz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:05427963140"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-red-600/25 flex items-center gap-2"
          >
            📞 0542 796 31 40
          </a>
          <a
            href="#galeri"
            className="border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all"
          >
            Galeriyi Gör
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '20+', label: 'Yıl Deneyim' },
            { value: '1000+', label: 'Memnun Müşteri' },
            { value: 'Her Marka', label: 'TV & Uydu' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-red-500 mb-1">{s.value}</div>
              <div className="text-gray-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
