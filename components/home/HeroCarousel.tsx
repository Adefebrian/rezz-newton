'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { src: '/carousel/image1.png',  alt: 'Rezz Hotel venue' },
  { src: '/carousel/image2.png',  alt: 'Z-Bar dining experience' },
  { src: '/carousel/image3.png',  alt: 'Cafe and Play family area' },
  { src: '/carousel/image4.png',  alt: 'Sports bar atmosphere' },
  { src: '/carousel/image5.png',  alt: 'Beer garden evening' },
  { src: '/carousel/image6.png',  alt: 'Functions and events' },
  { src: '/carousel/image7.png',  alt: 'Rezz Hotel exterior' },
  { src: '/carousel/image8.jpg',  alt: 'Fine dining at Rezz' },
  { src: '/carousel/image9.jpg',  alt: 'Cocktails at the bar' },
  { src: '/carousel/image10.jpg', alt: 'Weekend brunch' },
  { src: '/carousel/image11.jpg', alt: 'Gaming lounge' },
]

const DURATION = 6000

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [ready,   setReady]   = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])

  useEffect(() => { setReady(true) }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, DURATION)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      aria-label="Hero"
      className="hero-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Full-bleed background ── */}
      <div className="hero-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="hero-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay — layered warmth, no geometric patterns */}
        <div className="hero-overlay" />
        <div className="hero-vignette" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-gold-glow" aria-hidden="true" />
      </div>

      {/* ── Centred content ── */}
      <div className="hero-stage">
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Newton, South Australia</span>
            <span className="hero-eyebrow-line" />
          </div>

          {/* Headline — Cormorant light + italic, no bold */}
          <h1 className="hero-h1">
            <span className="hero-h1-top">Where Every Moment</span>
            <em className="hero-h1-btm">Becomes a Memory</em>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">
            Dining &nbsp;&middot;&nbsp; Entertainment &nbsp;&middot;&nbsp; Events &nbsp;&middot;&nbsp; Community
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link href="/booking" className="hero-btn-gold">
              Book Hotel
            </Link>
            <Link href="/order" className="hero-btn-outline">
              Order Food
            </Link>
          </div>
        </motion.div>

        {/* ── Slide indicators — bottom centre ── */}
        <div className="hero-nav" role="tablist" aria-label="Slide navigation">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={s.alt}
              onClick={() => setCurrent(i)}
              className={`hero-pip${i === current ? ' active' : ''}`}
            />
          ))}
        </div>

        {/* ── Scroll cue ── */}
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-mouse">
            <span className="hero-scroll-wheel" />
          </span>
          <span className="hero-scroll-label">Scroll</span>
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .hero-root {
          position: relative;
          width: 100%;
          height: calc(100vh - 96px);
          min-height: 660px;
          overflow: hidden;
          background: #0D0602;
        }

        /* ── Background ── */
        .hero-bg { position: absolute; inset: 0; }
        .hero-img { position: absolute; inset: 0; }

        /* Rich layered darkening — no patterns, pure warmth */
        .hero-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(
              ellipse 75% 85% at 50% 50%,
              rgba(8,3,1,0.25) 0%,
              rgba(8,3,1,0.60) 55%,
              rgba(8,3,1,0.84) 100%
            );
        }

        /* Bottom vignette + top shadow — pure gradient, no lines */
        .hero-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(to bottom,
              rgba(8,3,1,0.50) 0%,
              transparent 18%,
              transparent 60%,
              rgba(8,3,1,0.78) 100%
            );
        }

        /* Organic film grain — luxury print feel, not tech */
        .hero-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        /* Warm gold glow rising from bottom centre — candlelight/fireplace feel */
        .hero-gold-glow {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(
            ellipse 55% 38% at 50% 102%,
            rgba(184,130,30,0.13) 0%,
            rgba(120,75,10,0.07) 45%,
            transparent 70%
          );
        }

        /* ── Stage — full-bleed centre layout ── */
        .hero-stage {
          position: absolute; inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 clamp(1.5rem, 6vw, 8rem);
          z-index: 10;
        }

        /* ── Content block ── */
        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 860px;
          width: 100%;
        }

        /* Eyebrow — centred with lines either side */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.25rem;
        }
        .hero-eyebrow-line {
          display: block;
          width: 40px; height: 1px;
          background: rgba(184,130,30,0.55);
          flex-shrink: 0;
        }
        .hero-eyebrow-text {
          font-family: var(--font-jost);
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(184,130,30,0.9);
          white-space: nowrap;
        }

        /* ── Headline ── */
        .hero-h1 {
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        /* Top line — light weight, cream */
        .hero-h1-top {
          font-family: var(--font-cormorant);
          font-size: clamp(3rem, 6.5vw, 6.5rem);
          font-weight: 300;
          color: #F5EFE4;
          line-height: 1.05;
          letter-spacing: -0.02em;
          display: block;
          text-shadow: 0 2px 32px rgba(0,0,0,0.5);
        }

        /* Bottom line — italic, gold */
        .hero-h1-btm {
          font-family: var(--font-cormorant);
          font-size: clamp(3rem, 6.5vw, 6.5rem);
          font-weight: 400;
          font-style: italic;
          color: #B8821E;
          line-height: 1.05;
          letter-spacing: -0.02em;
          display: block;
          text-shadow: 0 2px 32px rgba(0,0,0,0.4);
        }

        /* Tagline */
        .hero-tagline {
          font-family: var(--font-lora);
          font-size: 0.82rem;
          color: rgba(245,239,228,0.55);
          letter-spacing: 0.18em;
          margin: 0 0 2.75rem;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn-gold {
          font-family: var(--font-jost);
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #0D0602;
          background: #B8821E;
          padding: 0.95rem 2.5rem;
          text-decoration: none;
          display: inline-flex; align-items: center;
          transition: background 0.18s, transform 0.18s;
          white-space: nowrap;
        }
        .hero-btn-gold:hover {
          background: #D4A040;
          transform: translateY(-2px);
        }

        .hero-btn-outline {
          font-family: var(--font-jost);
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(245,239,228,0.7);
          background: transparent;
          border: 1px solid rgba(245,239,228,0.25);
          padding: 0.95rem 2.5rem;
          text-decoration: none;
          display: inline-flex; align-items: center;
          transition: border-color 0.18s, color 0.18s;
          white-space: nowrap;
          backdrop-filter: blur(4px);
        }
        .hero-btn-outline:hover {
          border-color: rgba(245,239,228,0.55);
          color: #F5EFE4;
        }

        /* ── Slide nav — bottom centre ── */
        .hero-nav {
          position: absolute;
          bottom: 2.25rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-pip {
          width: 20px; height: 2px;
          border: none; padding: 0; cursor: pointer;
          background: rgba(245,239,228,0.18);
          transition: background 0.3s, width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-pip.active {
          width: 44px;
          background: #B8821E;
        }
        .hero-pip:hover:not(.active) {
          background: rgba(245,239,228,0.38);
        }

        /* ── Scroll cue — bottom right ── */
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          right: clamp(2rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-scroll-mouse {
          display: block;
          width: 20px; height: 32px;
          border: 1px solid rgba(245,239,228,0.2);
          border-radius: 10px;
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }
        .hero-scroll-wheel {
          display: block;
          width: 2px; height: 6px;
          background: rgba(184,130,30,0.7);
          border-radius: 1px;
          animation: heroScrollWheel 2s ease-in-out infinite;
        }
        @keyframes heroScrollWheel {
          0%   { opacity: 1; transform: translateY(0); }
          60%  { opacity: 0; transform: translateY(8px); }
          61%  { opacity: 0; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-scroll-label {
          font-family: var(--font-jost);
          font-size: 0.46rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,239,228,0.22);
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-root { height: auto; min-height: 100svh; }
          .hero-stage { justify-content: center; padding: 2rem var(--px); }
          .hero-scroll { display: none; }
          .hero-h1-top,
          .hero-h1-btm { font-size: clamp(2.4rem, 9vw, 3.2rem); }
        }
      `}</style>
    </section>
  )
}
