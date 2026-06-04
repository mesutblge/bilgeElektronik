import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  try {
    const { publicId } = await req.json()
    console.log('Siliniyor publicId:', publicId)
    const result = await cloudinary.api.delete_resources([publicId], { resource_type: 'image', type: 'upload' })
    console.log('Cloudinary sonuç:', result)
    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('Cloudinary delete error:', err)
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
  }
}
