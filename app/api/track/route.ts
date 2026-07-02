import { list, put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function getGeo(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'bilgeelektronik.com.tr' },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data.error) return null
    return {
      city: data.city || null,
      region: data.region || null,
      country: data.country_name || null,
    }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json()
    if (type !== 'phone' && type !== 'whatsapp') {
      return NextResponse.json({ error: 'Geçersiz tip' }, { status: 400 })
    }

    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : null

    const geo = ip ? await getGeo(ip) : null

    const today = new Date().toISOString().split('T')[0]
    const filename = `_clicks_${today}.json`

    const { blobs } = await list()
    const clicksBlob = blobs.find((b) => b.pathname.includes(filename))
    let clicks: object[] = []

    if (clicksBlob) {
      const existing = await fetch(clicksBlob.url, { cache: 'no-store' })
      clicks = await existing.json()
    }

    clicks.push({
      type,
      timestamp: new Date().toISOString(),
      city: geo?.city || null,
      region: geo?.region || null,
      country: geo?.country || null,
    })

    await put(filename, JSON.stringify(clicks), {
      access: 'public',
      allowOverwrite: true,
    } as Parameters<typeof put>[2])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Hata' }, { status: 500 })
  }
}
