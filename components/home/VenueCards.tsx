'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, ArrowRight, MapPin, Phone } from 'lucide-react'

const FOOD  = 'https://cdn.rezz.com.au/wp-content/uploads/2026/03/Rezz-Food-Menu-Feb-2026.pdf'
const BFAST = 'https://cdn.rezz.com.au/wp-content/uploads/2025/10/Rezz-Breakfast-Menu-2025-Oct-2025.pdf'

const venues = [
  { id: 'cafe', num: '01', tag: 'Family Friendly', name: 'Cafe + Play', sub: 'Providore · Pizza · Churro', desc: "A family favourite with three children's play areas, terraces and lawns. Open 7 days from 8:00am — breakfast, lunch and dinner.", hours: [{ label: 'Daily', time: 'From 8:00am' }], links: [{ label: 'Food Menu', href: FOOD }, { label: 'Breakfast Menu', href: BFAST }], cta: null, note: null, meta: null, span: 2 },
  { id: 'zbar', num: '02', tag: 'Modern Mediterranean', name: 'Z-Bar & Restaurant', sub: null, desc: 'City vibes in the suburbs. A modern Mediterranean menu matched with a curated wine and beverage list. Z-Bar open 11:30am till late, 7 days.', hours: [{ label: '7 Days', time: '11:30am till late' }], links: [{ label: 'Food Menu', href: FOOD }], cta: null, note: null, meta: null, span: 1 },
  { id: 'sports', num: '03', tag: '16 Beers · 4 Wines On Tap', name: 'Sports Bar & Beer Garden', sub: 'TAB · Lotteries', desc: 'Sixteen local and imported beers on tap, four wines on tap, ciders and large screen TVs for every match.', hours: [{ label: 'Mon – Thu', time: '8:00am – 2:00am' }, { label: 'Fri – Sat', time: 'till 3:00am' }], links: [], cta: { label: 'Order & Pick Up', href: '/order' }, note: null, meta: null, span: 1 },
  { id: 'liquor', num: '04', tag: 'Wine · Spirits · Beer', name: 'Liquor Store', sub: null, desc: 'Stocking an extensive range of wine, spirits and local and imported beer. Our friendly staff are happy to help with your selections and pairings.', hours: [{ label: 'Mon – Sat', time: '9:00am – 9:00pm' }, { label: 'Sun', time: '10:00am – 8:00pm' }], links: [], cta: null, note: null, meta: [{ Icon: MapPin, value: '243 Gorge Road, Newton SA 5074', href: 'https://maps.google.com/?q=243+Gorge+Road+Newton+SA' }, { Icon: Phone, value: '(08) 8337 2888', href: 'tel:0883372888' }], span: 1 },
  { id: 'gaming', num: '05', tag: '40 Machines', name: 'Gaming Lounge', sub: null, desc: 'A new and spacious Gaming Lounge for late night entertainment and fun with friends. Our 40 machines include a mix of the latest games and old favourites. Private parking, ATM and refreshments on site.', hours: [{ label: 'Mon – Thu', time: '8:00am – 2:00am' }, { label: 'Fri', time: '8:00am – 3:00am' }, { label: 'Sat', time: '9:00am – 3:00am' }, { label: 'Sun', time: '9:00am – 12:00am' }], links: [], cta: null, note: 'Gamble Responsibly. Helpline 1800 858 858', meta: null, span: 1 },
  { id: 'pods', num: '06', tag: 'Daily or Hourly', name: 'Business Pods', sub: 'Morning / Afternoon Tea Packages', desc: 'Brand new to Rezz — our Business Pods are a convenient spot to meet clients face to face in a professional space. Available for daily or hourly use with wireless connectivity, TV screens and remote printing.', hours: [{ label: 'Available', time: 'Daily or by the hour' }], links: [], cta: { label: 'Check Availability', href: '/booking' }, note: null, meta: null, span: 1 },
  { id: 'functions', num: '07', tag: 'Tailored to You', name: 'Functions & Events', sub: null, desc: 'We love functions! From business seminars to 18th birthdays and everything in between, Rezz has the perfect space. Arranged through consultation — every function is unique.', hours: [{ label: 'Enquire', time: 'By appointment' }], links: [], cta: { label: 'Make an Enquiry', href: '/functions' }, note: null, meta: [{ Icon: Phone, value: '08 8337 2888', href: 'tel:0883372888' }, { Icon: 'mail', value: 'enquiries@rezz.com.au', href: 'mailto:enquiries@rezz.com.au' }], span: 2 },
]

function MailIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export default function VenueCards() {
  const [hov, setHov] = useState<string | null>(null)
  return (
    <section id="venues" className="vc-root">
      <div className="vc-head">
        <div className="vc-head-left">
          <div className="eyebrow" style={{ color: 'rgba(200,169,110,0.75)' }}>
            <span className="eyebrow-bar" style={{ background: 'rgba(200,169,110,0.5)' }} />Our Venues
          </div>
          <h2 className="vc-title">Something for<br /><em>Everyone</em></h2>
        </div>
        <p className="vc-subtitle">Seven distinct spaces under one roof.<br />Whatever brings you here, Rezz has a place for you.</p>
      </div>

      <div className="vc-grid">
        {venues.map((v) => {
          const active = hov === v.id
          return (
            <div key={v.id} className={`vc-tile${v.span === 2 ? ' vc-span2' : ''}`}
              style={{ background: active ? '#2A1608' : '#1E0F05' }}
              onMouseEnter={() => setHov(v.id)} onMouseLeave={() => setHov(null)}>
              <div className="vc-accent" style={{ opacity: active ? 1 : 0 }} />
              <div className="vc-top">
                <span className="vc-num">{v.num}</span>
                <div className="vc-tags">
                  <span className="vc-tag">{v.tag}</span>
                  {v.sub && <span className="vc-sub">{v.sub}</span>}
                </div>
              </div>
              <h3 className="vc-name" style={{ color: active ? '#C8A96E' : '#EAE0D0' }}>{v.name}</h3>
              <p className="vc-desc">{v.desc}</p>
              <div className="vc-hours">
                {v.hours.map(({ label, time }) => (
                  <div key={label} className="vc-hours-row">
                    <span className="vc-hours-label">{label}</span>
                    {time && <span className="vc-hours-time">{time}</span>}
                  </div>
                ))}
              </div>
              {v.note && <p className="vc-note">{v.note}</p>}
              {v.meta && (
                <div className="vc-meta">
                  {v.meta.map(({ Icon, value, href }) => (
                    href ? (
                      <a key={value} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="vc-meta-row vc-meta-link">
                        {Icon === 'mail' ? <MailIcon /> : <Icon size={10} />}<span>{value}</span>
                      </a>
                    ) : (
                      <div key={value} className="vc-meta-row">
                        {Icon === 'mail' ? <MailIcon /> : <Icon size={10} />}<span>{value}</span>
                      </div>
                    )
                  ))}
                </div>
              )}
              <div className="vc-actions">
                {v.links.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="vc-link">
                    {l.label} <ExternalLink size={9} />
                  </a>
                ))}
                {v.cta && <Link href={v.cta.href} className="vc-cta">{v.cta.label} <ArrowRight size={11} /></Link>}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        /* D3: #1E0F05 — deep warm brown. Follows Events (W2 #F2EAE0).
           W2→D3 is the intentional dark contrast moment — after light events, venues feel dramatic.
           Tiles hover to D2 (#2A1608) = one step lighter = visible but subtle. */
        .vc-root { background: #1E0F05; }
        .vc-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; flex-wrap: wrap; padding: var(--py) var(--px) clamp(2.5rem, 4vw, 3.5rem); border-bottom: 1px solid rgba(200,169,110,0.1); }
        .vc-title { font-family: var(--font-cormorant); font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 300; color: #EAE0D0; line-height: 1.02; letter-spacing: -0.02em; margin: 0; }
        .vc-title em { font-style: italic; font-weight: 400; color: #C8A96E; }
        .vc-subtitle { font-family: var(--font-lora); font-size: 0.88rem; color: rgba(234,224,208,0.4); line-height: 1.85; max-width: 280px; margin: 0; }

        .vc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(200,169,110,0.07); border-top: 1px solid rgba(200,169,110,0.07); }
        .vc-tile { position: relative; padding: 2.5rem 2.25rem 2.25rem; display: flex; flex-direction: column; transition: background 0.35s; overflow: hidden; min-height: 300px; }
        .vc-span2 { grid-column: span 2; }
        .vc-accent { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, #C8A96E 25%, #C8A96E 75%, transparent); transition: opacity 0.4s var(--ease-spring); }

        .vc-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.75rem; }
        .vc-num { font-family: var(--font-cormorant); font-size: 0.82rem; font-weight: 300; color: rgba(200,169,110,0.28); letter-spacing: 0.06em; line-height: 1; flex-shrink: 0; }
        .vc-tags { display: flex; flex-direction: column; align-items: flex-end; gap: 0.22rem; text-align: right; }
        .vc-tag { font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(200,169,110,0.65); }
        .vc-sub { font-family: var(--font-jost); font-size: 0.48rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(234,224,208,0.28); }

        .vc-name { font-family: var(--font-cormorant); font-size: clamp(1.5rem, 2.5vw, 2.1rem); font-weight: 400; line-height: 1.05; letter-spacing: -0.01em; margin: 0 0 1rem; transition: color 0.3s; }
        .vc-desc { font-family: var(--font-lora); font-size: 0.82rem; color: rgba(234,224,208,0.48); line-height: 1.82; margin: 0 0 1.375rem; }
        .vc-hours { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 1.25rem; }
        .vc-hours-row { display: flex; align-items: baseline; gap: 0.75rem; }
        .vc-hours-label { font-family: var(--font-jost); font-size: 0.54rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(200,169,110,0.55); min-width: 4.75rem; flex-shrink: 0; }
        .vc-hours-time { font-family: var(--font-lora); font-size: 0.78rem; color: rgba(234,224,208,0.45); }
        .vc-note { font-family: var(--font-jost); font-size: 0.5rem; color: rgba(234,224,208,0.26); letter-spacing: 0.04em; margin: -0.25rem 0 1rem; }
        .vc-meta { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.375rem; }
        .vc-meta-row { display: flex; align-items: center; gap: 0.55rem; font-family: var(--font-jost); font-size: 0.6rem; letter-spacing: 0.04em; color: rgba(234,224,208,0.42); text-decoration: none; }
        .vc-meta-link { transition: color 0.15s; }
        .vc-meta-link:hover { color: #C8A96E; }
        .vc-actions { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; margin-top: auto; }
        .vc-link { font-family: var(--font-jost); font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(200,169,110,0.65); text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem; border-bottom: 1px solid rgba(200,169,110,0.2); padding-bottom: 1px; transition: color 0.15s, border-color 0.15s; }
        .vc-link:hover { color: #D4B070; border-color: rgba(200,169,110,0.45); }
        .vc-cta { font-family: var(--font-jost); font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #EAE0D0; background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.1rem; transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .vc-cta:hover { background: #C8A96E; border-color: #C8A96E; color: #1E0F05; }

        @media (max-width: 1024px) { .vc-grid { grid-template-columns: repeat(2, 1fr); } .vc-span2 { grid-column: span 2; } }
        @media (max-width: 640px) { .vc-grid { grid-template-columns: 1fr; } .vc-span2 { grid-column: span 1; } .vc-head { padding: 3rem var(--px) 2.25rem; flex-direction: column; align-items: flex-start; } .vc-subtitle { max-width: 100%; } }
      `}</style>
    </section>
  )
}
