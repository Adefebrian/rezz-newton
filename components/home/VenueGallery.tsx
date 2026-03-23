'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const slides = [
  { src: '/img/image1.png',  alt: 'Rezz Hotel venue',        label: 'The Venue' },
  { src: '/img/image2.png',  alt: 'Z-Bar dining experience', label: 'Z-Bar & Restaurant' },
  { src: '/img/image3.png',  alt: 'Cafe + Play',             label: 'Cafe + Play' },
  { src: '/img/image4.png',  alt: 'Sports bar atmosphere',   label: 'Sports Bar' },
  { src: '/img/image5.png',  alt: 'Beer garden evening',     label: 'Beer Garden' },
  { src: '/img/image6.png',  alt: 'Functions and events',    label: 'Functions & Events' },
  { src: '/img/image7.png',  alt: 'Rezz Hotel exterior',     label: 'Hotel' },
  { src: '/img/image8.jpg',  alt: 'Fine dining at Rezz',     label: 'Fine Dining' },
  { src: '/img/image9.jpg',  alt: 'Cocktails at the bar',    label: 'Cocktails' },
  { src: '/img/image10.jpg', alt: 'Weekend brunch',          label: 'Brunch' },
  { src: '/img/image11.jpg', alt: 'Gaming lounge',           label: 'Gaming Lounge' },
]

const DURATION = 4500

export default function VenueGallery() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [fading,  setFading]  = useState(false)

  const goTo = useCallback((i: number) => {
    setFading(true)
    setTimeout(() => { setCurrent(i); setFading(false) }, 320)
  }, [])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, DURATION)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section className="vg-root" aria-label="Venue gallery">
      <div className="vg-wrap">
        <div className="vg-header">
          <div className="eyebrow"><span className="eyebrow-bar" />Inside Rezz</div>
          <h2 className="vg-title">A Glimpse of <em>Our Spaces</em></h2>
        </div>

        <div className="vg-frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="vg-track" style={{ opacity: fading ? 0 : 1 }}>
            <Image src={slides[current].src} alt={slides[current].alt} fill className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px" priority={current === 0} />
            <div className="vg-shade" />
          </div>

          <div className="vg-prog-track">
            <div className="vg-prog-fill" key={`${current}-${paused}`}
              style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
          </div>

          <div className="vg-bar">
            <span className="vg-label" key={current}>{slides[current].label}</span>
            <div className="vg-dots" role="tablist" aria-label="Gallery slides">
              {slides.map((s, i) => (
                <button key={i} role="tab" aria-selected={i === current} aria-label={s.label}
                  onClick={() => goTo(i)} className={`vg-pip${i === current ? ' vg-pip-active' : ''}`} />
              ))}
            </div>
            <div className="vg-controls">
              <span className="vg-count">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              <button onClick={prev} className="vg-arrow" aria-label="Previous"><ArrowLeft size={13} strokeWidth={1.5} /></button>
              <button onClick={next} className="vg-arrow" aria-label="Next"><ArrowRight size={13} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /*
          W1: #FAF7F2 — warm near-white
          Sits directly after Hero (D4 #140A02).
          The light-dark jump here is INTENTIONAL — hero sections always
          contrast with what follows. This is standard editorial design.
        */
        .vg-root {
          background: #FAF7F2;
          padding: var(--py) var(--px);
        }
        .vg-wrap { max-width: var(--max-w); margin: 0 auto; }
        .vg-header { margin-bottom: clamp(1.75rem, 3vw, 2.5rem); }
        .vg-title {
          font-family: var(--font-cormorant); font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 300; color: #1C0D02; line-height: 1.04; letter-spacing: -0.02em; margin: 0;
        }
        .vg-title em { font-style: italic; font-weight: 400; color: #9A7D4A; }

        .vg-frame {
          position: relative; width: 100%; aspect-ratio: 16 / 7; min-height: 280px;
          overflow: hidden; background: #0F0804;
          box-shadow: 0 12px 56px rgba(15,8,4,0.2);
        }
        .vg-track { position: absolute; inset: 0; transition: opacity 0.32s ease; }
        .vg-shade {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(8,3,1,0.8) 0%, rgba(8,3,1,0.05) 30%, transparent 52%);
        }
        .vg-prog-track { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.04); z-index: 10; }
        .vg-prog-fill { height: 100%; width: 0%; background: #C8A96E; animation: vgFill linear forwards; }
        @keyframes vgFill { from { width: 0%; } to { width: 100%; } }

        .vg-bar { position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 1.75rem; z-index: 10; }
        .vg-label { font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(234,224,208,0.5); min-width: 9rem; white-space: nowrap; animation: vgLabel 0.32s ease forwards; }
        @keyframes vgLabel { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .vg-dots { display: flex; align-items: center; gap: 5px; flex: 1; justify-content: center; }
        .vg-pip { width: 16px; height: 2px; border: none; padding: 0; cursor: pointer; background: rgba(234,224,208,0.14); transition: background 0.25s, width 0.35s cubic-bezier(0.16,1,0.3,1); }
        .vg-pip-active { width: 36px; background: #C8A96E; }
        .vg-pip:hover:not(.vg-pip-active) { background: rgba(234,224,208,0.3); }
        .vg-controls { display: flex; align-items: center; gap: 0.625rem; flex-shrink: 0; }
        .vg-count { font-family: var(--font-jost); font-size: 0.52rem; font-weight: 600; letter-spacing: 0.1em; color: rgba(234,224,208,0.2); white-space: nowrap; margin-right: 0.25rem; }
        .vg-arrow { width: 34px; height: 34px; border: 1px solid rgba(234,224,208,0.12); background: rgba(255,255,255,0.03); color: rgba(234,224,208,0.42); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, color 0.2s; backdrop-filter: blur(4px); }
        .vg-arrow:hover { border-color: rgba(200,169,110,0.45); color: #C8A96E; }

        @media (max-width: 768px) { .vg-frame { aspect-ratio: 4 / 3; } .vg-label { display: none; } .vg-bar { padding: 1rem 1.25rem; } }
        @media (max-width: 480px) { .vg-frame { aspect-ratio: 1 / 1; min-height: 260px; } }
      `}</style>
    </section>
  )
}
