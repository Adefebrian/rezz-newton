'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Users } from 'lucide-react'

const memberSchema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
const guestSchema = z.object({
  name:  z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
})
type MemberFields = z.infer<typeof memberSchema>
type GuestFields  = z.infer<typeof guestSchema>

interface Props {
  onSuccess: () => void
}

export default function AuthModal({ onSuccess }: Props) {
  const [tab, setTab] = useState<'member' | 'guest'>('guest')

  const memberForm = useForm<MemberFields>({ resolver: zodResolver(memberSchema) })
  const guestForm  = useForm<GuestFields>({ resolver: zodResolver(guestSchema) })

  function submitMember(_d: MemberFields) {
    return new Promise<void>(res => setTimeout(() => { onSuccess(); res() }, 700))
  }
  function submitGuest(_d: GuestFields) {
    return new Promise<void>(res => setTimeout(() => { onSuccess(); res() }, 700))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to order"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-brown-dark/80 backdrop-blur-sm"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-brown-deep px-8 py-7 grain">
          <span className="section-label text-gold-light">Order & Pick Up</span>
          <h2 className="font-cormorant text-3xl font-light text-white">
            Welcome to Rezz
          </h2>
          <p className="font-lora text-white/55 text-sm mt-1">
            Sign in or continue as a guest to browse our menu.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-warm-sand">
          {([
            { id: 'guest',  label: 'Guest',  icon: Users },
            { id: 'member', label: 'Member', icon: User },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-jost text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
                tab === id
                  ? 'text-brown-deep border-b-2 border-gold -mb-px'
                  : 'text-text-muted hover:text-brown-mid'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Forms */}
        <div className="px-8 py-7">
          <AnimatePresence mode="wait">
            {tab === 'guest' ? (
              <motion.form
                key="guest"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                onSubmit={guestForm.handleSubmit(submitGuest)}
                noValidate
                className="space-y-4"
              >
                <div>
                  <label htmlFor="g-name" className="form-label">Your Name</label>
                  <input
                    id="g-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    {...guestForm.register('name')}
                    className={`form-input ${guestForm.formState.errors.name ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {guestForm.formState.errors.name && (
                    <p className="form-error">{guestForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="g-email" className="form-label">Email Address</label>
                  <input
                    id="g-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@email.com"
                    {...guestForm.register('email')}
                    className={`form-input ${guestForm.formState.errors.email ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {guestForm.formState.errors.email && (
                    <p className="form-error">{guestForm.formState.errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={guestForm.formState.isSubmitting}
                  aria-busy={guestForm.formState.isSubmitting}
                  className="btn-gold w-full justify-center py-3.5 mt-2"
                >
                  {guestForm.formState.isSubmitting ? 'Continuing...' : 'Continue as Guest'}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="member"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                onSubmit={memberForm.handleSubmit(submitMember)}
                noValidate
                className="space-y-4"
              >
                <div>
                  <label htmlFor="m-email" className="form-label">Email Address</label>
                  <input
                    id="m-email"
                    type="email"
                    autoComplete="email"
                    placeholder="member@email.com"
                    {...memberForm.register('email')}
                    className={`form-input ${memberForm.formState.errors.email ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {memberForm.formState.errors.email && (
                    <p className="form-error">{memberForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="m-pass" className="form-label">Password</label>
                  <input
                    id="m-pass"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...memberForm.register('password')}
                    className={`form-input ${memberForm.formState.errors.password ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {memberForm.formState.errors.password && (
                    <p className="form-error">{memberForm.formState.errors.password.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={memberForm.formState.isSubmitting}
                  aria-busy={memberForm.formState.isSubmitting}
                  className="btn-brown w-full justify-center py-3.5 mt-2"
                >
                  {memberForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                </button>
                <p className="font-lora text-xs text-text-muted text-center">
                  Not a member?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('guest')}
                    className="text-brown-mid hover:text-gold transition-colors underline"
                  >
                    Continue as guest
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
