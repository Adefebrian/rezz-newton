'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Sparkles } from 'lucide-react'

const schema = z.object({ name: z.string().min(2, 'Enter your name'), email: z.string().email('Enter a valid email') })
type Fields = z.infer<typeof schema>
const perks = ['First access to new events', 'Exclusive member offers', 'Monthly specials & menus']

export default function NewsletterSignup() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({ resolver: zodResolver(schema) })
  function onSubmit(_data: Fields) { return new Promise<void>(res => setTimeout(() => { setDone(true); res() }, 800)) }

  return (
    <section className="nl-root" aria-labelledby="nl-heading">
      <div className="nl-glow" aria-hidden="true" />
      <div className="nl-inner">
        <div className="nl-left">
          <div className="nl-eyebrow"><span className="nl-bar" />Stay Connected</div>
          <h2 id="nl-heading" className="nl-h2">Stay in <em>the Loop</em></h2>
          <p className="nl-body">Be the first to hear about events, special offers and what&apos;s on at Rezz. No spam, ever.</p>
          <ul className="nl-perks" aria-label="Newsletter benefits">
            {perks.map(p => (
              <li key={p} className="nl-perk-item">
                <Sparkles size={9} className="nl-perk-icon" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="nl-right">
          {done ? (
            <div className="nl-done">
              <div className="nl-done-icon"><CheckCircle2 size={24} /></div>
              <p className="nl-done-h">You&apos;re on the list!</p>
              <p className="nl-done-p">We&apos;ll be in touch soon with the latest from Rezz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="nl-form">
              <div className="nl-fields">
                <div className="nl-field">
                  <label htmlFor="nl-name" className="nl-label">Your Name</label>
                  <input id="nl-name" type="text" autoComplete="name" placeholder="First name" {...register('name')} className={`nl-input${errors.name ? ' nl-err-input' : ''}`} />
                  {errors.name && <p className="nl-err">{errors.name.message}</p>}
                </div>
                <div className="nl-field">
                  <label htmlFor="nl-email" className="nl-label">Email Address</label>
                  <input id="nl-email" type="email" autoComplete="email" placeholder="your@email.com" {...register('email')} className={`nl-input${errors.email ? ' nl-err-input' : ''}`} />
                  {errors.email && <p className="nl-err">{errors.email.message}</p>}
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-gold nl-submit">{isSubmitting ? 'Subscribing\u2026' : 'Subscribe Now'}</button>
              <p className="nl-disclaimer">By subscribing you agree to receive news and offers from Rezz Hotel. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        /* D4: #140A02 — mirrors Hero. Bookends the page symmetrically.
           Follows Enquiry (W3 #E8DDD0) — same warm family, darkest end. */
        .nl-root { background: #140A02; position: relative; overflow: hidden; border-top: 1px solid rgba(200,169,110,0.1); }
        .nl-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 12% 55%, rgba(200,169,110,0.06) 0%, transparent 60%); }
        .nl-inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 7rem); align-items: center; padding: var(--py) var(--px); position: relative; z-index: 1; }

        .nl-eyebrow { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-jost); font-size: 0.52rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(200,169,110,0.7); margin-bottom: 1.25rem; }
        .nl-bar { display: block; width: 26px; height: 1px; background: rgba(200,169,110,0.45); flex-shrink: 0; }
        .nl-h2 { font-family: var(--font-cormorant); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: #EAE0D0; line-height: 1.05; letter-spacing: -0.015em; margin: 0 0 1.25rem; }
        .nl-h2 em { font-style: italic; font-weight: 400; color: #C8A96E; }
        .nl-body { font-family: var(--font-lora); font-size: 0.875rem; color: rgba(234,224,208,0.48); line-height: 1.85; margin: 0 0 2rem; }
        .nl-perks { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
        .nl-perk-item { display: flex; align-items: center; gap: 0.625rem; font-family: var(--font-jost); font-size: 0.66rem; font-weight: 400; letter-spacing: 0.06em; color: rgba(234,224,208,0.48); }
        .nl-perk-icon { color: #C8A96E; flex-shrink: 0; }

        .nl-form { display: flex; flex-direction: column; gap: 1.125rem; }
        .nl-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .nl-field { display: flex; flex-direction: column; }
        .nl-label { display: block; font-family: var(--font-jost); font-size: 0.6rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(234,224,208,0.55); margin-bottom: 0.45rem; }
        .nl-input { width: 100%; padding: 0.8rem 1rem; font-family: var(--font-lora); font-size: 0.875rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(234,224,208,0.1); color: #EAE0D0; outline: none; transition: border-color 0.2s, background 0.2s; border-radius: 0; }
        .nl-input::placeholder { color: rgba(234,224,208,0.28); }
        .nl-input:focus { border-color: rgba(200,169,110,0.42); background: rgba(255,255,255,0.07); }
        .nl-err-input { border-color: #d95050; }
        .nl-err { font-family: var(--font-jost); font-size: 0.63rem; color: #d95050; margin-top: 0.28rem; }
        .nl-submit { width: 100%; justify-content: center; padding: 0.95rem; font-size: 0.7rem; }
        .nl-disclaimer { font-family: var(--font-jost); font-size: 0.54rem; color: rgba(234,224,208,0.28); letter-spacing: 0.04em; line-height: 1.6; margin: 0; }

        .nl-done { display: flex; flex-direction: column; gap: 0.875rem; }
        .nl-done-icon { width: 50px; height: 50px; background: rgba(200,169,110,0.08); border: 1px solid rgba(200,169,110,0.18); display: flex; align-items: center; justify-content: center; color: #C8A96E; }
        .nl-done-h { font-family: var(--font-cormorant); font-size: 1.8rem; font-weight: 300; color: #EAE0D0; margin: 0.5rem 0 0; }
        .nl-done-p { font-family: var(--font-lora); font-size: 0.875rem; color: rgba(234,224,208,0.5); margin: 0; line-height: 1.8; }

        @media (max-width: 768px) { .nl-inner { grid-template-columns: 1fr; gap: 3rem; } .nl-fields { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
