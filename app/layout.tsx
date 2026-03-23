import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Lora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import ScrollRevealInit from '@/components/ui/ScrollRevealInit'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rezz.com.au'),
  title: {
    default: 'Rezz Hotel Newton | Dining, Bar & Events in South Australia',
    template: '%s | Rezz Hotel Newton',
  },
  description:
    'Rezz Hotel in Newton, South Australia — home to Cafe + Play, Z-Bar & Restaurant, Sports Bar, Gaming Lounge and Functions. Book a hotel stay or order food online today.',
  keywords: ['Rezz Hotel', 'Newton SA', 'Adelaide restaurant', 'sports bar Adelaide', 'family dining Newton', 'Z-Bar', 'Cafe Play'],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://rezz.com.au',
    siteName: 'Rezz Hotel Newton',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Rezz Hotel',
  url: 'https://rezz.com.au',
  telephone: '+61883372888',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20 Hamilton Terrace',
    addressLocality: 'Newton',
    addressRegion: 'SA',
    postalCode: '5074',
    addressCountry: 'AU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -34.875823, longitude: 138.690708 },
  servesCuisine: ['Mediterranean', 'Australian', 'Italian'],
  priceRange: '$$',
  sameAs: [
    'https://www.instagram.com/rezznewton/',
    'https://web.facebook.com/REZZNEWTONSA/',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cormorant.variable} ${jost.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <ScrollRevealInit />
      </body>
    </html>
  )
}
