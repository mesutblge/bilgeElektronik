const services = [
  {
    icon: '📺',
    title: 'Televizyon Tamiri',
    desc: 'Nazilli\'de LCD, LED, OLED ve Plazma TV tamiri. Samsung, LG, Vestel, Arçelik her marka garantili servis.',
  },
  {
    icon: '📡',
    title: 'Uydu Montajı',
    desc: 'Nazilli uydu montajı ve çanak anten kurulumu. Alıcı ayarı, kanal arama ve arıza giderme.',
  },
  {
    icon: '🔧',
    title: 'Elektronik Tamir',
    desc: 'Anakart, güç kaynağı ve kart tamiri. Nazilli\'de her türlü elektronik cihaz servisi.',
  },
  {
    icon: '🖥️',
    title: 'Ekran Değişimi',
    desc: 'Kırık, çatlak veya görüntü sorunu olan TV panel ve ekran değişimi. Orijinal parça.',
  },
  {
    icon: '📶',
    title: 'Anten Kurulumu',
    desc: 'Nazilli anten montajı ve karasal yayın kurulumu. Sinyal güçlendirme ve hat çekimi.',
  },
  {
    icon: '🚗',
    title: 'Yerinde Servis',
    desc: 'Nazilli ve çevre ilçelere talep üzerine yerinde uydu, anten ve TV tamir hizmeti.',
  },
]

export default function Services() {
  return (
    <section id="hizmetler" className="py-24 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">
            Ne Yapıyoruz
          </span>
          <h2 className="text-4xl font-black text-white mt-2">Hizmetlerimiz</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Tüm marka ve modellerde profesyonel elektronik tamir ve kurulum hizmetleri
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-red-500/10 group-hover:bg-red-500/20 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
