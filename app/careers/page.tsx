import type { Metadata } from 'next'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: 'Careers | Work With Us | Rezz Hotel Newton',
  description:
    'Join the team at Rezz Hotel Newton. Browse current job openings including kitchen, bar and hospitality roles.',
}

export default function CareersPage() {
  return <CareersClient />
}
