'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, CheckCircle2, Briefcase } from 'lucide-react'
import type { Job } from '@/data/jobs'

const schema = z.object({
  name:        z.string().min(2, 'Enter your full name'),
  email:       z.string().email('Enter a valid email'),
  phone:       z.string().min(8, 'Enter a phone number'),
  role:        z.string().optional(),
  why:         z.string().min(20, 'Tell us a bit more (20 characters minimum)'),
})
type Fields = z.infer<typeof schema>

interface Props {
  job: Job | null
  onClose: () => void
}

export default function ApplyModal({ job, onClose }: Props) {
  const [done, setDone] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { role: job?.title ?? '' },
  })

  function onSubmit(_data: Fields) {
    return new Promise<void>(res => setTimeout(() => { setDone(true); res() }, 900))
  }

  // Close on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={job ? `Apply for ${job.title}` : 'Express interest'}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brown-dark/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-brown-deep px-8 py-6 grain flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="section-label text-gold-light">Join Our Team</span>
              <h2 className="font-cormorant text-3xl font-light text-white">
                {job ? job.title : 'Express Interest'}
              </h2>
              {job && (
                <p className="font-jost text-xs text-white/50 mt-1 tracking-wider uppercase">
                  {job.type} &middot; {job.venue}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-1 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form / success */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {done ? (
            <div className="flex flex-col items-center gap-5 text-center py-8">
              <div className="p-4 rounded-full bg-gold/15">
                <CheckCircle2 size={40} className="text-gold" />
              </div>
              <div>
                <p className="font-cormorant text-2xl font-semibold text-brown-dark mb-2">
                  Application Submitted!
                </p>
                <p className="font-lora text-sm text-text-muted leading-relaxed">
                  Thanks for your interest in joining the Rezz team.
                  We will review your application and be in touch shortly.
                </p>
              </div>
              <button onClick={onClose} className="btn-brown mt-2">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Role field (for general EOI) */}
              {!job && (
                <div>
                  <label htmlFor="a-role" className="form-label">Role Interested In</label>
                  <select id="a-role" {...register('role')} className="form-input">
                    <option value="">Select a role type</option>
                    <option>Kitchen</option>
                    <option>Bar</option>
                    <option>Front of House</option>
                    <option>Management</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="a-name" className="form-label">Full Name</label>
                  <input
                    id="a-name"
                    type="text"
                    autoComplete="name"
                    {...register('name')}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="a-phone" className="form-label">Phone</label>
                  <input
                    id="a-phone"
                    type="tel"
                    autoComplete="tel"
                    {...register('phone')}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    aria-required="true"
                  />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="a-email" className="form-label">Email Address</label>
                <input
                  id="a-email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  aria-required="true"
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              {/* CV upload */}
              <div>
                <span className="form-label">Upload CV <span className="normal-case text-text-muted font-normal">(optional)</span></span>
                <label
                  htmlFor="a-cv"
                  className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-tan rounded-xl px-5 py-4 hover:border-gold transition-colors duration-200 group"
                >
                  <Upload size={18} className="text-text-muted group-hover:text-gold transition-colors" />
                  <span className="font-lora text-sm text-text-muted group-hover:text-brown-mid transition-colors">
                    {fileName ?? 'Click to upload PDF or Word document'}
                  </span>
                  <input
                    id="a-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={e => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="a-why" className="form-label">
                  Why do you want to work at Rezz?
                </label>
                <textarea
                  id="a-why"
                  rows={4}
                  placeholder="Tell us a bit about yourself and what draws you to Rezz..."
                  {...register('why')}
                  className={`form-input resize-none ${errors.why ? 'error' : ''}`}
                  aria-required="true"
                />
                {errors.why && <p className="form-error">{errors.why.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="btn-gold w-full justify-center py-4"
              >
                <Briefcase size={16} />
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
