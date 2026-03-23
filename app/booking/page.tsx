import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import BookingForm from '@/components/booking/BookingForm'

export const metadata: Metadata = {
  title: 'Book a Table | Rezz Hotel Newton',
  description: 'Reserve your table at Rezz Hotel in Newton, South Australia. Dining, events and more — book online today.',
  openGraph: {
    title: 'Book a Table | Rezz Hotel Newton',
    description: 'Reserve your table at Rezz Hotel in Newton, SA.',
    url: 'https://rezz.com.au/booking',
  },
}

export default function BookingPage() {
  return (
    <>
      {/* Hero banner */}
      <section
        className="relative pt-36 pb-16 px-6 lg:px-8 grain overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #3D1E06 0%, #2A1608 40%, #1A0C03 100%)' }}
      >


        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Book a Table</span>
          </nav>

          <span className="section-label text-gold">Reserve Your Experience</span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-none mb-4">
            Book a Table
          </h1>
          <p className="font-lora text-white/55 text-lg max-w-xl">
            Secure your seat at any of our venues. We look forward to welcoming you.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 px-6 lg:px-8 bg-cream">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-warm-sand p-8 md:p-12">
            <div className="mb-8">
              <h2 className="font-cormorant text-3xl font-semibold text-brown-dark mb-2">
                Reservation Details
              </h2>
              <p className="font-lora text-sm text-text-muted">
                All fields marked as required must be filled in. We will confirm your booking by email.
              </p>
            </div>
            <BookingForm />
          </div>

          {/* Reassurance strip */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Free cancellation', sub: 'Up to 24 hrs before' },
              { label: 'Instant confirmation', sub: 'By email' },
              { label: 'No deposit required', sub: 'Pay on the day' },
            ].map(({ label, sub }) => (
              <div key={label} className="bg-warm-sand/60 rounded-xl py-4 px-3">
                <p className="font-jost text-xs font-bold text-brown-deep tracking-wide mb-0.5">{label}</p>
                <p className="font-lora text-xs text-text-muted">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
