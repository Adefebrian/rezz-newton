'use client'

import Link from 'next/link'
import { Gift, BedDouble, ShoppingBag, ArrowRight } from 'lucide-react'

export default function HomeCtaStrips() {
  return (
    <div className="cs-root">

      <div className="cs-strip">
        <div className="cs-strip-text">
          <p className="cs-eyebrow">Dine with us</p>
          <h3 className="cs-h">We look forward to seeing you</h3>
          <p className="cs-sub">Make a reservation by clicking on Book Today</p>
        </div>
        <Link href="/booking" className="cs-btn cs-btn-gold">Book Today <ArrowRight size={13} /></Link>
      </div>

      <div className="cs-div" />

      <div className="cs-strip">
        <div className="cs-gift-icon" aria-hidden="true"><Gift size={16} /></div>
        <div className="cs-strip-text">
          <p className="cs-eyebrow">Gift someone special</p>
          <h3 className="cs-h">Rezz e-Vouchers</h3>
          <p className="cs-sub">Purchase through the link, the perfect gift for any occasion</p>
        </div>
        <a href="https://rezz.com.au/vouchers" target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn-outline">
          Purchase Here <ArrowRight size={13} />
        </a>
      </div>

      <div className="cs-div" />

      <div className="cs-quick">
        <Link href="/booking" className="cs-quick-item">
          <div className="cs-qi cs-qi-outline"><BedDouble size={20} /></div>
          <div className="cs-qt">
            <span className="cs-qm">Reserve Your Stay</span>
            <span className="cs-qn">Book Hotel</span>
          </div>
          <ArrowRight size={14} className="cs-qa" />
        </Link>
        <div className="cs-qs" />
        <Link href="/order" className="cs-quick-item">
          <div className="cs-qi cs-qi-solid"><ShoppingBag size={20} /></div>
          <div className="cs-qt">
            <span className="cs-qm">From Our Kitchen</span>
            <span className="cs-qn">Order Food</span>
          </div>
          <ArrowRight size={14} className="cs-qa" />
        </Link>
      </div>

      <style>{`
        /*
          D2: #2A1608 — medium dark warm brown
          Sits after VenueCards (D3 #1E0F05).
          D3 → D2 = one step lighter = smooth step up from darkest dark.
          Before Reviews (W2 #F2EAE0) = the light-dark jump here IS the design
          moment — after two dark sections the light feels like relief, not shock.
        */
        .cs-root {
          background: #2A1608;
          border-top: 1px solid rgba(200,169,110,0.1);
          border-bottom: 1px solid rgba(200,169,110,0.1);
        }
        .cs-div { height: 1px; background: rgba(200,169,110,0.1); margin: 0 var(--px); }

        .cs-strip { display: flex; align-items: center; gap: 2.5rem; padding: 2rem var(--px); flex-wrap: wrap; }

        .cs-gift-icon { width: 42px; height: 42px; flex-shrink: 0; border: 1px solid rgba(200,169,110,0.22); display: flex; align-items: center; justify-content: center; color: #C8A96E; }
        .cs-strip-text { flex: 1; min-width: 200px; }

        .cs-eyebrow { font-family: var(--font-jost); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(200,169,110,0.6); margin: 0 0 0.35rem; }
        .cs-h { font-family: var(--font-cormorant); font-size: clamp(1.2rem, 2.2vw, 1.7rem); font-weight: 300; color: #EAE0D0; margin: 0 0 0.3rem; line-height: 1.15; }
        .cs-sub { font-family: var(--font-lora); font-size: 0.82rem; color: rgba(234,224,208,0.45); margin: 0; }

        .cs-btn { font-family: var(--font-jost); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.8rem 1.875rem; flex-shrink: 0; white-space: nowrap; transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s; }
        .cs-btn-gold { background: #C8A96E; color: #1C0D02; }
        .cs-btn-gold:hover { background: #D4B070; transform: translateY(-1px); }
        .cs-btn-outline { background: transparent; color: rgba(234,224,208,0.7); border: 1px solid rgba(200,169,110,0.25); }
        .cs-btn-outline:hover { border-color: rgba(200,169,110,0.5); color: #EAE0D0; }

        .cs-quick { display: grid; grid-template-columns: 1fr 1px 1fr; border-top: 1px solid rgba(200,169,110,0.1); }
        .cs-quick-item { display: flex; align-items: center; gap: 1.5rem; padding: 2.25rem var(--px); text-decoration: none; transition: background 0.2s; }
        .cs-quick-item:hover { background: rgba(200,169,110,0.04); }
        .cs-quick-item:hover .cs-qa { color: #C8A96E; transform: translateX(4px); }
        .cs-qs { background: rgba(200,169,110,0.1); }
        .cs-qi { width: 50px; height: 50px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .cs-qi-outline { border: 1px solid rgba(200,169,110,0.2); color: rgba(200,169,110,0.6); }
        .cs-qi-solid { background: #C8A96E; color: #1C0D02; }
        .cs-qt { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; }
        .cs-qm { font-family: var(--font-jost); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(200,169,110,0.55); }
        .cs-qn { font-family: var(--font-cormorant); font-size: clamp(1.3rem, 2.2vw, 1.85rem); font-weight: 300; color: #EAE0D0; line-height: 1; letter-spacing: -0.01em; }
        .cs-qa { flex-shrink: 0; color: rgba(234,224,208,0.18); transition: color 0.2s, transform 0.25s var(--ease-spring); }

        @media (max-width: 640px) { .cs-quick { grid-template-columns: 1fr; } .cs-qs { height: 1px; width: 100%; } .cs-strip { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </div>
  )
}
