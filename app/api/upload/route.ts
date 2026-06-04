import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 })

    const blob = await put(`bilge/${Date.now()}-${file.name}`, file, { access: 'public' })
    return NextResponse.json({ url: blob.url, public_id: blob.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
  }
}
