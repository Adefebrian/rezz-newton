'use client'

import { menuCategories } from '@/data/menu'

interface Props {
  activeCategory: string
  onSelect: (id: string) => void
}

const groups = ['DRINKS', 'COCKTAILS', 'WINE', 'BEVERAGES', 'FOOD']

export default function CategorySidebar({ activeCategory, onSelect }: Props) {
  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-6 pb-8">
        {groups.map(group => (
          <div key={group}>
            <p className="font-jost text-xs font-bold tracking-widest uppercase text-text-muted/50 mb-2 px-3">
              {group}
            </p>
            <ul className="space-y-0.5">
              {menuCategories
                .filter(c => c.group === group)
                .map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => onSelect(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-jost text-sm transition-all duration-150 ${
                        activeCategory === cat.id
                          ? 'bg-gold/15 text-brown-deep font-semibold'
                          : 'text-text-muted hover:bg-warm-sand hover:text-brown-mid'
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
