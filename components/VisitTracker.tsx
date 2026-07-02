'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem('bilge_visited')) return
    sessionStorage.setItem('bilge_visited', '1')
    new Image().src = `/api/track?type=visit&t=${Date.now()}`
  }, [])
  return null
}
