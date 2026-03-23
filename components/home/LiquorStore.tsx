import Image from 'next/image'
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react'

const details = [
  { Icon: MapPin, text: '243 Gorge Road, Newton SA 5074' },
  { Icon: Phone,  text: '(08) 8337 2888' },
  { Icon: Clock,  text: 'Mon–Sat 9:00am – 9:00pm · Sun 10:00am – 8:00pm' },
]

const hours = [
  { day: 'Monday – Saturday', time: '9:00am – 9:00pm' },
  { day: 'Sunday',            time: '10:00am – 8:00pm' },
]

export default function LiquorStore() {
  return (
    <section className="ls-root">
      <div className="ls-rule-top" />

      <div className="ls-inner">

        {/* ── LEFT: Text content ── */}
        <div className="ls-text">
          <div className="eyebrow">
            <span className="eyebrow-bar" />
            Rezz Liquor Store
          </div>

          <h2 className="ls-h2">
            Take the Night<em> Home With You</em>
          </h2>

          <p className="ls-body">
            Stocking an extensive range of wine, spirits and local and imported beer.
            Our friendly staff are happy to help with your selections and pairings.
          </p>

          <div className="ls-details">
            {details.map(({ Icon, text }) => (
              <div key={text} className="ls-detail-row">
                <div className="ls-detail-icon">
                  <Icon size={11} />
                </div>
                <span className="ls-detail-text">{text}</span>
              </div>
            ))}
          </div>

          <a
            href="https://www.google.com/maps/search/243+Gorge+Road+Newton+SA"
            target="_blank"
            rel="noopener noreferrer"
            className="ls-link"
          >
            Get Directions <ArrowUpRight size={12} />
          </a>
        </div>

        {/* ── RIGHT: Photo panel ── */}
        <div className="ls-visual">
          {/* Actual image — next/image with fill */}
          <div className="ls-img-wrap">
            <Image
              src="/liquor-store.jpg"
              alt="Rezz Liquor Store interior"
              fill
              className="object-cover"
              sizes="50vw"
            />
            {/* Overlay gradient for depth */}
            <div className="ls-img-overlay" />
          </div>

          {/* Floating hours card */}
          <div className="ls-hours-card">
            <p className="ls-hours-eyebrow">Trading Hours</p>
            {hours.map(({ day, time }) => (
              <div key={day} className="ls-hours-row">
                <span className="ls-hours-day">{day}</span>
                <span className="ls-hours-time">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ls-root { background: #F5EFE4; overflow: hidden; }

        .ls-rule-top {
          height: 1px;
          background: rgba(26,12,2,0.07);
        }

        /* Two-col layout */
        .ls-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
        }

        /* Text side */
        .ls-text {
          padding: var(--py) var(--px);
          display: flex; flex-direction: column; justify-content: center;
        }

        .ls-h2 {
          font-family: var(--font-cormorant);
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 300; color: #1A0C02;
          line-height: 1.05; letter-spacing: -0.015em;
          margin: 0 0 1.5rem;
        }
        .ls-h2 em {
          font-style: italic; font-weight: 400; color: #B8821E; display: block;
        }

        .ls-body {
          font-family: var(--font-lora); font-size: 0.9rem;
          color: #6B5240; line-height: 1.85;
          max-width: 400px; margin: 0 0 2.25rem;
        }

        .ls-details {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 2.25rem;
        }
        .ls-detail-row {
          display: flex; align-items: flex-start; gap: 0.75rem;
        }
        .ls-detail-icon {
          width: 20px; flex-shrink: 0; margin-top: 0.15rem;
          color: #B8821E; display: flex;
        }
        .ls-detail-text {
          font-family: var(--font-jost); font-size: 0.72rem;
          letter-spacing: 0.04em; color: #6B5240; line-height: 1.5;
        }

        .ls-link {
          font-family: var(--font-jost); font-size: 0.62rem;
          font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          color: #1A0C02; text-decoration: none;
          border-bottom: 1px solid rgba(26,12,2,0.18);
          padding-bottom: 2px;
          display: inline-flex; align-items: center; gap: 0.3rem;
          transition: color 0.15s, border-color 0.15s;
          align-self: flex-start;
        }
        .ls-link:hover { color: #B8821E; border-color: #B8821E; }

        /* Visual side */
        .ls-visual {
          position: relative;
          min-height: 520px;
          background: #E8DCC8;
        }
        .ls-img-wrap {
          position: absolute; inset: 0;
        }
        .ls-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(26,12,2,0.55) 0%,
            transparent 55%
          );
        }

        /* Floating hours card — elevated out of the image */
        .ls-hours-card {
          position: absolute;
          bottom: 2.5rem; left: -2.25rem;
          background: #1A0C02;
          padding: 1.75rem 2rem;
          min-width: 248px;
          z-index: 5;
          box-shadow: -8px 8px 48px rgba(0,0,0,0.3);
        }
        .ls-hours-eyebrow {
          font-family: var(--font-jost); font-size: 0.54rem;
          font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase;
          color: #B8821E; margin: 0 0 1rem;
        }
        .ls-hours-row {
          display: flex; flex-direction: column; gap: 0.12rem;
          margin-bottom: 0.75rem;
        }
        .ls-hours-row:last-child { margin-bottom: 0; }
        .ls-hours-day {
          font-family: var(--font-jost); font-size: 0.6rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(245,239,228,0.42);
        }
        .ls-hours-time {
          font-family: var(--font-lora); font-size: 0.88rem;
          color: rgba(245,239,228,0.85);
        }

        @media (max-width: 900px) {
          .ls-inner { grid-template-columns: 1fr; }
          .ls-visual { min-height: 340px; }
          .ls-hours-card { left: 1.5rem; bottom: 1.5rem; }
        }
      `}</style>
    </section>
  )
}
