import { del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function makeToken() {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || '').update('bilge-admin').digest('hex')
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token !== makeToken()) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  try {
    const { publicId } = await req.json()
    await del(publicId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
  }
}
