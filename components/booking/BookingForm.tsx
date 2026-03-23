'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'

const today = new Date().toISOString().split('T')[0]

const timeSlots = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
]

const schema = z.object({
  name:     z.string().min(2, 'Enter your full name'),
  email:    z.string().email('Enter a valid email address'),
  phone:    z.string().min(8, 'Enter a valid phone number'),
  date:     z.string().min(1, 'Select a date'),
  time:     z.string().min(1, 'Select a time'),
  guests:   z.string().min(1, 'Select number of guests'),
  venue:    z.string().min(1, 'Select a venue'),
  requests: z.string().optional(),
})
type Fields = z.infer<typeof schema>

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-jost)',
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#5E3D20',
  marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-lora)',
  fontSize: '0.9rem',
  color: '#180A00',
  background: '#fff',
  border: '1px solid #C4A47C',
  borderRadius: 0,
  outline: 'none',
  transition: 'border-color 0.15s',
  appearance: 'none' as const,
}

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jost)',
  fontSize: '0.7rem',
  color: '#b91c1c',
  marginTop: '0.3rem',
}

export default function BookingForm() {
  const [done, setDone]     = useState(false)
  const [confirmed, setConf] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: Fields) {
    return new Promise<void>(res =>
      setTimeout(() => { setConf(data.name.split(' ')[0]); setDone(true); res() }, 900)
    )
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <div style={{ width: '60px', height: '60px', border: '1px solid rgba(184,130,30,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={26} style={{ color: '#B8821E' }} />
        </div>
        <div>
          <p className="font-cormorant" style={{ fontSize: '1.75rem', fontWeight: 300, color: '#1A0C02', marginBottom: '0.5rem' }}>
            Reservation Received
          </p>
          <p className="font-lora" style={{ fontSize: '0.875rem', color: '#6B5240', lineHeight: 1.8 }}>
            Thank you, {confirmed}. We will confirm your booking by email shortly.
          </p>
        </div>
        <a href="/" className="btn-brown" style={{ marginTop: '0.5rem' }}>Back to Home</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Row: name + email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
        <div>
          <label htmlFor="b-name" style={labelStyle}>Full Name</label>
          <input id="b-name" type="text" autoComplete="name" placeholder="Jane Smith" {...register('name')}
            style={{ ...inputStyle, ...(errors.name ? { borderColor: '#b91c1c' } : {}) }} />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="b-email" style={labelStyle}>Email Address</label>
          <input id="b-email" type="email" autoComplete="email" placeholder="jane@example.com" {...register('email')}
            style={{ ...inputStyle, ...(errors.email ? { borderColor: '#b91c1c' } : {}) }} />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="b-phone" style={labelStyle}>Phone Number</label>
        <input id="b-phone" type="tel" autoComplete="tel" placeholder="04xx xxx xxx" {...register('phone')}
          style={{ ...inputStyle, ...(errors.phone ? { borderColor: '#b91c1c' } : {}) }} />
        {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
      </div>

      {/* Row: date + time */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
        <div>
          <label htmlFor="b-date" style={labelStyle}>Date</label>
          <input id="b-date" type="date" min={today} {...register('date')}
            style={{ ...inputStyle, ...(errors.date ? { borderColor: '#b91c1c' } : {}) }} />
          {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="b-time" style={labelStyle}>Preferred Time</label>
          <select id="b-time" {...register('time')}
            style={{ ...inputStyle, ...(errors.time ? { borderColor: '#b91c1c' } : {}), cursor: 'pointer' }}>
            <option value="">Select a time</option>
            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.time && <p style={errorStyle}>{errors.time.message}</p>}
        </div>
      </div>

      {/* Row: guests + venue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
        <div>
          <label htmlFor="b-guests" style={labelStyle}>Guests</label>
          <select id="b-guests" {...register('guests')}
            style={{ ...inputStyle, ...(errors.guests ? { borderColor: '#b91c1c' } : {}), cursor: 'pointer' }}>
            <option value="">Select guests</option>
            {Array.from({ length: 19 }, (_, i) => i + 1).map(n => (
              <option key={n} value={String(n)}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
            <option value="20+">20+ guests</option>
          </select>
          {errors.guests && <p style={errorStyle}>{errors.guests.message}</p>}
        </div>
        <div>
          <label htmlFor="b-venue" style={labelStyle}>Venue</label>
          <select id="b-venue" {...register('venue')}
            style={{ ...inputStyle, ...(errors.venue ? { borderColor: '#b91c1c' } : {}), cursor: 'pointer' }}>
            <option value="">Select venue</option>
            {['Cafe + Play', 'Z-Bar & Restaurant', 'Sports Bar', 'Functions'].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          {errors.venue && <p style={errorStyle}>{errors.venue.message}</p>}
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label htmlFor="b-requests" style={labelStyle}>
          Special Requests{' '}
          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, opacity: 0.6 }}>(optional)</span>
        </label>
        <textarea id="b-requests" rows={4}
          placeholder="Dietary requirements, high chairs, special occasions..."
          {...register('requests')}
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', fontFamily:'var(--font-jost)', fontSize:'.66rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', background:'#2E1A07', color:'#F5EEE3', border:'none', cursor:'pointer', marginTop:'.25rem', transition:'background .2s' }}
        onMouseEnter={e => (e.currentTarget.style.background='#3D2010')}
        onMouseLeave={e => (e.currentTarget.style.background='#2E1A07')}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Confirm Reservation'}
      </button>

      <p className="font-lora text-center" style={{ fontSize: '0.8rem', color: '#6B5240', lineHeight: 1.75 }}>
        For large groups or functions, call{' '}
        <a href="tel:0883372888" style={{ color: '#B8821E' }}>08 8337 2888</a>
        {' '}or email{' '}
        <a href="mailto:enquiries@rezz.com.au" style={{ color: '#B8821E' }}>enquiries@rezz.com.au</a>
      </p>

      <style>{`
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr !important; } }
        input:focus, select:focus, textarea:focus {
          border-color: #B8821E !important;
          box-shadow: 0 0 0 2px rgba(184,130,30,0.12);
        }
      `}</style>
    </form>
  )
}
