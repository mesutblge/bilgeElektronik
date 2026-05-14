'use client'

import { useEffect, useState } from 'react'

function getStatus() {
  const now = new Date()
  const day = now.getDay() // 0=Pazar, 1=Pzt, 6=Cmt
  const hour = now.getHours()
  const minute = now.getMinutes()
  const time = hour * 60 + minute

  const open = 8 * 60 + 30   // 08:30
  const close = 19 * 60       // 19:00

  const isWeekday = day >= 1 && day <= 6
  const isInHours = time >= open && time < close

  if (isWeekday && isInHours) {
    return {
      open: true,
      label: 'Şu an Açık',
      sub: '08:30 – 19:00',
    }
  }

  // Bir sonraki açılış ne zaman?
  const nextOpen = day === 0 ? 'Yarın 08:30\'da açılır' : 'Yarın 08:30\'da açılır'
  return {
    open: false,
    label: 'Şu an Kapalı',
    sub: day === 0 ? 'Pazartesi 08:30\'da açılır' : nextOpen,
  }
}

interface Props {
  variant?: 'navbar' | 'card'
}

export default function OpenStatus({ variant = 'card' }: Props) {
  const [status, setStatus] = useState(getStatus)

  useEffect(() => {
    const interval = setInterval(() => setStatus(getStatus()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (variant === 'navbar') {
    return (
      <div className="hidden md:flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></span>
        <span className={`text-xs font-medium ${status.open ? 'text-green-400' : 'text-red-400'}`}>
          {status.open ? 'Açık' : 'Kapalı'}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-3 rounded-xl p-3 border ${
      status.open
        ? 'bg-green-500/10 border-green-500/30'
        : 'bg-red-500/10 border-red-500/30'
    }`}>
      <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${
        status.open ? 'bg-green-400 animate-pulse' : 'bg-red-500'
      }`}></span>
      <div>
        <p className={`font-bold text-sm ${status.open ? 'text-green-400' : 'text-red-400'}`}>
          {status.label}
        </p>
        <p className="text-gray-400 text-xs mt-0.5">{status.sub}</p>
      </div>
    </div>
  )
}
