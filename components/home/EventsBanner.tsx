'use client'

import { ExternalLink, Calendar, Clock, MapPin, Users } from 'lucide-react'

const meta = [
  { Icon: Calendar, label: 'Date',  value: 'Thursday, 14 May 2026' },
  { Icon: Clock,    label: 'Time',  value: '6:00 PM' },
  { Icon: Users,    label: 'Seats', value: 'Limited Availability' },
  { Icon: MapPin,   label: 'Venue', value: 'Rezz Hotel, Newton SA' },
]

export default function EventsBanner() {
  return (
    <section className="ev-root" aria-label="Upcoming event">
      <div className="ev-layout">

        <div className="ev-left">
          <div className="ev-eyebrow">
            <span className="ev-eyebrow-bar" />Upcoming Event
          </div>
          <h2 className="ev-h2">
            A Post-Harvest Evening:
            <em> Food, Wine &amp; Stories</em>
          </h2>
          <p className="ev-body">
            Join us for an intimate evening celebrating the harvest season with Paracombe Wines.
            A curated menu paired with exceptional Adelaide Hills vintages, as winemakers share
            the stories behind every bottle.
          </p>
          <a href="https://tastingaustralia.com.au/products/events/2026/a-post-harvest-evening-food-wine-and-stories-with-paracombe-and-rezz"
            target="_blank" rel="noopener noreferrer" className="ev-cta">
            Reserve Your Seat <ExternalLink size={11} />
          </a>
        </div>

        <div className="ev-right">
          <div className="ev-card">
            <p className="ev-card-eyebrow">Event Details</p>
            {meta.map(({ Icon, label, value }) => (
              <div key={label} className="ev-meta-row">
                <div className="ev-meta-icon"><Icon size={10} /></div>
                <span className="ev-meta-label">{label}</span>
                <span className="ev-meta-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="ev-partner">
            <span className="ev-partner-pre">In partnership with</span>
            <span className="ev-partner-name">Paracombe Wines</span>
            <span className="ev-partner-loc">Adelaide Hills, South Australia</span>
          </div>
        </div>
      </div>

      <style>{`
        /*
          W2: #F2EAE0 — ivory cream, one step warmer/darker than Gallery W1
          Gallery is #FAF7F2 (near-white cool)
          Events  is #F2EAE0 (warm ivory) — barely different, feels like same page
          The dark card sits naturally — ivory bg + dark card = editorial, not jarring
          because both share the same warm-brown undertone.
        */
        .ev-root {
          background: #F2EAE0;
          position: relative;
          border-top: 1px solid rgba(180,140,90,0.12);
        }

        .ev-layout {
          display: grid; grid-template-columns: 1fr 340px;
          gap: clamp(4rem, 7vw, 8rem); align-items: start;
          padding: var(--py) var(--px);
        }

        .ev-eyebrow {
          display: flex; align-items: center; gap: 0.75rem;
          font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #9A7D4A; margin-bottom: 1.5rem;
        }
        .ev-eyebrow-bar { display: block; width: 26px; height: 1px; background: rgba(154,125,74,0.5); flex-shrink: 0; }

        .ev-h2 {
          font-family: var(--font-cormorant);
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 300; color: #1C0D02;
          line-height: 1.04; letter-spacing: -0.015em; margin: 0 0 1.75rem;
        }
        .ev-h2 em { font-style: italic; font-weight: 400; color: #9A7D4A; display: block; }

        .ev-body {
          font-family: var(--font-lora); font-size: 0.9rem;
          color: #7A5E42; line-height: 1.9; max-width: 460px; margin: 0 0 2.5rem;
        }

        .ev-cta {
          font-family: var(--font-jost); font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #F2EAE0; background: #2A1608; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 2rem; transition: background 0.2s, transform 0.2s;
        }
        .ev-cta:hover { background: #3D2010; transform: translateY(-2px); }

        .ev-right { display: flex; flex-direction: column; gap: 1.75rem; padding-top: 0.25rem; }

        /*
          Card: D3 #1E0F05 on W2 #F2EAE0 background.
          Both are in the same warm-brown family — card feels grounded, not pasted-on.
          The key: same hue (warm brown), just different luminosity.
        */
        .ev-card {
          background: #2A1608;
          padding: 1.875rem;
          box-shadow: 0 8px 32px rgba(15,8,4,0.15);
        }
        .ev-card-eyebrow {
          font-family: var(--font-jost); font-size: 0.5rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(200,169,110,0.65); margin: 0 0 1.25rem;
        }
        .ev-meta-row { display: flex; align-items: center; padding: 0.65rem 0; border-bottom: 1px solid rgba(200,169,110,0.08); }
        .ev-meta-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ev-meta-row:first-of-type { padding-top: 0; }
        .ev-meta-icon { width: 26px; flex-shrink: 0; color: rgba(200,169,110,0.5); display: flex; align-items: center; }
        .ev-meta-label {
          font-family: var(--font-jost); font-size: 0.48rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(200,169,110,0.5); min-width: 3rem; flex-shrink: 0;
        }
        .ev-meta-value { font-family: var(--font-lora); font-size: 0.85rem; color: rgba(242,234,224,0.88); margin-left: 0.875rem; }

        .ev-partner { display: flex; flex-direction: column; gap: 0.2rem; padding-top: 1rem; border-top: 1px solid rgba(180,140,90,0.15); }
        .ev-partner-pre { font-family: var(--font-jost); font-size: 0.48rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(28,13,2,0.35); margin-bottom: 0.4rem; }
        .ev-partner-name { font-family: var(--font-cormorant); font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 300; color: #1C0D02; line-height: 1.1; }
        .ev-partner-loc { font-family: var(--font-lora); font-size: 0.75rem; color: rgba(28,13,2,0.4); }

        @media (max-width: 900px) { .ev-layout { grid-template-columns: 1fr; gap: 3rem; } }
      `}</style>
    </section>
  )
}
