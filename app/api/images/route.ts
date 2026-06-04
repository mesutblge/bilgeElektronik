import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const DEMO_IDS = ['sample', 'cld-sample', 'cld-sample-2', 'cld-sample-3', 'cld-sample-4', 'cld-sample-5']

export async function GET() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({ images: [] })
  }
  try {
    const result = await cloudinary.api.resources({ type: 'upload', max_results: 100 })
    const images = result.resources
      .filter((r: { public_id: string }) => !DEMO_IDS.includes(r.public_id))
      .map((r: { public_id: string; secure_url: string }) => ({
        public_id: r.public_id,
        url: r.secure_url,
      }))
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
