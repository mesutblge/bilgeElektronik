import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function makeToken() {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || '')
    .update('bilge-admin')
    .digest('hex')
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Şifre yanlış' }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', makeToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 gün
    path: '/',
  })
  return res
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token !== makeToken()) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }
  return NextResponse.json({ success: true })
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_token')
  return res
}
