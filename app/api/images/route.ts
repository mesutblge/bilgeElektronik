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
      max_results: 100,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = result.resources
      .filter((r: any) => r.asset_folder === 'bilge-elektronik')
      .map((r: { public_id: string; secure_url: string }) => ({
        public_id: r.public_id,
        url: r.secure_url,
      }))

    return NextResponse.json({ images })
  } catch (err) {
    console.error('Images hatası:', err)
    return NextResponse.json({ images: [] })
  }
}
