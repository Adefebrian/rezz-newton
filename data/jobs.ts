export interface Job {
  id: number
  title: string
  type: 'Full Time' | 'Casual' | 'Part Time'
  venue: string
  rate: string | null
  slug: string
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Dishwasher',
    type: 'Full Time',
    venue: 'REZZ',
    rate: null,
    slug: 'dishwasher-full-time',
  },
  {
    id: 2,
    title: 'Senior Pizza Chef',
    type: 'Full Time',
    venue: 'REZZ',
    rate: null,
    slug: 'senior-pizza-chef-full-time',
  },
  {
    id: 3,
    title: 'Junior Food Attendant',
    type: 'Casual',
    venue: 'REZZ',
    rate: null,
    slug: 'junior-food-attendant-casual',
  },
  {
    id: 4,
    title: 'Food & Beverage Attendant',
    type: 'Casual',
    venue: 'REZZ',
    rate: 'From $31.23/hr',
    slug: 'food-beverage-attendant-casual',
  },
]
