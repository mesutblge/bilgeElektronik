const services = [
  {
    icon: '📺',
    title: 'Televizyon Tamiri',
    desc: 'LCD, LED, OLED ve Plazma TV tamiri. Her marka ve model.',
  },
  {
    icon: '📡',
    title: 'Uydu Kurulumu',
    desc: 'Çanak anten kurulumu, alıcı ayarı ve arıza giderme.',
  },
  {
    icon: '🔧',
    title: 'Elektronik Tamir',
    desc: 'Anakart, güç kaynağı, kart tamiri ve komponent değişimi.',
  },
  {
    icon: '🖥️',
    title: 'Ekran Değişimi',
    desc: 'Kırık, çatlak veya görüntü sorunu olan panel değişimi.',
  },
  {
    icon: '📶',
    title: 'Anten Kurulumu',
    desc: 'Karasal anten kurulumu, sinyal güçlendirme.',
  },
  {
    icon: '🚗',
    title: 'Yerinde Servis',
    desc: 'Nazilli ve çevresine talep üzerine yerinde servis hizmeti.',
  },
]

export default function Services() {
  return (
    <section id="hizmetler" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Ne Yapıyoruz
          </span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">Hizmetlerimiz</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Tüm marka ve modellerde profesyonel elektronik tamir ve kurulum hizmetleri
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 hover:border-orange-200 transition-all group"
            >
              <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
