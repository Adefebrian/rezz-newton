'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Plus, Minus, X,
  ShoppingBag, CheckCircle2, Search, ChevronDown,
} from 'lucide-react'
import { menuItems, menuCategories } from '@/data/menu'
import type { MenuItem } from '@/data/menu'
import CategorySidebar from './CategorySidebar'

interface CartItem extends MenuItem { qty: number }

const groups = ['DRINKS', 'COCKTAILS', 'WINE', 'BEVERAGES', 'FOOD']

export default function MenuGrid() {
  const [cart,          setCart]        = useState<CartItem[]>([])
  const [cartOpen,      setCartOpen]    = useState(false)
  const [orderDone,     setOrderDone]   = useState(false)
  const [search,        setSearch]      = useState('')
  const [activeCategory,setActive]      = useState('tap-beer')
  const [mobileGroup,   setMobileGroup] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  // Auto-highlight sidebar as user scrolls
  useEffect(() => {
    const catIds = menuCategories.map(c => c.id)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Object.keys(sectionRefs.current).find(
              k => sectionRefs.current[k] === entry.target
            )
            if (id) setActive(id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    catIds.forEach(id => {
      const el = sectionRefs.current[id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [search]) // re-run when search clears

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const found = prev.find(c => c.id === item.id)
      if (found) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => {
      const found = prev.find(c => c.id === id)
      if (!found) return prev
      if (found.qty === 1) return prev.filter(c => c.id !== id)
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c)
    })
  }, [])

  const scrollTo = useCallback((catId: string) => {
    setActive(catId)
    const el = sectionRefs.current[catId]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 108
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const filtered = search.trim()
    ? menuItems.filter(
        i =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase())
      )
    : null

  const getQty = (id: number) => cart.find(c => c.id === id)?.qty ?? 0

  return (
    <div className="relative">
      {/* Floating cart FAB */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-gold py-3 px-5 shadow-2xl"
        aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
      >
        <ShoppingCart size={18} />
        <span>Cart</span>
        {totalItems > 0 && (
          <span
            className="ml-1 bg-brown-dark text-gold text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            aria-hidden="true"
          >
            {totalItems}
          </span>
        )}
      </button>

      <div className="flex gap-10 items-start">
        {/* Desktop sidebar */}
        <CategorySidebar activeCategory={activeCategory} onSelect={scrollTo} />

        {/* Content area */}
        <div className="flex-1 min-w-0">

          {/* Search bar */}
          <div className="relative mb-8">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search the menu..."
              className="form-input pl-10"
              aria-label="Search menu items"
            />
          </div>

          {/* Mobile category accordion */}
          <div className="lg:hidden mb-6 space-y-2">
            {groups.map(group => (
              <div key={group} className="bg-white rounded-xl border border-warm-sand overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileGroup(prev => prev === group ? null : group)}
                  className="w-full flex items-center justify-between px-4 py-3 font-jost text-xs font-bold tracking-widest uppercase text-brown-deep"
                  aria-expanded={mobileGroup === group ? 'true' : 'false'}
                >
                  {group}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileGroup === group ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {mobileGroup === group && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 px-4 pb-4">
                        {menuCategories
                          .filter(c => c.group === group)
                          .map(cat => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => { scrollTo(cat.id); setMobileGroup(null) }}
                              className={`px-3 py-1.5 rounded-full font-jost text-xs transition-all ${
                                activeCategory === cat.id
                                  ? 'bg-gold text-brown-dark font-semibold'
                                  : 'bg-warm-sand text-text-muted hover:bg-tan/40'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Search results */}
          {filtered ? (
            <div>
              <p className="font-jost text-sm text-text-muted mb-5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
              </p>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map(item => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      qty={getQty(item.id)}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="font-cormorant text-2xl text-brown-dark mb-2">Nothing found</p>
                  <p className="font-lora text-sm text-text-muted">
                    Try a different keyword or browse the categories.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Full menu by group */
            groups.map(group => (
              <div key={group} className="mb-14">
                {/* Group divider */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex-1 h-px bg-warm-sand" />
                  <span className="font-jost text-xs font-bold tracking-[0.2em] uppercase text-text-muted/45">
                    {group}
                  </span>
                  <div className="flex-1 h-px bg-warm-sand" />
                </div>

                {menuCategories
                  .filter(c => c.group === group)
                  .map(cat => {
                    const items = menuItems.filter(i => i.category === cat.id)
                    if (items.length === 0) return null
                    return (
                      <div
                        key={cat.id}
                        ref={el => { sectionRefs.current[cat.id] = el }}
                        className="mb-10 scroll-mt-28"
                      >
                        <h3 className="font-cormorant text-2xl font-semibold text-brown-dark mb-5 pb-2.5 border-b border-warm-sand">
                          {cat.label}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {items.map(item => (
                            <MenuCard
                              key={item.id}
                              item={item}
                              qty={getQty(item.id)}
                              onAdd={addToCart}
                              onRemove={removeFromCart}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brown-dark/65 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Your order"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-warm-sand">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={19} className="text-brown-deep" />
                  <h2 className="font-cormorant text-2xl font-semibold text-brown-dark">
                    Your Order
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="p-2 -mr-1 text-text-muted hover:text-brown-dark transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {orderDone ? (
                  <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-8">
                    <div className="p-4 rounded-full bg-gold/12">
                      <CheckCircle2 size={40} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-cormorant text-2xl font-semibold text-brown-dark mb-2">
                        Order Placed!
                      </p>
                      <p className="font-lora text-sm text-text-muted leading-relaxed">
                        Your order is being prepared. Collect from the bar when ready.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setCart([]); setOrderDone(false); setCartOpen(false) }}
                      className="btn-brown mt-2"
                    >
                      Start New Order
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                    <div className="w-14 h-14 rounded-full bg-warm-sand flex items-center justify-center">
                      <ShoppingBag size={22} className="text-text-muted" />
                    </div>
                    <p className="font-cormorant text-xl text-brown-dark">Your cart is empty</p>
                    <p className="font-lora text-sm text-text-muted max-w-xs">
                      Add items from the menu to get started.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-warm-sand/60">
                    {cart.map(item => (
                      <li key={item.id} className="flex items-start gap-4 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-jost text-sm font-semibold text-brown-dark leading-snug">
                            {item.name}
                          </p>
                          <p className="font-lora text-xs text-text-muted mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                          <p className="font-jost text-sm font-bold text-gold mt-1.5">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-full border border-warm-sand flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-colors"
                            aria-label={`Remove one ${item.name}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-jost text-sm font-bold w-5 text-center text-brown-dark">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-brown-deep hover:bg-gold hover:text-brown-dark transition-colors"
                            aria-label={`Add another ${item.name}`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && !orderDone && (
                <div className="px-6 py-5 border-t border-warm-sand bg-cream/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-jost text-xs font-bold uppercase tracking-widest text-text-muted">
                      Total
                    </span>
                    <span className="font-cormorant text-3xl font-semibold text-brown-dark">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderDone(true)}
                    className="btn-gold w-full justify-center py-4"
                  >
                    Place Order
                  </button>
                  <p className="font-jost text-xs text-text-muted text-center">
                    Collect from the bar when your order is ready.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Menu item card ── */
function MenuCard({
  item, qty, onAdd, onRemove,
}: {
  item: MenuItem
  qty: number
  onAdd: (i: MenuItem) => void
  onRemove: (id: number) => void
}) {
  return (
    <div className="bg-white border border-warm-sand rounded-xl p-4 flex items-start justify-between gap-3 hover:border-tan/70 hover:shadow-sm transition-all duration-150 group">
      <div className="flex-1 min-w-0">
        <p className="font-jost text-sm font-semibold text-brown-dark group-hover:text-brown-deep transition-colors leading-snug">
          {item.name}
        </p>
        <p className="font-lora text-xs text-text-muted mt-0.5 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <p className="font-jost text-sm font-bold text-gold mt-2">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex-shrink-0 flex items-center gap-1.5 mt-0.5">
        {qty > 0 && (
          <>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="w-7 h-7 rounded-full border border-warm-sand flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-colors"
              aria-label={`Remove one ${item.name}`}
            >
              <Minus size={12} />
            </button>
            <span className="font-jost text-sm font-bold w-5 text-center text-brown-dark">
              {qty}
            </span>
          </>
        )}
        <button
          type="button"
          onClick={() => onAdd(item)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
            qty > 0
              ? 'bg-gold text-brown-dark hover:bg-gold-light'
              : 'bg-warm-sand text-brown-mid hover:bg-gold hover:text-brown-dark'
          }`}
          aria-label={qty > 0 ? `Add another ${item.name}` : `Add ${item.name} to cart`}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
