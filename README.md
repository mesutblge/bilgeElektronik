# Bilge Elektronik

Nazilli'de televizyon, uydu ve elektronik cihaz tamiri yapan **Bilge Elektronik** işletmesinin web sitesi.

## Özellikler

- Hizmetler, galeri, hakkımızda ve iletişim bölümleri
- Admin paneli — fotoğraf ekle/sil (Cloudinary)
- WhatsApp butonu ve açık/kapalı göstergesi
- SEO optimizasyonu (Google My Business uyumlu)
- Mobil uyumlu, hızlı

## Teknolojiler

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/) — görsel depolama
- [Vercel](https://vercel.com/) — hosting

## Kurulum

```bash
npm install
```

`.env.local.example` dosyasını kopyalayıp `.env.local` oluştur:

```bash
cp .env.local.example .env.local
```

Gerekli değerleri doldur:

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_PASSWORD=...
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

## Admin Paneli

`/yunus` adresinden şifreyle giriş yapılır.

## Canlı Site

[bilge-elektronik.vercel.app](https://bilge-elektronik.vercel.app)
