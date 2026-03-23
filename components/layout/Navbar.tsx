'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Instagram, Facebook, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Venues',          href: '/#venues' },
  { label: 'Book a Stay',     href: '/booking' },
  { label: 'Order & Pick Up', href: '/order' },
  { label: 'Functions',       href: '/functions' },
  { label: 'Careers',         href: '/careers' },
  { label: 'Contact',         href: '/contact' },
]

function isActive(href: string, pathname: string) {
  if (href.includes('#')) return false
  return pathname === href
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        /* Navbar is always clearly darker than hero — never blends */
        background: scrolled
          ? 'rgba(10, 5, 1, 0.97)'
          : 'rgba(10, 5, 1, 0.88)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        boxShadow: scrolled
          ? '0 1px 0 rgba(200,151,63,0.2), 0 8px 40px rgba(10,5,1,0.5)'
          : '0 1px 0 rgba(200,151,63,0.12)',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Gold accent line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(200,151,63,0.65) 20%, rgba(200,151,63,0.65) 80%, transparent)',
      }} />

      {/* Utility bar */}
      <div style={{ borderBottom: '1px solid rgba(200,151,63,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-8">
          <a href="tel:0883372888"
            className="flex items-center gap-1.5 font-jost"
            style={{ color: 'rgba(200,151,63,0.8)', letterSpacing: '0.1em', fontSize: '0.6rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C8973F')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,151,63,0.8)')}
          >
            <Phone size={10} /> 08 8337 2888
          </a>
          <div className="flex items-center gap-4">
            {[
              { href: 'https://www.instagram.com/rezznewton/', Icon: Instagram, label: 'Instagram' },
              { href: 'https://web.facebook.com/REZZNEWTONSA/', Icon: Facebook, label: 'Facebook' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: 'rgba(245,235,215,0.4)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(200,151,63,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,235,215,0.4)')}>
                <Icon size={12} />
              </a>
            ))}
            <span style={{ width: '1px', height: '12px', background: 'rgba(200,151,63,0.15)' }} />
            <span className="font-jost" style={{ color: 'rgba(245,235,215,0.28)', letterSpacing: '0.14em', fontSize: '0.54rem', fontWeight: 500, textTransform: 'uppercase' }}>
              Newton, South Australia
            </span>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0" aria-label="Rezz Hotel — home">
          <Image src="/logo.png" alt="Rezz Hotel" width={100} height={40}
            className="object-contain brightness-0 invert"
            style={{ height: '34px', width: 'auto', opacity: 0.9 }} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href, pathname)
            return (
              <Link key={href} href={href}
                aria-current={active ? 'page' : undefined}
                className="nav-link font-jost"
                style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  color: active ? '#C8973F' : 'rgba(245,235,215,0.62)',
                  transition: 'color 0.2s' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(245,235,215,0.95)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(245,235,215,0.62)' }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/order" className="font-jost"
            style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(245,235,215,0.45)',
              textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,235,215,0.88)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,235,215,0.45)')}>
            Order Food
          </Link>
          <span style={{ width: '1px', height: '14px', background: 'rgba(200,151,63,0.25)' }} />
          <Link href="/booking"
            style={{ fontFamily: 'var(--font-jost)', fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: '#C8973F', color: '#0D0500',
              padding: '0.55rem 1.4rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
              transition: 'background 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#DBA94A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C8973F')}>
            Book Now
          </Link>
        </div>

        <button type="button" onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden relative z-50 flex items-center justify-center"
          style={{ color: 'rgba(245,235,215,0.7)', minWidth: '44px', minHeight: '44px', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls="mobile-nav">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-nav" role="dialog" aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              width: '100vw', height: '100vh',
              background: '#0A0501',
              zIndex: 45, display: 'flex', flexDirection: 'column',
              paddingTop: '7rem', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '3rem', overflowY: 'auto' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(200,151,63,0.6) 30%, rgba(200,151,63,0.6) 70%, transparent)' }} />
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {[{ label: 'Home', href: '/' }, ...navLinks].map(({ label, href }, i) => (
                <motion.div key={href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.24 }}>
                  <Link href={href} onClick={() => setMenuOpen(false)}
                    aria-current={isActive(href, pathname) ? 'page' : undefined}
                    className="block font-cormorant font-light py-4"
                    style={{ fontSize: '2rem', color: isActive(href, pathname) ? '#C8973F' : 'rgba(245,235,215,0.75)',
                      borderBottom: '1px solid rgba(200,151,63,0.1)', textDecoration: 'none', transition: 'color 0.2s' }}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-3">
              <Link href="/booking" onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-jost)', fontSize: '0.68rem', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: '#C8973F', color: '#0D0500', padding: '1rem',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Book Now
              </Link>
              <Link href="/order" onClick={() => setMenuOpen(false)}
                className="btn-outline-white w-full justify-center" style={{ padding: '1rem', fontSize: '0.68rem' }}>
                Order Food
              </Link>
            </div>
            <div className="flex gap-5 mt-8">
              <a href="https://www.instagram.com/rezznewton/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(245,235,215,0.38)' }}><Instagram size={20} /></a>
              <a href="https://web.facebook.com/REZZNEWTONSA/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(245,235,215,0.38)' }}><Facebook size={20} /></a>
            </div>
            <p className="mt-auto pt-8 font-jost" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,235,215,0.18)' }}>
              20 Hamilton Terrace, Newton SA 5074
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
