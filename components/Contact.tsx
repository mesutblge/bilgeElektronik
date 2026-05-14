export default function Contact() {
  return (
    <section id="iletisim" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">
            Bize Ulaşın
          </span>
          <h2 className="text-4xl font-black text-white mt-2">İletişim</h2>
          <p className="text-gray-400 mt-3">Hafta içi ve hafta sonu hizmetinizdeyiz</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Adres</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Yeni Mahalle 161. Sokak No:9/B
                  <br />
                  Nazilli / Aydın
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Telefon</h3>
                <a
                  href="tel:05427963140"
                  className="text-red-400 hover:text-red-300 font-semibold text-lg transition-colors"
                >
                  0542 796 31 40
                </a>
                <p className="text-gray-500 text-sm mt-1">Yunus Bilge</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Çalışma Saatleri</h3>
                <p className="text-gray-400 text-sm">
                  Pazartesi – Pazar
                  <br />
                  <span className="font-semibold text-white">08:30 – 19:00</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden border border-gray-700 flex-1" style={{ minHeight: '310px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Bilge+Elektronik+Nazilli+Aydın+Yeni+Mahalle+161+Sokak&output=embed&z=17"
                width="100%"
                height="100%"
                style={{ minHeight: '310px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bilge Elektronik Konum"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/maps?q=Bilge+Elektronik+Yeni+Mahalle+161+Sokak+No+9+B+Nazilli+Aydın"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all w-full"
            >
              📍 Haritada Gör
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
