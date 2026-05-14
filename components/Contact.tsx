export default function Contact() {
  return (
    <section id="iletisim" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Bize Ulaşın
          </span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">İletişim</h2>
          <p className="text-slate-500 mt-3">Hafta içi ve hafta sonu hizmetinizdeyiz</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Adres</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Yeni Mahalle 161. Sokak No:9/B
                  <br />
                  Nazilli / Aydın
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Telefon</h3>
                <a
                  href="tel:05427963140"
                  className="text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors"
                >
                  0542 796 31 40
                </a>
                <p className="text-slate-400 text-sm mt-1">Yunus Bilge</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Çalışma Saatleri</h3>
                <p className="text-slate-500 text-sm">
                  Pazartesi – Pazar
                  <br />
                  <span className="font-semibold text-slate-700">08:30 – 19:00</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 min-h-[350px]">
            <iframe
              src="https://maps.google.com/maps?q=Yeni+Mahalle+161+Sokak+Nazilli+Aydın&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: '350px', border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bilge Elektronik Konum"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
