import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'bilge/' })
    const images = blobs.map((b) => ({ public_id: b.url, url: b.url }))
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
