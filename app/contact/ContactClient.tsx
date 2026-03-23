'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Instagram,
  Facebook,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const schema = z.object({
  name:    z.string().min(2, 'Enter your name'),
  email:   z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Enter a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
type Fields = z.infer<typeof schema>

const contactDetails = [
  {
    icon: MapPin,
    label: 'Main Venue',
    lines: ['20 Hamilton Terrace', 'Newton SA 5074'],
    link: 'https://www.google.com/maps/search/20+Hamilton+Terrace+Newton+SA',
    linkLabel: 'Get directions',
  },
  {
    icon: MapPin,
    label: 'Liquor Store',
    lines: ['243 Gorge Road', 'Newton SA 5074'],
    link: 'https://www.google.com/maps/search/243+Gorge+Road+Newton+SA',
    linkLabel: 'Get directions',
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['08 8337 2888'],
    link: 'tel:0883372888',
    linkLabel: 'Call now',
  },
  {
    icon: Mail,
    label: 'General Enquiries',
    lines: ['admin@rezz.com.au'],
    link: 'mailto:admin@rezz.com.au',
    linkLabel: 'Send email',
  },
  {
    icon: Mail,
    label: 'Events & Functions',
    lines: ['enquiries@rezz.com.au'],
    link: 'mailto:enquiries@rezz.com.au',
    linkLabel: 'Send email',
  },
]

const hours = [
  {
    venue: 'Z-Bar & Restaurant',
    lines: [
      'Lunch: Mon–Sun 11:30am – 2:30pm',
      'Dinner: Mon–Thu 5:30 – 8:30pm',
      'Fri–Sat till 9:00pm · Sun till 8:30pm',
    ],
  },
  {
    venue: 'Cafe + Play',
    lines: [
      'Mon–Thu: Lunch & Dinner sessions',
      'Fri–Sun: All day from 11:30am',
      'Dinner till 9pm (Fri–Sat)',
    ],
  },
  {
    venue: 'Sports Bar & Beer Garden',
    lines: [
      'Mon–Thu: 8am – 2am',
      'Fri: 8am – 3am',
      'Sat: 9am – 3am · Sun: 9am – 12am',
    ],
  },
]

export default function ContactClient() {
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ resolver: zodResolver(schema) })

  function onSubmit(_data: Fields) {
    return new Promise<void>(res => setTimeout(() => { setDone(true); res() }, 800))
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-16 px-6 lg:px-8 grain overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #3D1E06 0%, #2A1608 40%, #1A0C03 100%)',
        }}
      >

        <div className="max-w-7xl mx-auto relative z-10">
          <nav
            className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-white/40 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Contact</span>
          </nav>
          <span className="section-label text-gold">We Would Love to Hear From You</span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-none mb-4">
            Get in Touch
          </h1>
          <p className="font-lora text-white/55 text-lg max-w-xl">
            Reservations, functions, general enquiries or just a chat. Our team is here for you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Left column — info */}
          <div className="lg:col-span-2 space-y-5">
            <AnimatedSection>
              {contactDetails.map(({ icon: Icon, label, lines, link, linkLabel }) => (
                <div
                  key={label}
                  className="flex gap-4 bg-white rounded-xl p-5 border border-warm-sand hover:border-tan transition-colors mb-3"
                >
                  <div className="p-2.5 rounded-lg bg-warm-sand flex-shrink-0 h-fit">
                    <Icon size={15} className="text-brown-mid" />
                  </div>
                  <div>
                    <p className="font-jost text-xs font-bold tracking-widest uppercase text-text-muted mb-1">
                      {label}
                    </p>
                    {lines.map(l => (
                      <p key={l} className="font-lora text-sm text-brown-dark">{l}</p>
                    ))}
                    <a
                      href={link}
                      target={link.startsWith('http') ? '_blank' : undefined}
                      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-jost text-xs text-gold hover:text-brown-mid transition-colors mt-1 inline-block"
                    >
                      {linkLabel} &rarr;
                    </a>
                  </div>
                </div>
              ))}

              {/* Social row */}
              <div className="flex items-center gap-5 bg-white rounded-xl p-5 border border-warm-sand">
                <a
                  href="https://www.instagram.com/rezznewton/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors"
                >
                  <Instagram size={17} />
                  <span className="font-jost text-xs font-semibold tracking-wide">@rezznewton</span>
                </a>
                <span className="w-px h-4 bg-warm-sand" />
                <a
                  href="https://web.facebook.com/REZZNEWTONSA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors"
                >
                  <Facebook size={17} />
                  <span className="font-jost text-xs font-semibold tracking-wide">REZZNEWTONSA</span>
                </a>
              </div>
            </AnimatedSection>

            {/* Hours */}
            <AnimatedSection delay={80}>
              <div className="bg-white rounded-xl p-6 border border-warm-sand">
                <div className="flex items-center gap-2.5 mb-5">
                  <Clock size={15} className="text-gold" />
                  <h3 className="font-jost text-xs font-bold tracking-widest uppercase text-brown-deep">
                    Opening Hours
                  </h3>
                </div>
                <div className="space-y-5">
                  {hours.map(({ venue, lines }) => (
                    <div key={venue}>
                      <p className="font-jost text-xs font-semibold tracking-wider uppercase text-brown-mid mb-1.5">
                        {venue}
                      </p>
                      {lines.map(l => (
                        <p key={l} className="font-lora text-xs text-text-muted leading-relaxed">{l}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column — form + map */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatedSection delay={60}>
              <div className="bg-white rounded-2xl border border-warm-sand p-8 md:p-10 shadow-sm">
                <h2 className="font-cormorant text-3xl font-semibold text-brown-dark mb-2">
                  Send Us a Message
                </h2>
                <p className="font-lora text-sm text-text-muted mb-8">
                  We respond within one business day.
                </p>

                {done ? (
                  <div className="flex flex-col items-center gap-5 text-center py-10">
                    <div className="p-4 rounded-full bg-gold/12">
                      <CheckCircle2 size={44} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-cormorant text-2xl font-semibold text-brown-dark mb-2">
                        Message Received
                      </p>
                      <p className="font-lora text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
                        Thanks for reaching out. Someone from our team will be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setDone(false)}
                      style={{ display:'inline-flex', alignItems:'center', padding:'.85rem 2rem', fontFamily:'var(--font-jost)', fontSize:'.62rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', background:'#2E1A07', color:'#F3EBE0', border:'none', cursor:'pointer', marginTop:'.5rem', transition:'background .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background='#3D2010')}
                      onMouseLeave={e => (e.currentTarget.style.background='#2E1A07')}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-name" className="form-label">Your Name</label>
                        <input
                          id="c-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Smith"
                          {...register('name')}
                          className={`form-input ${errors.name ? 'error' : ''}`}
                          aria-required="true"
                          aria-describedby={errors.name ? 'cn-err' : undefined}
                        />
                        {errors.name && <p id="cn-err" className="form-error">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-email" className="form-label">Email Address</label>
                        <input
                          id="c-email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@email.com"
                          {...register('email')}
                          className={`form-input ${errors.email ? 'error' : ''}`}
                          aria-required="true"
                          aria-describedby={errors.email ? 'ce-err' : undefined}
                        />
                        {errors.email && <p id="ce-err" className="form-error">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-subject" className="form-label">Subject</label>
                      <input
                        id="c-subject"
                        type="text"
                        placeholder="e.g. Function enquiry, booking question..."
                        {...register('subject')}
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        aria-required="true"
                      />
                      {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="c-message" className="form-label">Message</label>
                      <textarea
                        id="c-message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        {...register('message')}
                        className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                        aria-required="true"
                      />
                      {errors.message && <p className="form-error">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', padding:'1rem', fontFamily:'var(--font-jost)', fontSize:'.66rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', background:'#2E1A07', color:'#F5EEE3', border:'none', cursor:'pointer', transition:'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background='#3D2010')}
                    onMouseLeave={e => (e.currentTarget.style.background='#2E1A07')}
                    >
                      <Mail size={16} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Google Map */}
            <AnimatedSection delay={120}>
              <div className="rounded-2xl overflow-hidden border border-warm-sand shadow-sm">
                <iframe
                  title="Rezz Hotel Newton on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.8!2d138.6882!3d-34.8758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0b4f8ceaaaaab%3A0x500ea6ea75974e8!2s20+Hamilton+Terrace%2C+Newton+SA+5074!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="font-jost text-xs text-text-muted mt-3 text-center tracking-wide">
                20 Hamilton Terrace, Newton SA 5074
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
