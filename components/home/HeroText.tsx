'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } },
  item: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
}

export default function HeroText() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])

  return (
    <section className="ht-root" aria-label="Hero">
      {/* Layered warmth — no geometric patterns */}
      <div className="ht-texture"   aria-hidden="true" />
      <div className="ht-vignette"  aria-hidden="true" />
      <div className="ht-glow-bot"  aria-hidden="true" />
      <div className="ht-glow-top"  aria-hidden="true" />

      <div className="ht-container">
        <motion.div className="ht-content" variants={stagger.container} initial="initial" animate={ready ? 'animate' : 'initial'}>

          <motion.div className="ht-eyebrow" variants={stagger.item}>
            <span className="ht-line" />
            <span className="ht-eyebrow-text">Newton, South Australia</span>
            <span className="ht-line" />
          </motion.div>

          <motion.h1 className="ht-h1" variants={stagger.item}>
            <span className="ht-h1-light">Where Every Moment</span>
            <em className="ht-h1-italic">Becomes a Memory</em>
          </motion.h1>

          <motion.div className="ht-tags" variants={stagger.item}>
            {['Dining', 'Entertainment', 'Events', 'Community'].map((t, i, arr) => (
              <span key={t} className="ht-tag-group">
                <span className="ht-tag">{t}</span>
                {i < arr.length - 1 && <span className="ht-dot" aria-hidden="true" />}
              </span>
            ))}
          </motion.div>

          <motion.div className="ht-rule" variants={stagger.item} aria-hidden="true" />

          <motion.p className="ht-sub" variants={stagger.item}>
            A destination for dining, drinks, entertainment<br />and connection, all under one roof in Newton, South Australia.
          </motion.p>

          <motion.div className="ht-ctas" variants={stagger.item}>
            <Link href="/booking" className="ht-btn-primary">Book Hotel</Link>
            <Link href="/order"   className="ht-btn-ghost">Order Food</Link>
            <Link href="/#venues" className="ht-btn-link">Explore Venues</Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .ht-root {
          position: relative;
          background: #100804;
          overflow: hidden;
          padding: clamp(6rem, 10vw, 9rem) var(--px) clamp(5rem, 9vw, 8rem);
        }

        /*
          Noise texture — mimics paper/linen grain seen in luxury print collateral.
          High baseFrequency = finer grain. opacity kept low so it reads as
          texture, not pattern.
        */
        .ht-texture {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          opacity: 0.055;
          mix-blend-mode: overlay;
        }

        /*
          Radial vignette — edges darker than centre, classic photographic look.
          This is what separates "luxury print" from "flat digital".
        */
        .ht-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: radial-gradient(
            ellipse 110% 110% at 50% 50%,
            transparent 30%,
            rgba(6,2,0,0.35) 65%,
            rgba(4,1,0,0.65) 100%
          );
        }

        /*
          Warm amber glow from bottom centre — like candlelight or a hearth below frame.
          The hue is brownish-gold, not yellow, so it reads as warmth not neon.
        */
        .ht-glow-bot {
          position: absolute; bottom: -10%; left: 50%; transform: translateX(-50%);
          width: 70%; height: 60%;
          pointer-events: none; z-index: 2;
          background: radial-gradient(
            ellipse at 50% 100%,
            rgba(160,100,20,0.18) 0%,
            rgba(100,55,8,0.10) 40%,
            transparent 70%
          );
        }

        /*
          Subtle warm blush at top — stops the top edge feeling like a void.
          Very faint, just enough to add depth.
        */
        .ht-glow-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 40%; pointer-events: none; z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(80,40,5,0.12) 0%,
            transparent 100%
          );
        }

        .ht-container { position: relative; max-width: var(--max-w); margin: 0 auto; z-index: 10; }
        .ht-content { display: flex; flex-direction: column; align-items: center; text-align: center; }

        .ht-eyebrow { display: flex; align-items: center; gap: 1rem; margin-bottom: clamp(2rem, 3vw, 2.75rem); }
        .ht-line { display: block; width: 32px; height: 1px; background: rgba(200,169,110,0.4); flex-shrink: 0; }
        .ht-eyebrow-text {
          font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(200,169,110,0.75); white-space: nowrap;
        }

        .ht-h1 { margin: 0 0 clamp(1.25rem, 2.5vw, 1.75rem); display: flex; flex-direction: column; align-items: center; gap: 0.04em; }
        .ht-h1-light, .ht-h1-italic {
          font-family: var(--font-cormorant);
          font-size: clamp(3rem, 5.5vw, 5.5rem);
          line-height: 1.04; letter-spacing: -0.02em; display: block;
        }
        .ht-h1-light  { font-weight: 300; color: #EAE0D0; }
        .ht-h1-italic { font-weight: 400; font-style: italic; color: #C8A96E; }

        .ht-tags { display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap; margin-bottom: clamp(1.5rem, 2.5vw, 2rem); }
        .ht-tag-group { display: flex; align-items: center; gap: 0.75rem; }
        .ht-tag { font-family: var(--font-jost); font-size: 0.52rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(234,224,208,0.38); }
        .ht-dot { display: block; width: 3px; height: 3px; background: rgba(200,169,110,0.35); transform: rotate(45deg); flex-shrink: 0; margin-right: 0.75rem; }

        .ht-rule { width: 44px; height: 1px; background: rgba(200,169,110,0.28); margin-bottom: clamp(1.5rem, 2.5vw, 2rem); }

        .ht-sub {
          font-family: var(--font-lora); font-size: clamp(.82rem,1.5vw,.9rem);
          color: rgba(234,224,208,0.48); line-height: 1.95; max-width: 440px;
          margin: 0 0 clamp(2.25rem, 3.5vw, 3rem);
        }

        .ht-ctas { display: flex; align-items: center; justify-content: center; gap: 0.875rem; flex-wrap: wrap; }
        .ht-btn-primary {
          font-family: var(--font-jost); font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #140A02; background: #C8A96E; padding: 0.9rem 2.25rem;
          text-decoration: none; display: inline-flex; align-items: center;
          transition: background 0.2s, transform 0.2s; white-space: nowrap;
        }
        .ht-btn-primary:hover { background: #D4B070; transform: translateY(-2px); }
        .ht-btn-ghost {
          font-family: var(--font-jost); font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(234,224,208,0.55); background: transparent;
          border: 1px solid rgba(234,224,208,0.14); padding: 0.9rem 2.25rem;
          text-decoration: none; display: inline-flex; align-items: center;
          transition: border-color 0.2s, color 0.2s; white-space: nowrap;
        }
        .ht-btn-ghost:hover { border-color: rgba(234,224,208,0.32); color: #EAE0D0; }
        .ht-btn-link {
          font-family: var(--font-jost); font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(200,169,110,0.65); text-decoration: none;
          padding-bottom: 2px; border-bottom: 1px solid rgba(200,169,110,0.22);
          transition: color 0.2s, border-color 0.2s; white-space: nowrap;
        }
        .ht-btn-link:hover { color: #C8A96E; border-color: rgba(200,169,110,0.5); }

        @media (max-width: 640px) {
          .ht-ctas { flex-direction: column; align-items: center; width: 100%; }
          .ht-btn-primary, .ht-btn-ghost { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
