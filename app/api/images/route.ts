import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { blobs } = await list()
    const images = blobs.map((b) => ({ public_id: b.url, url: b.url }))
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
