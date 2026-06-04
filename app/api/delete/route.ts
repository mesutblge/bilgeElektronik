import { del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
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
