import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { blobs } = await list()
    const imageBlobs = blobs.filter(
      (b) => !b.pathname.includes('_order.json') && !b.pathname.includes('_click_')
    )
    const images = imageBlobs.map((b) => ({ public_id: b.url, url: b.url }))

    const orderBlob = blobs.find((b) => b.pathname.includes('_order.json'))
    if (orderBlob) {
      const res = await fetch(orderBlob.url)
      const order: string[] = await res.json()
      images.sort((a, b) => {
        const ai = order.indexOf(a.url)
        const bi = order.indexOf(b.url)
        if (ai === -1) return 1
        if (bi === -1) return -1
        return ai - bi
      })
    }

    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
