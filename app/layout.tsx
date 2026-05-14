import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilge Elektronik | Nazilli Televizyon ve Uydu Tamircisi',
  description:
    "Nazilli'de televizyon, uydu kurulumu ve elektronik cihaz tamiri. Bilge Elektronik - Yunus Bilge. Yeni Mahalle 161. Sokak No:9/B Nazilli/Aydın. 0542 796 31 40",
  keywords:
    'nazilli televizyon tamircisi, nazilli uydu tamircisi, bilge elektronik, nazilli elektronik tamir, yunus bilge, nazilli tv tamiri, aydın uydu tamircisi',
  openGraph: {
    title: 'Bilge Elektronik | Nazilli Televizyon ve Uydu Tamircisi',
    description: "Nazilli'nin güvenilir televizyon ve uydu tamircisi.",
    locale: 'tr_TR',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'Bilge Elektronik',
  description: 'Nazilli televizyon, uydu ve elektronik cihaz tamiri',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yeni Mahalle 161. Sokak No:9/B',
    addressLocality: 'Nazilli',
    addressRegion: 'Aydın',
    addressCountry: 'TR',
  },
  telephone: '+905427963140',
  openingHours: 'Mo-Su 08:30-19:00',
  priceRange: '₺',
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
