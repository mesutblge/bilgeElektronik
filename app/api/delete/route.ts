import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  try {
    const { publicId } = await req.json()
    await cloudinary.uploader.destroy(publicId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
  }
}
