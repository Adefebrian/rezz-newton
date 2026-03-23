import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, Briefcase, CalendarDays, Sparkles, Mail, Phone, Check } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Functions & Events | Rezz Hotel Newton',
  description:
    'Host your next event at Rezz Hotel Newton. Business seminars, birthdays, weddings and everything in between. Call 08 8337 2888 or email enquiries@rezz.com.au.',
}

const spaces = [
  {
    icon: Sparkles,
    name: 'Private Functions',
    capacity: 'All group sizes',
    description:
      'From intimate birthday dinners to large milestone celebrations, Rezz has the perfect space. Every function is arranged through personal consultation so your event is completely unique.',
    features: [
      'Tailored menus',
      'Full bar service',
      'Dedicated staff',
      'Flexible layouts',
    ],
  },
  {
    icon: Briefcase,
    name: 'Business Pods',
    capacity: 'Small groups',
    description:
      'Brand new to Rezz, our Business Pods are a convenient spot to meet clients face to face in a professional setting. Available for daily or hourly use with wireless connectivity, TV screens and remote printing.',
    features: [
      'Wireless connectivity',
      'TV screens',
      'Remote printing',
      'Morning / Afternoon Tea packages',
    ],
  },
  {
    icon: CalendarDays,
    name: 'Business Seminars',
    capacity: 'Corporate groups',
    description:
      'Host your next corporate seminar, team meeting or product launch at Rezz. Our team will work with you to create the right environment for a productive and memorable day.',
    features: [
      'AV equipment',
      'Catering packages',
      'Private spaces',
      'Professional setup',
    ],
  },
  {
    icon: Users,
    name: 'Milestone Events',
    capacity: '18ths to 50ths',
    description:
      'Celebrating a special birthday or anniversary? Rezz loves a milestone. Our team handles all the details so you can focus on celebrating with the people who matter most.',
    features: [
      'Custom theming',
      'Set menus available',
      'Bar packages',
      'Event coordination',
    ],
  },
]

export default function FunctionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 px-6 lg:px-8 grain overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #3D1E06 0%, #2A1608 40%, #1A0C03 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 80% 50%, rgba(200,148,42,0.12) 0%, transparent 55%)',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav
            className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-white/40 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Functions & Events</span>
          </nav>
          <div className="max-w-2xl">
            <span className="section-label text-gold">Host Your Next Event</span>
            <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-none mb-5">
              We Love Functions
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(200,148,42,0.9)' }}>
                Every One is Unique
              </span>
            </h1>
            <p className="font-lora text-white/60 text-lg leading-relaxed max-w-lg">
              From business seminars to 18th birthdays and everything in between, Rezz has the perfect
              space to make your next event truly special. Every function is arranged through personal
              consultation.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#enquire" className="btn-gold">Make an Enquiry</a>
              <a href="#spaces" className="btn-outline-white">View Spaces</a>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section id="spaces" className="py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Our Spaces"
              title="The Right Space for Every Occasion"
              subtitle="Every function at Rezz is arranged through personal consultation. No two events are the same."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaces.map((space, i) => {
              const Icon = space.icon
              return (
                <AnimatedSection key={space.name} delay={i * 80}>
                  <div className="venue-card h-full">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-3 rounded-xl bg-warm-sand flex-shrink-0">
                        <Icon size={22} className="text-brown-mid" />
                      </div>
                      <div>
                        <h3 className="font-cormorant text-2xl font-semibold text-brown-dark">
                          {space.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Users size={12} className="text-gold" aria-hidden="true" />
                          <span className="font-jost text-xs text-text-muted tracking-wide">
                            {space.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="font-lora text-sm text-text-muted leading-relaxed mb-5">
                      {space.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {space.features.map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <Check size={12} className="text-gold flex-shrink-0" aria-hidden="true" />
                          <span className="font-jost text-xs text-text-muted">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 lg:px-8 bg-warm-sand grain relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">The Process</span>
              <h2 className="section-title text-4xl">Simple from Start to Finish</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Get in Touch',
                body: 'Call us on 08 8337 2888 or email enquiries@rezz.com.au. Tell us about your event and we will get back to you promptly.',
              },
              {
                step: '02',
                title: 'Personal Consultation',
                body: 'We sit down together to understand exactly what you need — space, menu, styling, timing. Every detail, your way.',
              },
              {
                step: '03',
                title: 'We Handle the Rest',
                body: 'On the day, our team takes care of everything so you can be fully present with your guests and enjoy the occasion.',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 90}>
                <div className="text-center">
                  <p className="font-cormorant text-6xl font-light text-gold/30 leading-none mb-4">
                    {item.step}
                  </p>
                  <h3 className="font-cormorant text-2xl font-semibold text-brown-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="font-lora text-sm text-text-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section id="enquire" className="py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title text-4xl mb-5">Ready to Start Planning?</h2>
            <p className="section-body text-lg mb-8 max-w-md mx-auto">
              Call us or send an email and our events team will be in touch to discuss your next
              function at Rezz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:enquiries@rezz.com.au" className="btn-gold">
                <Mail size={16} />
                enquiries@rezz.com.au
              </a>
              <a href="tel:0883372888" className="btn-brown">
                <Phone size={16} />
                08 8337 2888
              </a>
            </div>
            <p className="font-jost text-xs text-text-muted mt-6 tracking-wide">
              We respond within one business day.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
