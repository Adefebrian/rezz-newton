'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '44px',
        height: '44px',
        background: '#2A1608',
        border: '1px solid rgba(200,151,63,.35)',
        color: 'rgba(200,151,63,.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 40,
        transition: 'all .3s cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#3D2010'
        e.currentTarget.style.borderColor = 'rgba(200,151,63,.7)'
        e.currentTarget.style.color = '#C8973F'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#2A1608'
        e.currentTarget.style.borderColor = 'rgba(200,151,63,.35)'
        e.currentTarget.style.color = 'rgba(200,151,63,.8)'
      }}
    >
      <ArrowUp size={16} strokeWidth={1.5} />
    </button>
  )
}
