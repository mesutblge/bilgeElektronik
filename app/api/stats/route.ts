import { list } from '@vercel/blob'
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

    const today = new Date().toISOString().split('T')[0]
    const { blobs } = await list()
    const clickBlobs = blobs.filter((b) => b.pathname.includes(`_click_${today}_`))

    const clicks = await Promise.all(
      clickBlobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url)
          return await res.json()
        } catch {
          return null
        }
      })
    )

    const valid = clicks
      .filter(Boolean)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    return NextResponse.json({
      clicks: valid,
      phone: valid.filter((c) => c.type === 'phone').length,
      whatsapp: valid.filter((c) => c.type === 'whatsapp').length,
    })
  } catch {
    return NextResponse.json({ clicks: [], phone: 0, whatsapp: 0 })
  }
}
