import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({ images: [] })
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'bilge_',
      max_results: 50,
    })

    const images = result.resources.map((r: { public_id: string; secure_url: string }) => ({
      public_id: r.public_id,
      url: r.secure_url,
    }))

    return NextResponse.json({ images })
  } catch (err) {
    console.error('Cloudinary images error:', err)
    return NextResponse.json({ images: [] })
  }
}
