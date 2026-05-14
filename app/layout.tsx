import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilge Elektronik | Nazilli Uydu Montajı, TV Tamiri, Anten Kurulumu',
  description:
    "Nazilli uydu montajı, anten kurulumu, televizyon tamiri. Bilge Elektronik - Yunus Bilge. 20 yıllık deneyim. Nazilli ve çevresine yerinde servis. 0542 796 31 40",
  keywords:
    'nazilli uydu montajı, nazilli anten montajı, nazilli televizyon tamiri, nazilli uydu tamircisi, nazilli tv tamiri, bilge elektronik, nazilli elektronik tamir, yunus bilge, aydın uydu montajı, nazilli çanak anten, nazilli uydu kurulumu, nazilli anten kurulumu, nazilli lcd tamir, nazilli oled tamir',
  openGraph: {
    title: 'Bilge Elektronik | Nazilli Uydu Montajı ve TV Tamiri',
    description: "Nazilli uydu montajı, anten kurulumu ve televizyon tamirinde 20 yıllık deneyim.",
    locale: 'tr_TR',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'Bilge Elektronik',
  description:
    'Nazilli uydu montajı, anten kurulumu, televizyon tamiri ve elektronik cihaz servisi. 20 yılı aşkın tecrübe.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yeni Mahalle 161. Sokak No:9/B',
    addressLocality: 'Nazilli',
    addressRegion: 'Aydın',
    postalCode: '09800',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    addressCountry: 'TR',
  },
  telephone: '+905427963140',
  openingHours: 'Mo-Su 08:30-19:00',
  priceRange: '₺',
  areaServed: ['Nazilli', 'Aydın'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hizmetler',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Uydu Montajı' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Anten Kurulumu' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Televizyon Tamiri' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ekran Değişimi' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elektronik Tamir' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
