'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import {
  ArrowRight, ArrowLeft, Gift, BedDouble, ShoppingBag,
  ExternalLink, Calendar, Clock, MapPin, Users,
  Instagram, Facebook, Phone, Mail, Sparkles, CheckCircle2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { reviews } from '@/data/reviews'

/* ─────────────────────────────────────────────────────────
   COLOR TOKENS
   ───────────────────────────────────────────────────────── */
const C = {
  L1: '#FBF8F3', L2: '#F3EBE0', L3: '#EAE0D2',
  D1: '#120700', D2: '#2E1A07', D5: '#2A1A0A', D6: '#201209',
  TILE: '#271606', TILEH: '#32200A',
  G: '#C8973F', G2: '#A67C30',
  TL: '#1C0E02', TM: '#6B4520', TMU: '#956535',
  TD: '#F5EEE3',
  TDM: 'rgba(245,238,227,0.55)',
  TDS: 'rgba(245,238,227,0.35)',
  BL: 'rgba(140,90,30,0.14)',
  BD: 'rgba(200,151,63,0.13)',
}

/* ─────────────────────────────────────────────────────────
   SLIDES — using CDN URLs directly (no local files needed)
   ───────────────────────────────────────────────────────── */
const SLIDES = [
  { src: '/img/image1.png',  label: 'The Venue' },
  { src: '/img/image2.png',  label: 'Z-Bar & Restaurant' },
  { src: '/img/image3.png',  label: 'Cafe + Play' },
  { src: '/img/image4.png',  label: 'Sports Bar' },
  { src: '/img/image5.png',  label: 'Beer Garden' },
  { src: '/img/image6.png',  label: 'Functions & Events' },
  { src: '/img/image7.png',  label: 'Hotel' },
  { src: '/img/image8.jpg',  label: 'Fine Dining' },
  { src: '/img/image9.jpg',  label: 'Cocktails' },
  { src: '/img/image10.jpg', label: 'Brunch' },
  { src: '/img/image11.jpg', label: 'Gaming Lounge' },
]

const FOOD  = 'https://cdn.rezz.com.au/wp-content/uploads/2026/03/Rezz-Food-Menu-Feb-2026.pdf'
const BFAST = 'https://cdn.rezz.com.au/wp-content/uploads/2025/10/Rezz-Breakfast-Menu-2025-Oct-2025.pdf'

const VENUES = [
  { id:'cafe',      num:'01', tag:'Family Friendly',       sub:'Providore · Pizza · Churro',       name:'Cafe + Play',              desc:"A family favourite with three children's play areas, terraces and lawns. Open 7 days from 8:00am — breakfast, lunch and dinner.",                    hours:[{l:'Daily',t:'From 8:00am'}],                                                   links:[{lb:'Food Menu',href:FOOD},{lb:'Breakfast Menu',href:BFAST}], cta:null, note:null, meta:null, span:2 },
  { id:'zbar',      num:'02', tag:'Modern Mediterranean',  sub:null,                               name:'Z-Bar & Restaurant',        desc:'City vibes in the suburbs. A modern Mediterranean menu matched with a curated wine and beverage list. Open 11:30am till late, 7 days.',              hours:[{l:'7 Days',t:'11:30am till late'}],                                             links:[{lb:'Food Menu',href:FOOD}],                                   cta:null, note:null, meta:null, span:1 },
  { id:'sports',    num:'03', tag:'16 Beers · 4 Wines',    sub:'TAB · Lotteries',                  name:'Sports Bar & Beer Garden',  desc:'Sixteen beers on tap, four wines on tap, ciders and large screen TVs for every match.',                                                              hours:[{l:'Mon–Thu',t:'8am–2am'},{l:'Fri–Sat',t:'till 3am'}],                          links:[],                                                             cta:{lb:'Order & Pick Up',href:'/order'}, note:null, meta:null, span:1 },
  { id:'liquor',    num:'04', tag:'Wine · Spirits · Beer', sub:null,                               name:'Liquor Store',               desc:'An extensive range of wine, spirits and local and imported beer. Our friendly staff are happy to help with your selections.',                          hours:[{l:'Mon–Sat',t:'9am–9pm'},{l:'Sun',t:'10am–8pm'}],                              links:[],                                                             cta:null, note:null, meta:[{ic:'map',v:'243 Gorge Rd, Newton SA',h:'https://maps.google.com/?q=243+Gorge+Road+Newton+SA'},{ic:'phone',v:'(08) 8337 2888',h:'tel:0883372888'}], span:1 },
  { id:'gaming',    num:'05', tag:'40 Machines',            sub:null,                               name:'Gaming Lounge',              desc:'A spacious Gaming Lounge with 40 machines including the latest games and old favourites. Private parking, ATM and refreshments on site.',             hours:[{l:'Mon–Thu',t:'8am–2am'},{l:'Fri',t:'8am–3am'},{l:'Sat',t:'9am–3am'},{l:'Sun',t:'9am–12am'}], links:[], cta:null, note:'Gamble Responsibly. Helpline 1800 858 858', meta:null, span:1 },
  { id:'pods',      num:'06', tag:'Daily or Hourly',        sub:'Tea Packages Available',           name:'Business Pods',              desc:'A convenient spot to meet clients face to face. Available daily or hourly with wireless connectivity, TV screens and remote printing.',                hours:[{l:'Available',t:'Daily or hourly'}],                                            links:[],                                                             cta:{lb:'Check Availability',href:'/booking'}, note:null, meta:null, span:1 },
  { id:'functions', num:'07', tag:'Tailored to You',        sub:null,                               name:'Functions & Events',         desc:'From business seminars to 18th birthdays and everything in between. Every function arranged through personal consultation.',                           hours:[{l:'Enquire',t:'By appointment'}],                                               links:[],                                                             cta:{lb:'Make an Enquiry',href:'/functions'}, note:null, meta:[{ic:'phone',v:'08 8337 2888',h:'tel:0883372888'},{ic:'mail',v:'enquiries@rezz.com.au',h:'mailto:enquiries@rezz.com.au'}], span:2 },
]

const EVENT_META = [
  { Icon: Calendar, label: 'Date',  value: 'Thursday, 14 May 2026' },
  { Icon: Clock,    label: 'Time',  value: '6:00 PM' },
  { Icon: Users,    label: 'Seats', value: 'Limited Availability' },
  { Icon: MapPin,   label: 'Venue', value: 'Rezz Hotel, Newton SA' },
]

const HERO_STATS = [
  { num: '7',   label: 'Distinct Venues' },
  { num: '16',  label: 'Beers On Tap' },
  { num: '40',  label: 'Gaming Machines' },
  { num: '20+', label: 'Years in Newton' },
]

/* ─────────────────────────────────────────────────────────
   SHARED
   ───────────────────────────────────────────────────────── */
function Eyebrow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className={`rz-ey${dark ? ' dark' : ''}`}>
      <span className="rz-ey-bar" />
      {text}
    </div>
  )
}

/* Slide image — plain <img> with onError fallback, works with any URL */
function SlideImg({ src, label }: { src: string; label: string }) {
  const [err, setErr] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (err) {
    return (
      <div className="slide-ph">
        <span className="slide-ph-dot" />
        <span className="slide-ph-label">{label}</span>
      </div>
    )
  }
  return (
    <>
      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, #1A0A02 25%, #2E1A07 50%, #1A0A02 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label}
        onError={() => setErr(true)}
        onLoad={() => setLoaded(true)}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'opacity .4s ease', opacity: loaded ? 1 : 0 }} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   1. HERO  bg:#120700
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])
  const item = { hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.16,1,0.3,1] as const}} }
  return (
    <section className="hero">
      <div className="hero-deco-circle c1" aria-hidden="true" />
      <div className="hero-deco-circle c2" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <motion.div className="hero-body"
        initial="hidden" animate={ready ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren:0.1, delayChildren:0.05 } } }}>

        <motion.div variants={item} className="hero-ew">
          <span className="hero-ew-line" /><span className="hero-ew-text">Newton, South Australia</span><span className="hero-ew-line" />
        </motion.div>

        <motion.h1 variants={item} className="hero-h1">
          <span className="hero-h1-w">Where Every Moment</span>
          <em className="hero-h1-g">Becomes a Memory</em>
        </motion.h1>

        <motion.div variants={item} className="hero-rule" aria-hidden="true" />

        <motion.p variants={item} className="hero-sub">
          A destination for dining, drinks, entertainment<br className="hero-br" />{' '}and connection, all under one roof in Newton, South Australia.
        </motion.p>

        <motion.div variants={item} className="hero-ctas">
          <Link href="/booking" className="hero-btn-primary">Book Hotel</Link>
          <Link href="/order" className="hero-btn-ghost">Order Food</Link>
          <Link href="/#venues" className="hero-btn-link">Explore Venues</Link>
        </motion.div>
      </motion.div>

      <motion.div className="hero-stats"
        initial={{ opacity:0, y:10 }}
        animate={ready ? {opacity:1,y:0} : {}}
        transition={{ delay:0.8, duration:0.6 }}>
        {HERO_STATS.map(({ num, label }, i) => (
          <div key={label} className={`hero-stat${i===HERO_STATS.length-1?' last':''}`}>
            <span className="hero-stat-n">{num}</span>
            <span className="hero-stat-l">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   2. GALLERY  bg:#FBF8F3
   ═══════════════════════════════════════════════════════════ */
function Gallery() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const [fading, setFading] = useState(false)
  const DUR = 4500
  const go = useCallback((i: number) => { setFading(true); setTimeout(() => { setCur(i); setFading(false) }, 300) }, [])
  const next = useCallback(() => go((cur+1) % SLIDES.length), [cur, go])
  const prev = useCallback(() => go((cur-1+SLIDES.length) % SLIDES.length), [cur, go])
  useEffect(() => { if (paused) return; const id = setInterval(next, DUR); return () => clearInterval(id) }, [paused, next])

  return (
    <section className="gal">
      <div className="gal-inner">
        <Eyebrow text="Inside Rezz" />
        <h2 className="gal-title">A Glimpse of <em>Our Spaces</em></h2>
        <div className="gal-frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="gal-track" style={{ opacity: fading ? 0 : 1 }}>
            <SlideImg src={SLIDES[cur].src} label={SLIDES[cur].label} />
            <div className="gal-shade" aria-hidden="true" />
          </div>
          {/* progress bar */}
          <div className="gal-prog" aria-hidden="true">
            <div key={`${cur}-${paused}`} className="gal-prog-fill"
              style={{ animationDuration:`${DUR}ms`, animationPlayState: paused?'paused':'running' }} />
          </div>
          {/* bottom bar */}
          <div className="gal-bar">
            <span key={cur} className="gal-lbl">{SLIDES[cur].label}</span>
            <div className="gal-dots" role="tablist">
              {SLIDES.map((s, i) => (
                <button key={i} role="tab" aria-selected={i===cur} aria-label={s.label}
                  onClick={() => go(i)} className={`gal-pip${i===cur?' on':''}`} />
              ))}
            </div>
            <div className="gal-ctrl">
              <span className="gal-cnt">{String(cur+1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}</span>
              <button onClick={prev} aria-label="Previous" className="gal-arr"><ArrowLeft size={13} strokeWidth={1.5} /></button>
              <button onClick={next} aria-label="Next" className="gal-arr"><ArrowRight size={13} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   3. EVENTS  bg:#2E1A07
   ═══════════════════════════════════════════════════════════ */
function EventSection() {
  return (
    <section className="ev">
      <div className="ev-glow" aria-hidden="true" />
      <div className="ev-layout">
        <div className="ev-left">
          <Eyebrow text="Upcoming Event" dark />
          <h2 className="ev-h2">A Post-Harvest Evening:<em> Food, Wine &amp; Stories</em></h2>
          <p className="ev-body">Join us for an intimate evening celebrating the harvest season with Paracombe Wines. A curated menu paired with exceptional Adelaide Hills vintages, as winemakers share the stories behind every bottle.</p>
          <a href="https://tastingaustralia.com.au/products/events/2026/a-post-harvest-evening-food-wine-and-stories-with-paracombe-and-rezz"
            target="_blank" rel="noopener noreferrer" className="ev-cta">
            Reserve Your Seat <ExternalLink size={11} />
          </a>
        </div>
        <div className="ev-right">
          <div className="ev-card">
            <p className="ev-card-ey">Event Details</p>
            {EVENT_META.map(({ Icon, label, value }, i) => (
              <div key={label} className={`ev-row${i===EVENT_META.length-1?' last':''}`}>
                <div className="ev-row-icon"><Icon size={10} /></div>
                <span className="ev-row-lbl">{label}</span>
                <span className="ev-row-val">{value}</span>
              </div>
            ))}
          </div>
          <div className="ev-partner">
            <span className="ev-p-pre">In partnership with</span>
            <span className="ev-p-name">Paracombe Wines</span>
            <span className="ev-p-loc">Adelaide Hills, South Australia</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   4. VENUES  bg:#F3EBE0 header / dark tiles
   ═══════════════════════════════════════════════════════════ */
function VenuesSection() {
  const [hov, setHov] = useState<string|null>(null)
  return (
    <section id="venues" className="vc">
      <div className="vc-head">
        <div>
          <Eyebrow text="Our Venues" />
          <h2 className="vc-title">Something for<br /><em>Everyone</em></h2>
        </div>
        <p className="vc-sub">Seven distinct spaces under one roof.<br />Whatever brings you here, Rezz has a place for you.</p>
      </div>
      <div className="vc-grid">
        {VENUES.map(v => {
          const active = hov === v.id
          return (
            <div key={v.id} className={`vc-tile${v.span===2?' s2':''}`}
              style={{ background: active ? C.TILEH : C.TILE }}
              onMouseEnter={() => setHov(v.id)} onMouseLeave={() => setHov(null)}>
              <div className="vc-accent" style={{ opacity: active ? 1 : 0 }} />
              <div className="vc-top">
                <span className="vc-num">{v.num}</span>
                <div className="vc-tags">
                  <span className="vc-tag">{v.tag}</span>
                  {v.sub && <span className="vc-tag-sub">{v.sub}</span>}
                </div>
              </div>
              <h3 className="vc-name" style={{ color: active ? C.G : '#F0E8DA' }}>{v.name}</h3>
              <p className="vc-desc">{v.desc}</p>
              <div className="vc-hours">
                {v.hours.map(({ l, t }) => (
                  <div key={l} className="vc-hr"><span className="vc-hl">{l}</span><span className="vc-ht">{t}</span></div>
                ))}
              </div>
              {v.note && <p className="vc-note">{v.note}</p>}
              {v.meta && (
                <div className="vc-meta">
                  {v.meta.map(({ ic, v: val, h }) => (
                    <a key={val} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="vc-meta-row">
                      {ic==='map' ? <MapPin size={10} /> : ic==='phone' ? <Phone size={10} /> : <Mail size={10} />}
                      <span>{val}</span>
                    </a>
                  ))}
                </div>
              )}
              <div className="vc-actions">
                {v.links.map(lk => (
                  <a key={lk.lb} href={lk.href} target="_blank" rel="noopener noreferrer" className="vc-link">
                    {lk.lb} <ExternalLink size={9} />
                  </a>
                ))}
                {v.cta && <Link href={v.cta.href} className="vc-cta">{v.cta.lb} <ArrowRight size={11} /></Link>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. CTA STRIPS  bg:#F3EBE0
   ═══════════════════════════════════════════════════════════ */
function CtaStrips() {
  return (
    <div className="cs">
      {/* Top two CTA cards */}
      <div className="cs-cards">
        <div className="cs-card">
          <div className="cs-card-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 9h18M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M9 21V9"/></svg></div>
          <div className="cs-card-body">
            <p className="cs-card-ey">Dine With Us</p>
            <h3 className="cs-card-h">We look forward to seeing you</h3>
            <p className="cs-card-p">Make a reservation for your next visit to Rezz.</p>
          </div>
          <Link href="/booking" className="cs-card-btn">Book Today <ArrowRight size={12} /></Link>
        </div>
        <div className="cs-card-div" />
        <div className="cs-card">
          <div className="cs-card-icon"><Gift size={20} strokeWidth={1.3} /></div>
          <div className="cs-card-body">
            <p className="cs-card-ey">Gift Someone Special</p>
            <h3 className="cs-card-h">Rezz e-Vouchers</h3>
            <p className="cs-card-p">The perfect gift for any occasion. Purchase online instantly.</p>
          </div>
          <a href="https://rezz.com.au/vouchers" target="_blank" rel="noopener noreferrer" className="cs-card-btn">Purchase Here <ArrowRight size={12} /></a>
        </div>
      </div>

      {/* Bottom quick links */}
      <div className="cs-quick">
        <Link href="/booking" className="cs-qi-item">
          <div className="cs-qi-icon"><BedDouble size={20} strokeWidth={1.3} /></div>
          <div className="cs-qt">
            <span className="cs-qm">Reserve Your Stay</span>
            <span className="cs-qn">Book Hotel</span>
          </div>
          <ArrowRight size={14} className="cs-qa" />
        </Link>
        <div className="cs-qs" />
        <Link href="/order" className="cs-qi-item">
          <div className="cs-qi-icon filled"><ShoppingBag size={20} strokeWidth={1.3} /></div>
          <div className="cs-qt">
            <span className="cs-qm">From Our Kitchen</span>
            <span className="cs-qn">Order Food</span>
          </div>
          <ArrowRight size={14} className="cs-qa" />
        </Link>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   6. REVIEWS  bg:#FBF8F3
   ═══════════════════════════════════════════════════════════ */
function Reviews() {
  const doubled = [...reviews, ...reviews]
  const Star = () => <svg width="10" height="10" viewBox="0 0 24 24" fill={C.G}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  return (
    <section className="gr">
      <div className="gr-hd">
        <div>
          <Eyebrow text="Guest Reviews" />
          <h2 className="gr-title">What Our Guests<em> Are Saying</em></h2>
        </div>
        <div className="gr-score-wrap">
          <span className="gr-score">4.5</span>
          <div><span className="gr-stars">{[0,1,2,3,4].map(i=><Star key={i}/>)}</span><span className="gr-src">Google Reviews</span></div>
        </div>
      </div>
      <div className="gr-mq-wrap">
        <div className="gr-fade l" /><div className="gr-fade r" />
        <div className="marquee-track gr-track">
          {doubled.map((r, i) => (
            <article key={`${r.name}-${i}`} className="gr-card">
              <span className="gr-stars">{[0,1,2,3,4].map(j=><Star key={j}/>)}</span>
              <blockquote className="gr-q">&ldquo;{r.text}&rdquo;</blockquote>
              <footer className="gr-ft">
                <div className="gr-av">{r.name.charAt(0)}</div>
                <div><p className="gr-nm">{r.name}</p><p className="gr-dt">{r.date}</p></div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   7. SOCIAL  bg:#2A1A0A
   ═══════════════════════════════════════════════════════════ */
function Social() {
  const socials = [
    { platform:'Instagram', handle:'@rezznewton',    desc:'Behind-the-scenes, events and daily specials', href:'https://www.instagram.com/rezznewton/',    Icon:Instagram },
    { platform:'Facebook',  handle:'Rezz Newton SA', desc:'News, updates and community highlights',       href:'https://web.facebook.com/REZZNEWTONSA/',   Icon:Facebook  },
  ]
  return (
    <section className="sf">
      <div className="sf-inner">
        <div className="sf-left">
          <Eyebrow text="Follow Rezz" dark />
          <h2 className="sf-h2">Stay Up <em>to Date</em></h2>
          <p className="sf-p">Stay up to date on all the latest news, events and special offers from Rezz.</p>
        </div>
        <div className="sf-cards">
          {socials.map(({ platform, handle, desc, href, Icon }, i) => (
            <a key={platform} href={href} target="_blank" rel="noopener noreferrer"
              className={`sf-card${i<socials.length-1?' bd':''}`}>
              <div className="sf-card-l">
                <div className="sf-icon"><Icon size={16} /></div>
                <div>
                  <p className="sf-plat">{platform}</p>
                  <p className="sf-handle">{handle}</p>
                  <p className="sf-desc">{desc}</p>
                </div>
              </div>
              <ArrowRight size={14} className="sf-arr" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   8. ENQUIRY  bg:#EAE0D2
   ═══════════════════════════════════════════════════════════ */
function Enquiry() {
  const [done, setDone] = useState(false)
  const schema = z.object({ name:z.string().min(2), phone:z.string().optional(), email:z.string().email(), service:z.string().optional(), message:z.string().min(10) })
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<any>({ resolver: zodResolver(schema) })
  const onSubmit = (_:any) => new Promise<void>(r => setTimeout(() => { setDone(true); r() }, 800))
  const services = ['Restaurant Booking','Functions & Events','Business Pods','Order & Pick Up','Careers','General Enquiry']
  const contacts = [
    { Icon:Phone,  l:'Phone',   v:'(08) 8337 2888',               h:'tel:0883372888' },
    { Icon:Mail,   l:'Email',   v:'info@rezz.com.au',              h:'mailto:info@rezz.com.au' },
    { Icon:MapPin, l:'Address', v:'20 Hamilton Tce, Newton SA 5074', h:null },
  ]
  return (
    <section className="eq">
      <div className="eq-side">
        <div className="eq-layout">
          <div className="eq-side-top">
            <Eyebrow text="Get in Touch" />
            <h2 className="eq-h2">Have an <em>Enquiry?</em></h2>
            <p className="eq-p">We&apos;d love to hear from you. Fill in the form and our team will be in touch shortly.</p>
            <div className="eq-contacts">
              {contacts.map(({ Icon, l, v, h }) => (
                <div key={l} className="eq-contact">
                  <div className="eq-ci"><Icon size={12} /></div>
                  <div>
                    <p className="eq-cl">{l}</p>
                    {h ? <a href={h} className="eq-cv lnk">{v}</a> : <p className="eq-cv">{v}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="eq-form-wrap">
            {done ? (
              <div className="eq-done">
                <div className="eq-done-ic"><CheckCircle2 size={26} /></div>
                <p className="eq-done-h">Message Sent</p>
                <p className="eq-done-p">Thanks for reaching out. Our team will be in touch shortly.</p>
                <button onClick={() => setDone(false)} className="eq-again">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="eq-form">
                <div className="eq-r2">
                  <div className="eq-f"><label className="eq-lbl">Full Name</label><input {...register('name')} type="text" placeholder="First and last name" className={`eq-inp${errors.name?' err':''}`} /></div>
                  <div className="eq-f"><label className="eq-lbl">Phone <span className="eq-opt">(optional)</span></label><input {...register('phone')} type="tel" placeholder="Phone number" className="eq-inp" /></div>
                </div>
                <div className="eq-r2">
                  <div className="eq-f"><label className="eq-lbl">Email Address</label><input {...register('email')} type="email" placeholder="your@email.com" className={`eq-inp${errors.email?' err':''}`} /></div>
                  <div className="eq-f">
                    <label className="eq-lbl">Enquiry Type <span className="eq-opt">(optional)</span></label>
                    <select {...register('service')} className="eq-inp"><option value="">Select...</option>{services.map(s=><option key={s} value={s}>{s}</option>)}</select>
                  </div>
                </div>
                <div className="eq-f"><label className="eq-lbl">Message</label><textarea {...register('message')} rows={5} placeholder="Tell us how we can help" className={`eq-inp ta${errors.message?' err':''}`} /></div>
                <button type="submit" disabled={isSubmitting} className="eq-sub">{isSubmitting?'Sending…':'Submit Enquiry'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   9. NEWSLETTER  bg:#201209
   ═══════════════════════════════════════════════════════════ */
function Newsletter() {
  const [done, setDone] = useState(false)
  const schema = z.object({ name:z.string().min(2), email:z.string().email() })
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<any>({ resolver: zodResolver(schema) })
  const onSubmit = (_:any) => new Promise<void>(r => setTimeout(() => { setDone(true); r() }, 800))
  const perks = ['First access to new events', 'Exclusive member offers', 'Monthly specials & menus']
  return (
    <section className="nl">
      <div className="nl-glow" aria-hidden="true" />
      <div className="nl-inner">
        <div className="nl-left">
          <Eyebrow text="Stay Connected" dark />
          <h2 className="nl-h2">Stay in <em>the Loop</em></h2>
          <p className="nl-p">Be the first to hear about events, special offers and what&apos;s on at Rezz. No spam, ever.</p>
          <ul className="nl-perks">
            {perks.map(p => <li key={p} className="nl-perk"><Sparkles size={9} className="nl-pi" />{p}</li>)}
          </ul>
        </div>
        <div className="nl-right">
          {done ? (
            <div className="nl-done">
              <div className="nl-done-ic"><CheckCircle2 size={24} /></div>
              <p className="nl-done-h">You&apos;re on the list!</p>
              <p className="nl-done-p">We&apos;ll be in touch soon with the latest from Rezz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="nl-form">
              <div className="nl-r2">
                <div className="nl-f">
                  <label htmlFor="nl-name" className="nl-lbl">Your Name</label>
                  <input id="nl-name" {...register('name')} type="text" placeholder="First name" className={`nl-inp${errors.name?' err':''}`} />
                </div>
                <div className="nl-f">
                  <label htmlFor="nl-email" className="nl-lbl">Email Address</label>
                  <input id="nl-email" {...register('email')} type="email" placeholder="your@email.com" className={`nl-inp${errors.email?' err':''}`} />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="nl-sub">{isSubmitting?'Subscribing…':'Subscribe Now'}</button>
              <p className="nl-disc">By subscribing you agree to receive news and offers from Rezz Hotel. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Gallery />
      <EventSection />
      <CtaStrips />
      <VenuesSection />
      <Reviews />
      <Social />
      <Enquiry />
      <Newsletter />

      <style>{`
/* ══════════════════════════════════════════
   BASE
══════════════════════════════════════════ */
*,*::before,*::after{box-sizing:border-box}

/* ══════════════════════════════════════════
   EYEBROW
══════════════════════════════════════════ */
.rz-ey{display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;font-family:var(--font-jost);font-size:.52rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:${C.G2}}
.rz-ey.dark{color:rgba(200,151,63,.72)}
.rz-ey-bar{width:24px;height:1px;background:${C.G2};flex-shrink:0}
.rz-ey.dark .rz-ey-bar{background:rgba(200,151,63,.45)}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
.hero{background:#120700;position:relative;overflow:hidden;min-height:100svh;display:flex;flex-direction:column}
.hero-deco-circle{position:absolute;border-radius:50%;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%)}
.hero-deco-circle.c1{width:min(90vw,700px);height:min(90vw,700px);border:1px solid rgba(200,151,63,.06)}
.hero-deco-circle.c2{width:min(65vw,500px);height:min(65vw,500px);border:1px solid rgba(200,151,63,.04)}
.hero-glow{position:absolute;bottom:-5%;left:50%;transform:translateX(-50%);width:70%;height:55%;background:radial-gradient(ellipse at 50% 100%,rgba(200,151,63,.1),transparent 70%);pointer-events:none}
.hero-corner{position:absolute;width:52px;height:52px;pointer-events:none}
.hero-corner.tl{top:clamp(2rem,4vw,3.5rem);left:clamp(1.5rem,7vw,7rem);border-top:1px solid rgba(200,151,63,.3);border-left:1px solid rgba(200,151,63,.3)}
.hero-corner.br{bottom:clamp(2rem,4vw,3.5rem);right:clamp(1.5rem,7vw,7rem);border-bottom:1px solid rgba(200,151,63,.3);border-right:1px solid rgba(200,151,63,.3)}
.hero-body{flex:1;max-width:var(--max-w);margin:0 auto;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:clamp(7rem,11vw,10rem) var(--px) clamp(3rem,5vw,5rem);position:relative;z-index:1}
.hero-ew{display:flex;align-items:center;gap:1rem;margin-bottom:clamp(2rem,3vw,2.75rem)}
.hero-ew-line{width:32px;height:1px;background:rgba(200,151,63,.4);flex-shrink:0}
.hero-ew-text{font-family:var(--font-jost);font-size:.52rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:rgba(200,151,63,.82);white-space:nowrap}
.hero-h1{margin:0 0 1.5rem;display:flex;flex-direction:column;align-items:center;gap:.04em}
.hero-h1-w{font-family:var(--font-cormorant);font-size:clamp(2.4rem,6vw,6.5rem);font-weight:300;color:#F5EEE3;line-height:1.02;letter-spacing:-.025em;display:block}
.hero-h1-g{font-family:var(--font-cormorant);font-size:clamp(2.4rem,6vw,6.5rem);font-weight:400;font-style:italic;color:${C.G};line-height:1.02;letter-spacing:-.025em;display:block}
.hero-rule{width:44px;height:1px;background:rgba(200,151,63,.32);margin-bottom:1.5rem}
.hero-sub{font-family:var(--font-lora);font-size:clamp(.88rem,1.5vw,.98rem);color:rgba(245,238,227,.5);line-height:2.1;letter-spacing:.025em;font-weight:400;max-width:580px;margin:0 0 clamp(2rem,3.5vw,3rem)}
.hero-br{display:block}
.hero-ctas{display:flex;align-items:center;justify-content:center;gap:.875rem;flex-wrap:wrap;margin-bottom:clamp(2.5rem,5vw,4.5rem)}
.hero-btn-primary{font-family:var(--font-jost);font-size:.63rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#120700;background:${C.G};padding:.95rem 2.5rem;text-decoration:none;display:inline-flex;align-items:center;transition:background .2s,transform .2s;white-space:nowrap}
.hero-btn-primary:hover{background:#DBA94A;transform:translateY(-2px)}
.hero-btn-ghost{font-family:var(--font-jost);font-size:.63rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,238,227,.65);background:transparent;border:1px solid rgba(245,238,227,.2);padding:.95rem 2.5rem;text-decoration:none;display:inline-flex;align-items:center;transition:all .2s;white-space:nowrap}
.hero-btn-ghost:hover{border-color:rgba(245,238,227,.45);color:#F5EEE3}
.hero-btn-link{font-family:var(--font-jost);font-size:.6rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(200,151,63,.72);text-decoration:none;padding-bottom:2px;border-bottom:1px solid rgba(200,151,63,.28);transition:all .2s;white-space:nowrap}
.hero-btn-link:hover{color:${C.G};border-bottom-color:rgba(200,151,63,.6)}
.hero-stats{position:relative;z-index:1;border-top:1px solid rgba(200,151,63,.12);display:grid;grid-template-columns:repeat(4,1fr);background:rgba(200,151,63,.04)}
.hero-stat{padding:1.375rem clamp(.75rem,2vw,2rem);display:flex;flex-direction:column;align-items:center;gap:.3rem;border-right:1px solid rgba(200,151,63,.1)}
.hero-stat.last{border-right:none}
.hero-stat-n{font-family:var(--font-cormorant);font-size:clamp(1.4rem,2.5vw,2.2rem);font-weight:300;color:${C.G};line-height:1}
.hero-stat-l{font-family:var(--font-jost);font-size:clamp(.36rem,.8vw,.5rem);font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,238,227,.38);text-align:center}

/* ══════════════════════════════════════════
   GALLERY
══════════════════════════════════════════ */
.gal{background:${C.L1};padding:var(--py) var(--px);border-top:1px solid transparent;border-image:linear-gradient(to right,transparent,rgba(160,110,30,.35) 25%,rgba(200,151,63,.55) 50%,rgba(160,110,30,.35) 75%,transparent) 1}
.gal-inner{max-width:var(--max-w);margin:0 auto}
.gal-title{font-family:var(--font-cormorant);font-size:clamp(1.8rem,4.5vw,4rem);font-weight:300;color:${C.TL};line-height:1.04;letter-spacing:-.02em;margin:0 0 clamp(1.25rem,3vw,2.5rem)}
.gal-title em{font-style:italic;font-weight:400;color:${C.G2}}
.gal-frame{position:relative;width:100%;aspect-ratio:16/7;min-height:240px;overflow:hidden;background:#180A02;box-shadow:0 12px 56px rgba(40,15,3,.18)}
.gal-track{position:absolute;inset:0;transition:opacity .3s ease}
.slide-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#1A0A02,#2E1A07);gap:.75rem}
.slide-ph-dot{width:32px;height:32px;border:1px solid rgba(200,151,63,.25);border-radius:50%}
.slide-ph-label{font-family:var(--font-jost);font-size:.6rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,151,63,.45)}
.gal-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to top,rgba(20,8,1,.82) 0%,rgba(20,8,1,.05) 35%,transparent 55%)}
.gal-prog{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(255,240,210,.05);z-index:10}
.gal-prog-fill{height:100%;width:0%;background:${C.G};animation:gfill linear forwards}
@keyframes gfill{from{width:0%}to{width:100%}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.gal-bar{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;z-index:10}
.gal-lbl{font-family:var(--font-jost);font-size:.5rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,238,227,.52);min-width:7rem;white-space:nowrap;animation:glbl .3s ease forwards;flex-shrink:0}
@keyframes glbl{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.gal-dots{display:flex;gap:4px;flex:1;justify-content:center}
.gal-pip{width:14px;height:2px;border:none;padding:0;cursor:pointer;background:rgba(245,238,227,.15);transition:all .35s;outline:none}
.gal-pip.on{width:32px;background:${C.G}}
.gal-ctrl{display:flex;align-items:center;gap:.5rem;flex-shrink:0}
.gal-cnt{font-family:var(--font-jost);font-size:.5rem;color:rgba(245,238,227,.2);margin-right:.2rem}
.gal-arr{width:32px;height:32px;border:1px solid rgba(245,238,227,.14);background:rgba(255,240,210,.04);color:rgba(245,238,227,.45);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.gal-arr:hover{border-color:rgba(200,151,63,.5);color:${C.G}}

/* ══════════════════════════════════════════
   EVENTS
══════════════════════════════════════════ */
.ev{background:linear-gradient(160deg,#3D1E06 0%,#2A1608 40%,#1A0C03 100%);position:relative;overflow:hidden;border-top:none}
.ev-glow{position:absolute;top:-20%;right:-5%;width:45%;height:80%;background:radial-gradient(ellipse at 75% 25%,rgba(200,151,63,.07),transparent 65%);pointer-events:none}
.ev-layout{display:grid;grid-template-columns:1fr 330px;gap:clamp(2.5rem,7vw,8rem);align-items:start;padding:var(--py) var(--px);position:relative;z-index:1}
.ev-h2{font-family:var(--font-cormorant);font-size:clamp(1.9rem,5vw,4.5rem);font-weight:300;color:${C.TD};line-height:1.04;letter-spacing:-.015em;margin:0 0 1.5rem}
.ev-h2 em{font-style:italic;font-weight:400;color:${C.G};display:block}
.ev-body{font-family:var(--font-lora);font-size:.95rem;color:${C.TDM};line-height:2.05;letter-spacing:.02em;max-width:460px;margin:0 0 2.25rem}
.ev-cta{font-family:var(--font-jost);font-size:.63rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.D2};background:${C.G};text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 2rem;transition:background .2s,transform .2s}
.ev-cta:hover{background:#DBA94A;transform:translateY(-2px)}
.ev-right{display:flex;flex-direction:column;gap:1.5rem}
.ev-card{background:rgba(255,220,160,.04);border:1px solid ${C.BD};padding:1.75rem}
.ev-card-ey{font-family:var(--font-jost);font-size:.5rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,151,63,.75);margin:0 0 1.25rem}
.ev-row{display:flex;align-items:center;padding:.6rem 0;border-bottom:1px solid ${C.BD}}
.ev-row.last{border-bottom:none;padding-bottom:0}
.ev-row-icon{width:24px;flex-shrink:0;color:rgba(200,151,63,.58);display:flex;align-items:center}
.ev-row-lbl{font-family:var(--font-jost);font-size:.48rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,151,63,.58);min-width:3rem;flex-shrink:0}
.ev-row-val{font-family:var(--font-lora);font-size:.85rem;color:rgba(245,238,227,.9);margin-left:.75rem}
.ev-partner{display:flex;flex-direction:column;gap:.2rem;padding-top:.75rem;border-top:1px solid ${C.BD}}
.ev-p-pre{font-family:var(--font-jost);font-size:.48rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${C.TDS};margin-bottom:.35rem}
.ev-p-name{font-family:var(--font-cormorant);font-size:clamp(1.2rem,2.5vw,2rem);font-weight:300;color:${C.TD};line-height:1.1}
.ev-p-loc{font-family:var(--font-lora);font-size:.75rem;color:${C.TDS}}

/* ══════════════════════════════════════════
   VENUES
══════════════════════════════════════════ */
.vc{background:${C.L2}}
.vc-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;padding:var(--py) var(--px) clamp(2rem,4vw,3.5rem);border-bottom:1px solid transparent;border-image:linear-gradient(to right,transparent,rgba(160,110,30,.35) 25%,rgba(200,151,63,.55) 50%,rgba(160,110,30,.35) 75%,transparent) 1}
.vc-title{font-family:var(--font-cormorant);font-size:clamp(2.2rem,5vw,5rem);font-weight:300;color:${C.TL};line-height:1.02;letter-spacing:-.02em;margin:0}
.vc-title em{font-style:italic;font-weight:400;color:${C.G2}}
.vc-sub{font-family:var(--font-lora);font-size:.88rem;color:${C.TM};line-height:1.85;max-width:280px;margin:0}
.vc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#8B6520}
.vc-tile{position:relative;padding:2.25rem 2rem 2rem;display:flex;flex-direction:column;transition:background .3s;min-height:280px;overflow:visible}
.vc-tile.s2{grid-column:span 2}
.vc-accent{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,${C.G} 30%,${C.G} 70%,transparent);transition:opacity .4s}
.vc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem}
.vc-num{font-family:var(--font-cormorant);font-size:.82rem;font-weight:300;color:rgba(200,151,63,.3);letter-spacing:.06em}
.vc-tags{display:flex;flex-direction:column;align-items:flex-end;gap:.2rem;text-align:right}
.vc-tag{font-family:var(--font-jost);font-size:.52rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(200,151,63,.72)}
.vc-tag-sub{font-family:var(--font-jost);font-size:.48rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(245,238,227,.3)}
.vc-name{font-family:var(--font-cormorant);font-size:clamp(1.3rem,2.5vw,2.1rem);font-weight:400;line-height:1.05;letter-spacing:-.01em;margin:0 0 .875rem;transition:color .3s}
.vc-desc{font-family:var(--font-lora);font-size:.86rem;color:rgba(240,232,218,.5);line-height:2;letter-spacing:.018em;margin:0 0 1.25rem}
.vc-hours{display:flex;flex-direction:column;gap:.28rem;margin-bottom:1rem}
.vc-hr{display:flex;align-items:baseline;gap:.75rem}
.vc-hl{font-family:var(--font-jost);font-size:.52rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:rgba(200,151,63,.62);min-width:4.25rem;flex-shrink:0}
.vc-ht{font-family:var(--font-lora);font-size:.78rem;color:rgba(240,232,218,.48)}
.vc-note{font-family:var(--font-jost);font-size:.5rem;color:rgba(240,232,218,.28);letter-spacing:.04em;margin:-.25rem 0 .875rem}
.vc-meta{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.25rem}
.vc-meta-row{display:flex;align-items:center;gap:.5rem;font-family:var(--font-jost);font-size:.6rem;color:rgba(240,232,218,.44);text-decoration:none;transition:color .15s}
.vc-meta-row:hover{color:${C.G}}
.vc-actions{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-top:auto}
.vc-link{font-family:var(--font-jost);font-size:.55rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(200,151,63,.72);text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;border-bottom:1px solid rgba(200,151,63,.24);padding-bottom:1px;transition:color .15s}
.vc-link:hover{color:${C.G}}
.vc-cta{font-family:var(--font-jost);font-size:.55rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#F0E8DA;background:rgba(200,151,63,.12);border:1px solid rgba(200,151,63,.25);text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;padding:.5rem 1.1rem;transition:all .2s}
.vc-cta:hover{background:${C.G};color:${C.TILE};border-color:${C.G}}

/* ══════════════════════════════════════════
   CTA STRIPS
══════════════════════════════════════════ */
.cs{background:linear-gradient(160deg,#1A0C03 0%,#220E04 60%,#2E1A07 100%);border-top:none;border-bottom:none}

/* Top cards */
.cs-cards{display:grid;grid-template-columns:1fr 1px 1fr;border-bottom:1px solid rgba(200,151,63,.12)}
.cs-card{display:flex;flex-direction:column;gap:1rem;padding:clamp(2rem,4vw,3rem) var(--px)}
.cs-card-div{background:rgba(200,151,63,.12)}
.cs-card-icon{width:44px;height:44px;border:1px solid rgba(140,90,30,.22);display:flex;align-items:center;justify-content:center;color:${C.G2};flex-shrink:0}
.cs-card-body{flex:1}
.cs-card-ey{font-family:var(--font-jost);font-size:.5rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,151,63,.7);margin:0 0 .5rem}
.cs-card-h{font-family:var(--font-cormorant);font-size:clamp(1.4rem,2.5vw,2.2rem);font-weight:300;color:${C.TD};margin:0 0 .5rem;line-height:1.1;letter-spacing:-.01em}
.cs-card-p{font-family:var(--font-lora);font-size:.88rem;color:${C.TDM};margin:0;line-height:2;letter-spacing:.02em}
.cs-card-btn{font-family:var(--font-jost);font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.TD};background:transparent;border:1px solid rgba(200,151,63,.3);padding:.75rem 1.5rem;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;width:fit-content;transition:all .2s}
.cs-card-btn:hover{border-color:${C.G};color:${C.G};background:rgba(200,151,63,.06)}

/* Bottom quick links */
.cs-quick{display:grid;grid-template-columns:1fr 1px 1fr}
.cs-qi-item{display:flex;align-items:center;gap:1.25rem;padding:1.875rem var(--px);text-decoration:none;transition:background .2s}
.cs-qi-item:hover{background:rgba(200,151,63,.06)}
.cs-qi-item:hover .cs-qa{color:${C.G2};transform:translateX(3px)}
.cs-qs{background:rgba(200,151,63,.12)}
.cs-qi-icon{width:46px;height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1px solid rgba(200,151,63,.25);color:${C.G}}
.cs-qi-icon.filled{background:transparent;color:${C.G};border-color:rgba(200,151,63,.25)}
.cs-qt{flex:1;display:flex;flex-direction:column;gap:.22rem}
.cs-qm{font-family:var(--font-jost);font-size:.5rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,151,63,.7)}
.cs-qn{font-family:var(--font-cormorant);font-size:clamp(1.1rem,2.2vw,1.85rem);font-weight:300;color:${C.TD};line-height:1;letter-spacing:-.01em}
.cs-qa{color:rgba(200,151,63,.2);flex-shrink:0;transition:color .2s,transform .25s}
.cs-qi-item:hover .cs-qa{color:${C.G}}

@media(max-width:640px){
  .cs-cards{grid-template-columns:1fr}
  .cs-card-div{height:1px;width:100%}
}

/* ══════════════════════════════════════════
   REVIEWS
══════════════════════════════════════════ */
.gr{background:${C.L1};padding-bottom:var(--py);overflow:hidden;border-top:1px solid transparent;border-image:linear-gradient(to right,transparent,rgba(160,110,30,.35) 25%,rgba(200,151,63,.55) 50%,rgba(160,110,30,.35) 75%,transparent) 1}
.gr-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;padding:var(--py) var(--px) clamp(2rem,4vw,4rem)}
.gr-title{font-family:var(--font-cormorant);font-size:clamp(1.8rem,4vw,3.5rem);font-weight:300;color:${C.TL};line-height:1.05;letter-spacing:-.015em;margin:0}
.gr-title em{font-style:italic;font-weight:400;color:${C.G2}}
.gr-score-wrap{display:flex;align-items:center;gap:1rem;flex-shrink:0}
.gr-score{font-family:var(--font-cormorant);font-size:2.75rem;font-weight:300;color:${C.TL};line-height:1;letter-spacing:-.02em}
.gr-stars{display:flex;gap:3px}
.gr-src{display:block;font-family:var(--font-jost);font-size:.62rem;font-weight:600;letter-spacing:.08em;color:${C.TMU};margin-top:.35rem}
.gr-mq-wrap{position:relative}
.gr-fade{position:absolute;top:0;bottom:0;width:80px;z-index:5;pointer-events:none}
.gr-fade.l{left:0;background:linear-gradient(to right,${C.L1},transparent)}
.gr-fade.r{right:0;background:linear-gradient(to left,${C.L1},transparent)}
.gr-track{padding:.75rem 0 1rem}
.gr-card{flex-shrink:0;width:300px;margin:0 .75rem;background:#fff;padding:1.75rem;border:1px solid ${C.BL};display:flex;flex-direction:column;gap:1rem;box-shadow:0 2px 18px rgba(40,15,3,.06)}
.gr-q{font-family:var(--font-lora);font-size:.9rem;color:#3D2010;line-height:2;letter-spacing:.015em;font-style:italic;margin:0;flex:1}
.gr-ft{display:flex;align-items:center;gap:.875rem;margin-top:auto;padding-top:1rem;border-top:1px solid ${C.BL}}
.gr-av{width:30px;height:30px;border-radius:50%;background:${C.D2};display:flex;align-items:center;justify-content:center;font-family:var(--font-jost);font-size:.7rem;font-weight:700;color:${C.G};flex-shrink:0}
.gr-nm{font-family:var(--font-jost);font-size:.72rem;font-weight:700;color:${C.TL};margin:0 0 .15rem}
.gr-dt{font-family:var(--font-jost);font-size:.62rem;color:${C.TMU};margin:0}

/* ══════════════════════════════════════════
   SOCIAL
══════════════════════════════════════════ */
.sf{background:${C.D5};border-top:1px solid rgba(200,151,63,.1);border-bottom:1px solid rgba(200,151,63,.1)}
.sf-inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,6vw,7rem);align-items:center;padding:var(--py) var(--px)}
.sf-h2{font-family:var(--font-cormorant);font-size:clamp(1.9rem,4vw,3.5rem);font-weight:300;color:${C.TD};line-height:1.05;letter-spacing:-.015em;margin:0 0 1.25rem}
.sf-h2 em{font-style:italic;font-weight:400;color:${C.G}}
.sf-p{font-family:var(--font-lora);font-size:.9rem;color:${C.TDM};line-height:2.05;letter-spacing:.02em;max-width:360px;margin:0}
.sf-cards{display:flex;flex-direction:column;border:1px solid ${C.BD}}
.sf-card{display:flex;align-items:center;justify-content:space-between;gap:1.25rem;padding:1.75rem 1.875rem;text-decoration:none;transition:background .25s}
.sf-card.bd{border-bottom:1px solid ${C.BD}}
.sf-card:hover{background:rgba(200,151,63,.06)}
.sf-card-l{display:flex;align-items:center;gap:1.25rem;flex:1}
.sf-icon{width:42px;height:42px;flex-shrink:0;border:1px solid rgba(200,151,63,.22);display:flex;align-items:center;justify-content:center;color:${C.G}}
.sf-plat{font-family:var(--font-jost);font-size:.5rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,151,63,.68);margin:0 0 .15rem}
.sf-handle{font-family:var(--font-cormorant);font-size:1.2rem;font-weight:300;color:${C.TD};margin:0 0 .28rem;line-height:1.1}
.sf-desc{font-family:var(--font-lora);font-size:.72rem;color:${C.TDS};margin:0}
.sf-arr{color:${C.TDS};flex-shrink:0;transition:color .2s,transform .25s}
.sf-card:hover .sf-arr{color:${C.G};transform:translate(2px,-2px)}

/* ══════════════════════════════════════════
   ENQUIRY
══════════════════════════════════════════ */
.eq{background:${C.L2};border-top:1px solid transparent;border-image:linear-gradient(to right,transparent,rgba(160,110,30,.35) 25%,rgba(200,151,63,.55) 50%,rgba(160,110,30,.35) 75%,transparent) 1}
.eq-side{padding:var(--py) var(--px)}
.eq-side-top{margin-bottom:2rem}
.eq-layout{display:grid;grid-template-columns:340px 1fr;align-items:start;gap:clamp(2.5rem,7vw,8rem)}
.eq-h2{font-family:var(--font-cormorant);font-size:clamp(2rem,3.5vw,3.5rem);font-weight:300;color:${C.TL};line-height:1.04;letter-spacing:-.015em;margin:0 0 1rem}
.eq-h2 em{font-style:italic;font-weight:400;color:${C.G2};display:block}
.eq-p{font-family:var(--font-lora);font-size:.9rem;color:${C.TM};line-height:2.05;letter-spacing:.02em;margin:0 0 2rem;max-width:340px}
.eq-contacts{display:flex;flex-direction:column;gap:1.25rem}
.eq-contact{display:flex;align-items:flex-start;gap:.875rem}
.eq-ci{width:32px;height:32px;flex-shrink:0;border:1px solid rgba(110,70,25,.22);display:flex;align-items:center;justify-content:center;color:${C.G2};margin-top:.1rem}
.eq-cl{font-family:var(--font-jost);font-size:.48rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(107,69,32,.5);margin:0 0 .2rem}
.eq-cv{font-family:var(--font-lora);font-size:.85rem;color:${C.TL};margin:0;line-height:1.5}
.eq-cv.lnk{text-decoration:none;border-bottom:1px solid rgba(110,70,25,.18);padding-bottom:1px;transition:color .15s}
.eq-cv.lnk:hover{color:${C.G2}}
.eq-form-wrap{padding-top:.25rem}
.eq-form{display:flex;flex-direction:column;gap:1.25rem}
.eq-r2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.eq-f{display:flex;flex-direction:column}
.eq-lbl{font-family:var(--font-jost);font-size:.58rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${C.TM};margin-bottom:.5rem}
.eq-opt{font-weight:400;text-transform:none;letter-spacing:0;opacity:.45;font-size:.56rem}
.eq-inp{width:100%;padding:.85rem 1rem;font-family:var(--font-lora);font-size:.88rem;border:1px solid rgba(110,70,25,.18);background:#fff;color:${C.TL};outline:none;border-radius:0;appearance:none;transition:border-color .2s,box-shadow .2s;letter-spacing:.01em}
.eq-inp:focus{border-color:${C.G2};box-shadow:0 0 0 3px rgba(160,110,30,.07)}
.eq-inp.err{border-color:#c53030}
.eq-inp.ta{resize:vertical;min-height:120px}
.eq-inp::placeholder{color:rgba(107,69,32,.3);font-style:italic}
.eq-sub{font-family:var(--font-jost);font-size:.66rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:1rem;border:none;background:${C.D2};color:${C.TD};cursor:pointer;width:100%;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:background .2s,transform .2s;margin-top:.25rem}
.eq-sub:hover{background:#3D2010;transform:translateY(-1px)}
.eq-done{display:flex;flex-direction:column;align-items:flex-start;gap:1rem}
.eq-done-ic{width:52px;height:52px;background:rgba(110,70,25,.1);border:1px solid rgba(110,70,25,.2);display:flex;align-items:center;justify-content:center;color:${C.G2}}
.eq-done-h{font-family:var(--font-cormorant);font-size:2.2rem;font-weight:300;color:${C.TL};margin:.25rem 0 0}
.eq-done-p{font-family:var(--font-lora);font-size:.88rem;color:${C.TM};margin:0;line-height:1.9;letter-spacing:.015em}
.eq-again{font-family:var(--font-jost);font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.85rem 2rem;border:none;background:${C.D2};color:${C.L2};cursor:pointer;margin-top:.5rem;transition:background .2s}
.eq-again:hover{background:#3D2010}
@media(max-width:900px){.eq-layout{grid-template-columns:1fr;gap:2.5rem}}
@media(max-width:640px){.eq-r2{grid-template-columns:1fr}}

/* ══════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════ */
.nl{background:${C.D6};border-top:1px solid rgba(200,151,63,.12);position:relative;overflow:hidden}
.nl-glow{position:absolute;inset:0;background:radial-gradient(ellipse at 12% 55%,rgba(200,151,63,.07),transparent 60%);pointer-events:none}
.nl-inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,6vw,7rem);align-items:center;padding:var(--py) var(--px);position:relative;z-index:1}
.nl-h2{font-family:var(--font-cormorant);font-size:clamp(1.9rem,4vw,3.5rem);font-weight:300;color:${C.TD};line-height:1.05;letter-spacing:-.015em;margin:0 0 1.25rem}
.nl-h2 em{font-style:italic;font-weight:400;color:${C.G}}
.nl-p{font-family:var(--font-lora);font-size:.875rem;color:${C.TDM};line-height:1.85;margin:0 0 1.875rem}
.nl-perks{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.6rem}
.nl-perk{display:flex;align-items:center;gap:.625rem;font-family:var(--font-jost);font-size:.66rem;font-weight:400;letter-spacing:.06em;color:${C.TDM}}
.nl-pi{color:${C.G};flex-shrink:0}
.nl-form{display:flex;flex-direction:column;gap:1rem}
.nl-r2{display:grid;grid-template-columns:1fr 1fr;gap:.875rem}
.nl-f{display:flex;flex-direction:column}
.nl-lbl{font-family:var(--font-jost);font-size:.6rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,238,227,.55);margin-bottom:.42rem}
.nl-inp{width:100%;padding:.8rem 1rem;font-family:var(--font-lora);font-size:.875rem;background:rgba(255,220,160,.05);border:1px solid rgba(200,151,63,.12);color:${C.TD};outline:none;border-radius:0;transition:border-color .2s}
.nl-inp::placeholder{color:rgba(245,238,227,.28)}
.nl-inp:focus{border-color:rgba(200,151,63,.42)}
.nl-inp.err{border-color:#d95050}
.nl-sub{font-family:var(--font-jost);font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;padding:.95rem;border:none;background:${C.G};color:${C.D6};cursor:pointer;width:100%;display:flex;align-items:center;justify-content:center;transition:background .2s}
.nl-sub:hover{background:#DBA94A}
.nl-disc{font-family:var(--font-jost);font-size:.54rem;color:${C.TDS};letter-spacing:.04em;line-height:1.6;margin:0}
.nl-done{display:flex;flex-direction:column;gap:.875rem}
.nl-done-ic{width:48px;height:48px;background:rgba(200,151,63,.09);border:1px solid rgba(200,151,63,.2);display:flex;align-items:center;justify-content:center;color:${C.G}}
.nl-done-h{font-family:var(--font-cormorant);font-size:1.8rem;font-weight:300;color:${C.TD};margin:.5rem 0 0}
.nl-done-p{font-family:var(--font-lora);font-size:.875rem;color:${C.TDM};margin:0;line-height:1.8}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */

/* tablet 1024 */
@media(max-width:1024px){
  .vc-grid{grid-template-columns:repeat(2,1fr)}
  .vc-tile.s2{grid-column:span 2}
  .ev-layout{grid-template-columns:1fr;gap:3rem}
  .ev-right{max-width:480px}
  .cs-cards{grid-template-columns:1fr}
  .cs-card-div{height:1px;width:100%}
}

/* tablet 900 */
@media(max-width:900px){
  .eq-layout{grid-template-columns:1fr;gap:2.5rem}
  .hero-corner{display:none}
  .sf-inner{grid-template-columns:1fr;gap:2.5rem}
}

/* tablet 768 */
@media(max-width:768px){
  .gal-frame{aspect-ratio:4/3}
  .gal-lbl{display:none}
  .gal-bar{padding:.875rem 1rem;gap:.625rem}
  .nl-inner{grid-template-columns:1fr;gap:2.5rem}
  .nl-r2{grid-template-columns:1fr}
  .hero-h1-w,.hero-h1-g{font-size:clamp(2rem,8vw,3.5rem)}
  .vc-grid{grid-template-columns:repeat(2,1fr)}
  .vc-tile.s2{grid-column:span 2}
  .vc-head{flex-direction:column;align-items:flex-start;gap:1rem}
  .vc-sub{max-width:100%}
  .cs-qi-item{padding:1.5rem var(--px)}
  .gr-hd{flex-direction:column;align-items:flex-start;gap:1.25rem}
}

/* mobile 640 */
@media(max-width:640px){
  .hero-br{display:none}
  .hero-deco-circle{display:none}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:320px}
  .hero-btn-primary,.hero-btn-ghost{justify-content:center}
  .hero-btn-link{text-align:center;display:none}
  .hero-stats{grid-template-columns:repeat(2,1fr)}
  .hero-stat.last{border-right:none}
  .hero-stat:nth-child(2){border-right:none}
  .hero-stat:nth-child(3){border-top:1px solid rgba(200,151,63,.1)}
  .hero-stat:nth-child(4){border-top:1px solid rgba(200,151,63,.1)}
  .vc-grid{grid-template-columns:1fr}
  .vc-tile.s2{grid-column:span 1}
  .cs-cards{grid-template-columns:1fr}
  .cs-card-div{height:1px;width:100%}
  .cs-quick{grid-template-columns:1fr}
  .cs-qs{height:1px;background:rgba(200,151,63,.12)}
  .eq-r2{grid-template-columns:1fr}
  .eq-side{padding:var(--py) var(--px)}
  .nl-r2{grid-template-columns:1fr}
  .ev-layout{padding:clamp(2.5rem,6vw,4rem) var(--px)}
  .sf-cards{border:none}
  .sf-card{padding:1.25rem 0;border-bottom:1px solid rgba(200,151,63,.1)}
  .sf-card.bd{border-bottom:1px solid rgba(200,151,63,.1)}
}

/* small mobile 480 */
@media(max-width:480px){
  .gal-frame{aspect-ratio:1/1;min-height:260px}
  .gal-cnt{display:none}
  .hero-ew-text{font-size:.46rem;letter-spacing:.2em}
  .hero-h1-w,.hero-h1-g{font-size:clamp(1.9rem,9vw,2.8rem)}
  .ev-layout{grid-template-columns:1fr}
  .ev-card{padding:1.25rem}
  .vc-tile{padding:1.5rem 1.25rem}
  .nl-inner{padding:clamp(2.5rem,6vw,4rem) var(--px)}
  .cs-card{padding:1.5rem var(--px)}
  .eq-layout{gap:2rem}
}
      `}</style>
    </>
  )
}
