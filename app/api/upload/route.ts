import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const dataUri = `data:${file.type};base64,${Buffer.from(bytes).toString('base64')}`
    const result = await cloudinary.uploader.upload(dataUri)

    return NextResponse.json({ url: result.secure_url, public_id: result.public_id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
  }
}
