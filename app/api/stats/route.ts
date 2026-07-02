import { list, del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

function makeToken() {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || '').update('bilge-admin').digest('hex')
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value
    if (token !== makeToken()) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { blobs } = await list()
    const clickBlobs = blobs.filter((b) => b.pathname.match(/_click_\d{4}-\d{2}-\d{2}_/))

    // 30 günden eski dosyaları sil
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const cutoff = thirtyDaysAgo.toISOString().split('T')[0]

    const oldBlobs = clickBlobs.filter((b) => {
      const m = b.pathname.match(/_click_(\d{4}-\d{2}-\d{2})_/)
      return m && m[1] < cutoff
    })
    if (oldBlobs.length > 0) {
      await del(oldBlobs.map((b) => b.url))
    }

    // Son 7 günün tarihlerini hesapla
    const dates: string[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().split('T')[0])
    }

    const today = dates[0]

    // Bugünkü tıklamaları detaylı getir
    const todayBlobs = clickBlobs.filter((b) => b.pathname.includes(`_click_${today}_`))
    const todayClicks = (
      await Promise.all(
        todayBlobs.map(async (b) => {
          try {
            const res = await fetch(b.url)
            return await res.json()
          } catch {
            return null
          }
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    // Son 7 gün için günlük özet
    const weekly = dates.map((date) => {
      const dayBlobs = clickBlobs.filter((b) => b.pathname.includes(`_click_${date}_`))
      return {
        date,
        phone: dayBlobs.filter((b) => b.pathname.includes('_click_')).length, // sayım blok bazında
        total: dayBlobs.length,
      }
    })

    // Haftalık özet için her günün click tiplerini saymak lazım — blob isminde tip yok, içeriğe bakılmalı
    // Sadece bugün için detay, diğer günler için toplam sayı yeterli
    const weeklyWithTypes = await Promise.all(
      weekly.map(async (day) => {
        if (day.date === today) {
          return {
            date: day.date,
            phone: todayClicks.filter((c) => c.type === 'phone').length,
            whatsapp: todayClicks.filter((c) => c.type === 'whatsapp').length,
            visit: todayClicks.filter((c) => c.type === 'visit').length,
          }
        }
        // Diğer günler için dosyaları oku
        const dayBlobs = clickBlobs.filter((b) => b.pathname.includes(`_click_${day.date}_`))
        const clicks = (
          await Promise.all(
            dayBlobs.map(async (b) => {
              try {
                const res = await fetch(b.url)
                return await res.json()
              } catch {
                return null
              }
            })
          )
        ).filter(Boolean)
        return {
          date: day.date,
          phone: clicks.filter((c: { type: string }) => c.type === 'phone').length,
          whatsapp: clicks.filter((c: { type: string }) => c.type === 'whatsapp').length,
          visit: clicks.filter((c: { type: string }) => c.type === 'visit').length,
        }
      })
    )

    return NextResponse.json({
      today: {
        clicks: todayClicks.filter((c) => c.type !== 'visit'),
        phone: todayClicks.filter((c) => c.type === 'phone').length,
        whatsapp: todayClicks.filter((c) => c.type === 'whatsapp').length,
        visit: todayClicks.filter((c) => c.type === 'visit').length,
      },
      weekly: weeklyWithTypes,
    })
  } catch {
    return NextResponse.json({
      today: { clicks: [], phone: 0, whatsapp: 0 },
      weekly: [],
    })
  }
}
