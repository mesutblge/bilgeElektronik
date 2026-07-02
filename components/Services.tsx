const services = [
  {
    icon: '📺',
    title: 'Nazilli TV Tamiri',
    desc: 'Nazilli\'de LCD, LED, OLED televizyon tamiri. Samsung, LG, Vestel, Arçelik, Sunny, TCL her marka TV tamircisi. Ekran değişimi, anakart tamiri, ses ve görüntü arızaları.',
  },
  {
    icon: '📡',
    title: 'Nazilli Uydu Montajı',
    desc: 'Nazilli uydu montajı ve çanak anten kurulumu. Digitürk, D-Smart, Tivibu uydu alıcı kurulumu, kanal arama ve sinyal ayarı. Aynı gün servis.',
  },
  {
    icon: '📶',
    title: 'Nazilli Anten Montajı',
    desc: 'Nazilli anten montajı ve çatı anteni kurulumu. Karasal yayın, sinyal güçlendirme, hat çekimi ve eski anten değişimi. Hızlı ve garantili kurulum.',
  },
  {
    icon: '🏢',
    title: 'Merkezi Sistem Kurulumu',
    desc: 'Nazilli\'de apartman, site ve iş yerleri için merkezi uydu sistemi ve merkezi anten sistemi kurulumu. Çoklu oda dağıtımı ve altyapı hattı.',
  },
  {
    icon: '🔧',
    title: 'Elektronik Cihaz Tamiri',
    desc: 'Nazilli elektronik tamir servisi. Anakart, güç kaynağı, kart tamiri. TV dışında her türlü elektronik cihaz arızası.',
  },
  {
    icon: '🚗',
    title: 'Yerinde Servis',
    desc: 'Nazilli, Kuyucak, Sultanhisar ve çevre köylere yerinde uydu, anten ve TV tamir hizmeti. Evinizden çıkmadan profesyonel servis.',
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
            Nazilli\'de TV tamiri, uydu montajı ve anten kurulumu. 30 yılı aşkın tecrübeyle tüm marka ve modellerde garantili servis.
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
