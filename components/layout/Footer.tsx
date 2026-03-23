'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #120700 0%, #0A0400 100%)', color: '#F5EEE3', position: 'relative', overflow: 'hidden' }}>

      {/* Top gold divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,151,63,.5) 20%, rgba(200,151,63,.5) 80%, transparent)' }} />

      {/* Subtle glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '300px', background: 'radial-gradient(ellipse at 50% 0%, rgba(200,151,63,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Main grid */}
      <div className="footer-grid" style={{ maxWidth: '88rem', margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,7vw,7rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(2rem,5vw,4rem)', position: 'relative', zIndex: 1 }}>

        {/* Col 1 — Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Image src="/logo.png" alt="Rezz Hotel" width={110} height={44}
            className="brightness-0 invert"
            style={{ height: '36px', width: 'auto', objectFit: 'contain', opacity: 0.88 }} />
          <p style={{ fontFamily: 'var(--font-lora)', fontSize: '.85rem', color: 'rgba(245,238,227,.5)', lineHeight: 1.9, letterSpacing: '.01em' }}>
            Your home for dining, entertainment and events in Newton, South Australia. Est. 1858.
          </p>
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '.25rem' }}>
            {[
              { href: 'https://www.instagram.com/rezznewton/', Icon: Instagram, label: 'Instagram' },
              { href: 'https://web.facebook.com/REZZNEWTONSA/', Icon: Facebook, label: 'Facebook' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: '36px', height: '36px', border: '1px solid rgba(200,151,63,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(200,151,63,.6)', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,151,63,.6)'; e.currentTarget.style.color = '#C8973F' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,151,63,.2)'; e.currentTarget.style.color = 'rgba(200,151,63,.6)' }}>
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Hours */}
        <div>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(200,151,63,.8)', marginBottom: '1.5rem' }}>
            Opening Hours
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { venue: 'Z-Bar & Restaurant', hours: ['Lunch: Mon–Sun 11:30am – 2:30pm', 'Dinner: Mon–Thu 5:30 – 8:30pm', 'Fri–Sat till 9pm · Sun till 8:30pm'] },
              { venue: 'Cafe + Play', hours: ['Mon–Thu: Lunch & Dinner sessions', 'Fri–Sun: All day from 11:30am'] },
              { venue: 'Sports Bar', hours: ['Mon–Thu: 8am – 2am', 'Fri: 8am – 3am · Sat: 9am – 3am', 'Sun: 9am – 12am'] },
            ].map(({ venue, hours }) => (
              <div key={venue}>
                <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.52rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(245,238,227,.65)', marginBottom: '.4rem' }}>{venue}</p>
                {hours.map(h => <p key={h} style={{ fontFamily: 'var(--font-lora)', fontSize: '.78rem', color: 'rgba(245,238,227,.4)', lineHeight: 1.75 }}>{h}</p>)}
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Links */}
        <div>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(200,151,63,.8)', marginBottom: '1.5rem' }}>
            Explore
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { label: 'Book a Table',       href: '/booking' },
              { label: 'Order & Pick Up',    href: '/order' },
              { label: 'Functions & Events', href: '/functions' },
              { label: 'Our Venues',         href: '/#venues' },
              { label: 'Work With Us',       href: '/careers' },
              { label: 'Contact Us',         href: '/contact' },
              { label: 'Rezz e-Vouchers',    href: 'https://rezz.com.au/vouchers', external: true },
            ].map(({ label, href, external }: any) => (
              <li key={label}>
                <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                  style={{ fontFamily: 'var(--font-lora)', fontSize: '.82rem', color: 'rgba(245,238,227,.45)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.25rem', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C8973F'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,238,227,.45)'}>
                  {label}
                  {external && <ArrowUpRight size={10} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(200,151,63,.8)', marginBottom: '1.5rem' }}>
            Find Us
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.875rem', marginBottom: '1.5rem' }}>
            {[
              { Icon: MapPin, text: '20 Hamilton Terrace, Newton SA 5074', href: 'https://maps.google.com/?q=20+Hamilton+Terrace+Newton+SA' },
              { Icon: Phone, text: '08 8337 2888', href: 'tel:0883372888' },
              { Icon: Mail, text: 'admin@rezz.com.au', href: 'mailto:admin@rezz.com.au' },
              { Icon: Mail, text: 'enquiries@rezz.com.au', href: 'mailto:enquiries@rezz.com.au' },
            ].map(({ Icon, text, href }) => (
              <li key={text} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                <Icon size={13} style={{ color: 'rgba(200,151,63,.6)', flexShrink: 0, marginTop: '3px' }} />
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-lora)', fontSize: '.78rem', color: 'rgba(245,238,227,.45)', textDecoration: 'none', lineHeight: 1.6, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C8973F'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,238,227,.45)'}>
                  {text}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ overflow: 'hidden', border: '1px solid rgba(200,151,63,.12)' }}>
            <iframe title="Rezz Hotel Newton" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.8!2d138.6882!3d-34.8758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0b4f8ceaaaaab%3A0x500ea6ea75974e8!2s20+Hamilton+Terrace%2C+Newton+SA+5074!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
              width="100%" height="130" style={{ border: 0, display: 'block', filter: 'grayscale(30%) sepia(20%)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(200,151,63,.1)', position: 'relative', zIndex: 1 }}>
        <div className="footer-bottom" style={{ maxWidth: '88rem', margin: '0 auto', padding: '1.25rem clamp(1.5rem,7vw,7rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', color: 'rgba(245,238,227,.2)', letterSpacing: '.1em' }}>
            &copy; {YEAR} Rezz Hotel Newton. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', color: 'rgba(245,238,227,.2)', textDecoration: 'none', letterSpacing: '.1em', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,238,227,.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,238,227,.2)'}>
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(245,238,227,.1)' }}>|</span>
            <span style={{ fontFamily: 'var(--font-jost)', fontSize: '.5rem', color: 'rgba(220,80,80,.45)', letterSpacing: '.08em' }}>
              Gamble Responsibly. Helpline 1800 858 858
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){ .footer-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:640px){ .footer-grid{ grid-template-columns: 1fr !important; } .footer-bottom{ flex-direction:column; align-items:flex-start !important; } }
      `}</style>
    </footer>
  )
}
