import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #3D1E06 0%, #2A1608 40%, #1A0C03 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '50%', background: 'radial-gradient(ellipse at 50% 100%, rgba(200,151,63,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Image src="/logo.png" alt="Rezz Hotel" width={120} height={48}
        className="brightness-0 invert"
        style={{ height: '40px', width: 'auto', opacity: .7, marginBottom: '3rem' }} />

      <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.52rem', fontWeight: 700, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(200,151,63,.7)', marginBottom: '1.5rem' }}>
        Page Not Found
      </p>

      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(5rem,15vw,10rem)', fontWeight: 300, color: '#F5EEE3', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 1rem' }}>
        404
      </h1>

      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(200,151,63,.85)', marginBottom: '1.5rem' }}>
        This page seems to have wandered off
      </p>

      <p style={{ fontFamily: 'var(--font-lora)', fontSize: '.9rem', color: 'rgba(245,238,227,.45)', lineHeight: 1.9, maxWidth: '400px', marginBottom: '3rem', letterSpacing: '.015em' }}>
        The page you're looking for doesn't exist or may have moved. Let us take you back to something better.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '.63rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', background: '#C8973F', color: '#0A0400', padding: '.9rem 2.25rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'background .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#DBA94A'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#C8973F'}>
          Back to Home
        </Link>
        <Link href="/contact"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,238,227,.6)', border: '1px solid rgba(245,238,227,.2)', padding: '.9rem 2.25rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'all .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,238,227,.45)'; (e.currentTarget as HTMLElement).style.color = '#F5EEE3' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,238,227,.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,238,227,.6)' }}>
          Contact Us
        </Link>
      </div>
    </div>
  )
}
