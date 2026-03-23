'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'left' | 'scale'
}

export default function AnimatedSection({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const cls = variant === 'left' ? 'reveal-left' : variant === 'scale' ? 'reveal-scale' : 'reveal'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  )
}
