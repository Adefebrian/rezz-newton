import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Rezz Hotel Newton',
  description:
    'Get in touch with Rezz Hotel Newton. Reservations, functions, general enquiries — our team is here for you.',
}

export default function ContactPage() {
  return <ContactClient />
}
