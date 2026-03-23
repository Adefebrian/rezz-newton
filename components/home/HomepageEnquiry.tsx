'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Phone, Mail, MapPin } from 'lucide-react'

const schema = z.object({
  name:    z.string().min(2, 'Enter your full name'),
  phone:   z.string().optional(),
  email:   z.string().email('Enter a valid email'),
  service: z.string().optional(),
  message: z.string().min(10, 'Please add a message'),
})
type Fields = z.infer<typeof schema>

const serviceOptions = ['Restaurant Booking', 'Functions & Events', 'Business Pods', 'Order & Pick Up', 'Careers', 'General Enquiry']
const contactInfo = [
  { Icon: Phone,  label: 'Phone',   value: '(08) 8337 2888',                    href: 'tel:0883372888' },
  { Icon: Mail,   label: 'Email',   value: 'info@rezz.com.au',                   href: 'mailto:info@rezz.com.au' },
  { Icon: MapPin, label: 'Address', value: '20 Hamilton Terrace, Newton SA 5074', href: null },
]

export default function HomepageEnquiry() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({ resolver: zodResolver(schema) })
  function onSubmit(_data: Fields) { return new Promise<void>(res => setTimeout(() => { setDone(true); res() }, 800)) }

  return (
    <section className="eq-root" aria-labelledby="eq-heading">
      <div className="eq-layout">
        <div className="eq-sidebar">
          <div className="eyebrow"><span className="eyebrow-bar" />Get in Touch</div>
          <h2 id="eq-heading" className="eq-h2">Have an <em>Enquiry?</em></h2>
          <p className="eq-sub">We&apos;d love to hear from you. Fill in the form and our team will be in touch shortly.</p>
          <div className="eq-contact-list">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <div key={label} className="eq-contact-item">
                <div className="eq-contact-icon"><Icon size={12} /></div>
                <div>
                  <p className="eq-contact-label">{label}</p>
                  {href ? <a href={href} className="eq-contact-value eq-contact-link">{value}</a> : <p className="eq-contact-value">{value}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="eq-deco" aria-hidden="true">Rezz</div>
        </div>

        <div className="eq-form-wrap">
          {done ? (
            <div className="eq-done">
              <div className="eq-done-icon"><CheckCircle2 size={28} /></div>
              <p className="eq-done-h">Message Sent</p>
              <p className="eq-done-p">Thanks for reaching out. Our team will be in touch shortly.</p>
              <button onClick={() => setDone(false)} className="btn-brown eq-send-another">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="eq-form">
              <div className="eq-row-2">
                <div className="eq-field">
                  <label htmlFor="eq-name" className="form-label">Full Name</label>
                  <input id="eq-name" type="text" autoComplete="name" placeholder="First and last name" {...register('name')} className={`form-input${errors.name ? ' error' : ''}`} />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>
                <div className="eq-field">
                  <label htmlFor="eq-phone" className="form-label">Phone <span className="eq-opt">(optional)</span></label>
                  <input id="eq-phone" type="tel" autoComplete="tel" placeholder="Phone number" {...register('phone')} className="form-input" />
                </div>
              </div>
              <div className="eq-row-2">
                <div className="eq-field">
                  <label htmlFor="eq-email" className="form-label">Email Address</label>
                  <input id="eq-email" type="email" autoComplete="email" placeholder="your@email.com" {...register('email')} className={`form-input${errors.email ? ' error' : ''}`} />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div className="eq-field">
                  <label htmlFor="eq-service" className="form-label">Enquiry Type <span className="eq-opt">(optional)</span></label>
                  <select id="eq-service" {...register('service')} className="form-input">
                    <option value="">Select...</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="eq-field">
                <label htmlFor="eq-message" className="form-label">Message</label>
                <textarea id="eq-message" rows={5} placeholder="Tell us how we can help" {...register('message')} className={`form-input eq-textarea${errors.message ? ' error' : ''}`} />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-gold eq-submit">{isSubmitting ? 'Sending\u2026' : 'Submit Enquiry'}</button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        /* W3: #E8DDD0 — warm sand. One step deeper than W2 Events/Reviews.
           Follows Social (D3) — same warm-brown family, lighter end.
           The step D3→W3 feels natural because hue is identical, only luminosity changes. */
        .eq-root { background: #E8DDD0; border-top: 1px solid rgba(180,140,90,0.14); }
        .eq-layout { display: grid; grid-template-columns: 380px 1fr; align-items: start; gap: clamp(4rem, 7vw, 8rem); padding: var(--py) var(--px); }
        .eq-h2 { font-family: var(--font-cormorant); font-size: clamp(2.2rem, 3.5vw, 3.5rem); font-weight: 300; color: #1C0D02; line-height: 1.05; letter-spacing: -0.015em; margin: 0 0 1rem; }
        .eq-h2 em { font-style: italic; font-weight: 400; color: #9A7D4A; }
        .eq-sub { font-family: var(--font-lora); font-size: 0.875rem; color: #7A5E42; line-height: 1.85; margin: 0 0 2.5rem; }

        .eq-contact-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .eq-contact-item { display: flex; align-items: flex-start; gap: 1rem; }
        .eq-contact-icon { width: 32px; height: 32px; flex-shrink: 0; border: 1px solid rgba(154,125,74,0.28); display: flex; align-items: center; justify-content: center; color: #9A7D4A; margin-top: 0.1rem; }
        .eq-contact-label { font-family: var(--font-jost); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(28,13,2,0.42); margin: 0 0 0.18rem; }
        .eq-contact-value { font-family: var(--font-lora); font-size: 0.83rem; color: #1C0D02; margin: 0; line-height: 1.5; }
        .eq-contact-link { text-decoration: none; border-bottom: 1px solid rgba(154,125,74,0.22); padding-bottom: 1px; transition: color 0.15s; }
        .eq-contact-link:hover { color: #9A7D4A; }
        .eq-deco { margin-top: 3rem; font-family: var(--font-cormorant); font-size: 5rem; font-weight: 300; font-style: italic; color: rgba(154,125,74,0.07); line-height: 1; letter-spacing: -0.02em; user-select: none; }

        .eq-root .form-input { background: #FAF7F2; border-color: rgba(180,140,90,0.3); }
        .eq-root .form-input:focus { border-color: #9A7D4A; background: #fff; box-shadow: 0 0 0 3px rgba(154,125,74,0.08); }

        .eq-form-wrap { padding-top: 0.25rem; }
        .eq-form { display: flex; flex-direction: column; gap: 1.375rem; }
        .eq-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .eq-field { display: flex; flex-direction: column; }
        .eq-opt { font-weight: 400; text-transform: none; letter-spacing: 0; opacity: 0.5; font-size: 0.6rem; }
        .eq-textarea { resize: vertical; min-height: 120px; }
        .eq-submit { width: 100%; justify-content: center; padding: 1rem; font-size: 0.7rem; margin-top: 0.25rem; }
        .eq-done { display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; padding: 3rem 0; }
        .eq-done-icon { width: 54px; height: 54px; background: rgba(154,125,74,0.1); border: 1px solid rgba(154,125,74,0.25); display: flex; align-items: center; justify-content: center; color: #9A7D4A; }
        .eq-done-h { font-family: var(--font-cormorant); font-size: 2rem; font-weight: 300; color: #1C0D02; margin: 0.5rem 0 0; }
        .eq-done-p { font-family: var(--font-lora); font-size: 0.875rem; color: #7A5E42; margin: 0; max-width: 400px; line-height: 1.8; }
        .eq-send-another { margin-top: 0.75rem; }

        @media (max-width: 900px) { .eq-layout { grid-template-columns: 1fr; gap: 3rem; } .eq-deco { display: none; } }
        @media (max-width: 580px) { .eq-row-2 { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
