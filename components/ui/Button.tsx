import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type Variant = 'gold' | 'brown' | 'outline-white' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?:    Size
  children: ReactNode
  className?: string
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
  href?: never
}

interface LinkProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as:   'a'
  href: string
}

interface NextLinkProps extends BaseProps {
  as:   'link'
  href: string
}

type Props = ButtonProps | LinkProps | NextLinkProps

const variantClasses: Record<Variant, string> = {
  'gold':          'btn-gold',
  'brown':         'btn-brown',
  'outline-white': 'btn-outline-white',
  'ghost':         'font-jost text-xs font-semibold tracking-widest uppercase text-brown-mid hover:text-gold transition-colors',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs py-2 px-4',
  md: 'text-sm py-2.5 px-6',
  lg: 'text-sm py-4 px-8',
}

export default function Button({
  variant  = 'gold',
  size     = 'md',
  children,
  className,
  ...rest
}: Props) {
  const cls = clsx(variantClasses[variant], sizeClasses[size], className)

  if (rest.as === 'a') {
    const { as: _a, ...props } = rest as LinkProps
    return <a className={cls} {...props}>{children}</a>
  }

  if (rest.as === 'link') {
    const { as: _a, href, ...props } = rest as NextLinkProps
    return <Link href={href} className={cls} {...(props as object)}>{children}</Link>
  }

  const { as: _a, ...props } = rest as ButtonProps
  return <button className={cls} {...props}>{children}</button>
}
