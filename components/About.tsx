export default function About() {
  return (
    <section id="hakkimizda" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Biz Kimiz
            </span>
            <h2 className="text-4xl font-black text-white mt-2 mb-6">Hakkımızda</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong className="text-white">Bilge Elektronik</strong>, Yunus Bilge tarafından
              kurulan ve Nazilli&apos;de 20 yılı aşkın süredir hizmet veren bir elektronik tamir
              atölyesidir.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Televizyon, uydu sistemi ve her türlü elektronik cihazın tamirinde uzmanlaşmış
              ekibimiz, en güncel teknolojilere uyum sağlayarak güvenilir ve kalıcı çözümler
              sunmaktadır. Müşteri memnuniyeti her zaman önceliğimizdir.
            </p>
            <a
              href="tel:05427963140"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              📞 Hemen Ara
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏆', value: '20+', label: 'Yıl Deneyim' },
              { icon: '😊', value: '1000+', label: 'Memnun Müşteri' },
              { icon: '🔩', value: 'Her Marka', label: 'TV & Uydu' },
              { icon: '✅', value: 'Garantili', label: 'Tamir Hizmeti' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-2xl font-black text-orange-500 mb-1">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
