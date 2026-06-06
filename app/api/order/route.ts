import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

function makeToken() {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || '').update('bilge-admin').digest('hex')
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token !== makeToken()) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  const { order } = await req.json()
  await put('_order.json', JSON.stringify(order), {
    access: 'public',
    allowOverwrite: true,
  } as Parameters<typeof put>[2])
  return NextResponse.json({ success: true })
}
