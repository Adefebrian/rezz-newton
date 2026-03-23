import { Instagram, Facebook, ArrowUpRight } from 'lucide-react'

const socials = [
  { platform: 'Instagram', handle: '@rezznewton', desc: 'Behind-the-scenes, events and daily specials', href: 'https://www.instagram.com/rezznewton/', Icon: Instagram },
  { platform: 'Facebook', handle: 'Rezz Newton SA', desc: 'News, updates and community highlights', href: 'https://web.facebook.com/REZZNEWTONSA/', Icon: Facebook },
]

export default function SocialFollow() {
  return (
    <section className="sf-root" aria-label="Follow Rezz on social media">
      <div className="sf-inner">
        <div className="sf-left">
          <div className="sf-eyebrow"><span className="sf-bar" />Follow Rezz</div>
          <h2 className="sf-h2">Stay Up <em>to Date</em></h2>
          <p className="sf-body">Stay up to date on all the latest news, events and special offers from Rezz.</p>
        </div>
        <div className="sf-cards">
          {socials.map(({ platform, handle, desc, href, Icon }) => (
            <a key={platform} href={href} target="_blank" rel="noopener noreferrer"
              className="sf-card" aria-label={`Follow Rezz on ${platform}`}>
              <div className="sf-card-left">
                <div className="sf-icon-wrap"><Icon size={16} /></div>
                <div>
                  <p className="sf-platform">{platform}</p>
                  <p className="sf-handle">{handle}</p>
                  <p className="sf-desc">{desc}</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="sf-arrow" />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* D3: #1E0F05 — deep warm brown. Sits between Reviews (W2) and Enquiry (W3).
           Same as VenueCards — creates a consistent dark "anchor" tone. */
        .sf-root { background: #1E0F05; border-top: 1px solid rgba(200,169,110,0.1); border-bottom: 1px solid rgba(200,169,110,0.1); }
        .sf-inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 7rem); align-items: center; padding: var(--py) var(--px); }

        .sf-eyebrow { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(200,169,110,0.7); margin-bottom: 1.25rem; }
        .sf-bar { display: block; width: 26px; height: 1px; background: rgba(200,169,110,0.45); flex-shrink: 0; }
        .sf-h2 { font-family: var(--font-cormorant); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: #EAE0D0; line-height: 1.05; letter-spacing: -0.015em; margin: 0 0 1.25rem; }
        .sf-h2 em { font-style: italic; font-weight: 400; color: #C8A96E; }
        .sf-body { font-family: var(--font-lora); font-size: 0.875rem; color: rgba(234,224,208,0.48); line-height: 1.85; max-width: 360px; margin: 0; }

        .sf-cards { display: flex; flex-direction: column; border: 1px solid rgba(200,169,110,0.12); }
        .sf-card { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding: 1.875rem 2rem; text-decoration: none; border-bottom: 1px solid rgba(200,169,110,0.08); transition: background 0.25s; }
        .sf-card:last-child { border-bottom: none; }
        .sf-card:hover { background: rgba(200,169,110,0.05); }
        .sf-card:hover .sf-arrow { color: #C8A96E; transform: translate(2px, -2px); }
        .sf-card-left { display: flex; align-items: center; gap: 1.375rem; flex: 1; }
        .sf-icon-wrap { width: 44px; height: 44px; flex-shrink: 0; border: 1px solid rgba(200,169,110,0.2); display: flex; align-items: center; justify-content: center; color: #C8A96E; }
        .sf-platform { font-family: var(--font-jost); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(200,169,110,0.6); margin: 0 0 0.15rem; }
        .sf-handle { font-family: var(--font-cormorant); font-size: 1.2rem; font-weight: 300; color: #EAE0D0; margin: 0 0 0.3rem; line-height: 1.1; }
        .sf-desc { font-family: var(--font-lora); font-size: 0.72rem; color: rgba(234,224,208,0.4); margin: 0; }
        .sf-arrow { flex-shrink: 0; color: rgba(234,224,208,0.2); transition: color 0.2s, transform 0.25s var(--ease-spring); }

        @media (max-width: 768px) { .sf-inner { grid-template-columns: 1fr; gap: 3rem; } }
      `}</style>
    </section>
  )
}
