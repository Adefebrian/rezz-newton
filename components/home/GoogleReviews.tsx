'use client'

import { reviews } from '@/data/reviews'

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span aria-label={`${count} stars`} style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C8A96E" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  )
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" aria-label="Google" role="img">
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3L37 9.9C33.7 6.8 29.1 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c10.5 0 18-7.5 18-18.5 0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3L37 9.9C33.7 6.8 29.1 5 24 5c-7.6 0-14.2 4-17.7 9.7z"/>
      <path fill="#4CAF50" d="M24 43c5.2 0 9.8-1.8 13.2-4.8l-6.1-5c-2 1.4-4.6 2.3-7.1 2.3-5.2 0-9.6-3.4-11.2-8.1l-6.5 5C9.9 39.1 16.4 43 24 43z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.1 5C40.6 35.6 44 30.2 44 24c0-1.3-.2-2.7-.4-4z"/>
    </svg>
  )
}

export default function GoogleReviews() {
  const doubled = [...reviews, ...reviews]
  return (
    <section className="gr-root" aria-labelledby="gr-heading">
      <div className="gr-header">
        <div>
          <div className="eyebrow"><span className="eyebrow-bar" />Guest Reviews</div>
          <h2 id="gr-heading" className="gr-h2">What Our Guests<em> Are Saying</em></h2>
        </div>
        <div className="gr-rating-block">
          <div className="gr-score">4.5</div>
          <div className="gr-rating-right">
            <Stars />
            <div className="gr-rating-source"><GoogleIcon /><span className="gr-rating-text">Google Reviews</span></div>
          </div>
        </div>
      </div>

      <div className="gr-marquee-wrap" aria-hidden="true">
        <div className="gr-fade-l" />
        <div className="gr-fade-r" />
        <div className="gr-track marquee-track">
          {doubled.map((r, i) => (
            <article key={`${r.name}-${i}`} className="gr-card">
              <div className="gr-card-top"><Stars /><GoogleIcon /></div>
              <blockquote className="gr-quote">&ldquo;{r.text}&rdquo;</blockquote>
              <footer className="gr-footer">
                <div className="gr-avatar">{r.name.charAt(0)}</div>
                <div>
                  <p className="gr-name">{r.name}</p>
                  <p className="gr-date">{r.date}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        /* W2: #F2EAE0 — same as EventsBanner. After two dark sections (Venues+CTA)
           this feels earned. Cards (#FAF7F2) sit one step lighter — natural layering. */
        .gr-root { background: #F2EAE0; padding-bottom: var(--py); overflow: hidden; border-top: 1px solid rgba(180,140,90,0.12); }
        .gr-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; flex-wrap: wrap; padding: var(--py) var(--px) clamp(2.5rem, 4vw, 4rem); }
        .gr-h2 { font-family: var(--font-cormorant); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: #1C0D02; line-height: 1.05; letter-spacing: -0.015em; margin: 0; }
        .gr-h2 em { font-style: italic; font-weight: 400; color: #9A7D4A; }
        .gr-rating-block { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
        .gr-score { font-family: var(--font-cormorant); font-size: 3rem; font-weight: 300; color: #1C0D02; line-height: 1; letter-spacing: -0.02em; }
        .gr-rating-right { display: flex; flex-direction: column; gap: 0.35rem; }
        .gr-rating-source { display: flex; align-items: center; gap: 0.4rem; }
        .gr-rating-text { font-family: var(--font-jost); font-size: 0.63rem; font-weight: 600; letter-spacing: 0.08em; color: #7A5E42; }

        .gr-marquee-wrap { position: relative; }
        .gr-fade-l { position: absolute; left: 0; top: 0; bottom: 0; width: 100px; z-index: 5; pointer-events: none; background: linear-gradient(to right, #F2EAE0, transparent); }
        .gr-fade-r { position: absolute; right: 0; top: 0; bottom: 0; width: 100px; z-index: 5; pointer-events: none; background: linear-gradient(to left, #F2EAE0, transparent); }
        .gr-track { padding: 0.75rem 0 1rem; }

        .gr-card { flex-shrink: 0; width: 340px; margin: 0 0.875rem; background: #FAF7F2; padding: 2rem 1.875rem; border: 1px solid rgba(180,140,90,0.1); display: flex; flex-direction: column; gap: 1.25rem; box-shadow: 0 2px 16px rgba(15,8,4,0.05); }
        .gr-card-top { display: flex; align-items: center; justify-content: space-between; }
        .gr-quote { font-family: var(--font-lora); font-size: 0.875rem; color: #3D2010; line-height: 1.82; font-style: italic; margin: 0; flex: 1; }
        .gr-footer { display: flex; align-items: center; gap: 0.875rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(180,140,90,0.1); }
        .gr-avatar { width: 32px; height: 32px; border-radius: 50%; background: #2A1608; display: flex; align-items: center; justify-content: center; font-family: var(--font-jost); font-size: 0.72rem; font-weight: 700; color: #C8A96E; flex-shrink: 0; }
        .gr-name { font-family: var(--font-jost); font-size: 0.72rem; font-weight: 700; color: #1C0D02; margin: 0 0 0.15rem; }
        .gr-date { font-family: var(--font-jost); font-size: 0.62rem; color: #7A5E42; margin: 0; }
      `}</style>
    </section>
  )
}
