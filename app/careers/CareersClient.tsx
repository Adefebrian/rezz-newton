'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { jobs } from '@/data/jobs'
import type { Job } from '@/data/jobs'
import ApplyModal from '@/components/careers/ApplyModal'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CareersClient() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [modalOpen, setModalOpen]     = useState(false)

  function openModal(job: Job | null) {
    setSelectedJob(job)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    // small delay before clearing so exit animation works
    setTimeout(() => setSelectedJob(null), 300)
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-14 px-6 lg:px-8 grain overflow-hidden"
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
            <span className="text-gold">Careers</span>
          </nav>
          <span className="section-label text-gold">Work With Us</span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-none mb-4">
            Join the Rezz Family
          </h1>
          <p className="font-lora text-white/55 text-lg max-w-xl leading-relaxed">
            We are always looking for passionate, talented people. Whether you are front-of-house,
            kitchen or behind the bar, there is a place for you here.
          </p>
        </div>
      </section>

      {/* Job listings */}
      <section className="py-20 px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="mb-12">
              <span className="section-label">Current Openings</span>
              <h2 className="section-title text-4xl">Open Positions</h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <AnimatedSection key={job.id} delay={i * 70}>
                <div className="venue-card flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="font-jost text-xs font-bold tracking-widest uppercase text-gold bg-gold/10 px-3 py-1 rounded-full">
                        {job.venue}
                      </span>
                      <span
                        className={`font-jost text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${
                          job.type === 'Full Time'
                            ? 'bg-brown-deep/10 text-brown-deep'
                            : 'bg-brown-light/15 text-brown-mid'
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-brown-dark">
                      {job.title}
                    </h3>
                    {job.rate && (
                      <p className="font-jost text-sm text-text-muted mt-1">{job.rate}</p>
                    )}
                  </div>
                  <button
                    onClick={() => openModal(job)}
                    className="btn-brown flex-shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* General EOI */}
          <AnimatedSection delay={jobs.length * 70}>
            <div className="mt-10 bg-brown-dark rounded-2xl p-8 text-center grain relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 65%)',
                }}
              />
              <div className="relative z-10">
                <span className="section-label text-gold">Not Seeing Your Role?</span>
                <h3 className="font-cormorant text-3xl font-light text-white mb-3">
                  Submit an Expression of Interest
                </h3>
                <p className="font-lora text-white/55 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Do not see a position that fits? Send a general application and we will keep you on file.
                </p>
                <button onClick={() => openModal(null)} className="btn-gold">
                  Express Interest
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ApplyModal job={selectedJob} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  )
}
