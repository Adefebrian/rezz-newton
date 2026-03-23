'use client'

import { useState } from 'react'
import AuthModal from '@/components/order/AuthModal'
import MenuGrid from '@/components/order/MenuGrid'

export default function OrderClient() {
  const [authed, setAuthed] = useState(false)

  return (
    <div className="relative">
      {!authed && (
        <AuthModal onSuccess={() => setAuthed(true)} />
      )}
      <div
        className={`transition-all duration-300 ${
          authed ? '' : 'pointer-events-none select-none filter blur-sm opacity-40'
        }`}
        aria-hidden={authed ? undefined : 'true'}
      >
        <MenuGrid />
      </div>
    </div>
  )
}
