import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import OrderClient from './OrderClient'

export const metadata: Metadata = {
  title: 'Order & Pick Up | Rezz Hotel Newton',
  description:
    'Order food and drinks from Rezz Hotel Newton for pick up. Browse our full menu including beer, cocktails, pizza, steak and more.',
}

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-14 px-6 lg:px-8 grain overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #3D1E06 0%, #2A1608 40%, #1A0C03 100%)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Order & Pick Up</span>
          </nav>
          <span className="section-label text-gold">Browse & Order</span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-none mb-4">
            Order & Pick Up
          </h1>
          <p className="font-lora text-white/55 text-lg max-w-lg">
            Browse our full menu, add to your cart and collect from the bar when ready.
          </p>
        </div>
      </section>

      {/* Main order section — client component handles auth gate + menu */}
      <section className="py-12 px-6 lg:px-8 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto">
          <OrderClient />
        </div>
      </section>
    </>
  )
}
