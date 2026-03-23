import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Rezz Hotel Newton',
}

export default function PrivacyPage() {
  return (
    <>
      <section
        className="pt-36 pb-14 px-6 lg:px-8 grain"
        style={{ background: 'linear-gradient(135deg, var(--brown-dark) 0%, var(--brown-deep) 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Privacy Policy</span>
          </nav>
          <h1 className="font-cormorant text-5xl font-light text-white">Privacy Policy</h1>
          <p className="font-lora text-white/50 mt-2 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 bg-cream">
        <div className="max-w-3xl mx-auto prose prose-stone">
          <div className="font-lora text-text-muted space-y-6 text-base leading-relaxed">
            <p>
              Rezz Hotel (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal information
              in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles.
            </p>
            <h2 className="font-cormorant text-2xl font-semibold text-brown-dark">
              Information We Collect
            </h2>
            <p>
              We collect personal information you provide when making a booking, enquiry or newsletter
              subscription. This may include your name, email address, phone number and dining preferences.
            </p>
            <h2 className="font-cormorant text-2xl font-semibold text-brown-dark">
              How We Use Your Information
            </h2>
            <p>
              Your information is used solely to process your requests, communicate with you regarding
              your booking or enquiry, and (with your consent) to send you updates about Rezz Hotel.
              We do not sell or share your data with third parties for marketing purposes.
            </p>
            <h2 className="font-cormorant text-2xl font-semibold text-brown-dark">
              Contact
            </h2>
            <p>
              For any privacy-related enquiries, contact us at{' '}
              <a href="mailto:admin@rezz.com.au" className="text-gold hover:text-brown-mid transition-colors">
                admin@rezz.com.au
              </a>{' '}
              or call 08 8337 2888.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
