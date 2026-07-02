import { put } from '@vercel/blob'
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

async function saveClick(type: string, req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : null
  const geo = ip ? await getGeo(ip) : null

  const today = new Date().toISOString().split('T')[0]
  const filename = `_click_${today}_${Date.now()}.json`

  await put(filename, JSON.stringify({
    type,
    timestamp: new Date().toISOString(),
    city: geo?.city || null,
    region: geo?.region || null,
    country: geo?.country || null,
  }), { access: 'public' })
}

// GET: telefon linkleri için — image pixel yöntemi
export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type')
    if (type === 'phone' || type === 'whatsapp' || type === 'visit') {
      await saveClick(type, req)
    }
  } catch {}

  const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64')
  return new NextResponse(gif, {
    headers: { 'Content-Type': 'image/gif', 'Cache-Control': 'no-store' },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json()
    if (type !== 'phone' && type !== 'whatsapp' && type !== 'visit') {
      return NextResponse.json({ error: 'Geçersiz tip' }, { status: 400 })
    }
    await saveClick(type, req)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Hata' }, { status: 500 })
  }
}
