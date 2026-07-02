import { list } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

function makeToken() {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || '').update('bilge-admin').digest('hex')
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token !== makeToken()) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]
  const filename = `_clicks_${today}.json`

  const { blobs } = await list()
  const clicksBlob = blobs.find((b) => b.pathname.includes(filename))

  if (!clicksBlob) {
    return NextResponse.json({ clicks: [], phone: 0, whatsapp: 0 })
  }

  const res = await fetch(clicksBlob.url, { cache: 'no-store' })
  const clicks: { type: string }[] = await res.json()

  return NextResponse.json({
    clicks,
    phone: clicks.filter((c) => c.type === 'phone').length,
    whatsapp: clicks.filter((c) => c.type === 'whatsapp').length,
  })
}
