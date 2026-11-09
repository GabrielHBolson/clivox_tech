import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'outlineOnDark' | 'dark' | 'outlineOnLight'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition duration-200 ease-brand active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-green-400 text-graphite-950 hover:bg-green-300',
  outlineOnDark: 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5',
  dark: 'bg-graphite-950 text-white hover:bg-graphite-800',
  outlineOnLight: 'border border-graphite-300 text-graphite-950 hover:border-graphite-950',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

function buttonClasses({ variant = 'primary', size = 'md', className }: StyleProps): string {
  return cn(base, variants[variant], sizes[size], className)
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />
}

interface ButtonLinkProps extends StyleProps {
  to: string
  children: ReactNode
}

export function ButtonLink({ to, variant, size, className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, className })}>
      {children}
    </Link>
  )
}

interface ExternalButtonProps extends StyleProps {
  href: string
  children: ReactNode
}

export function ExternalButton({ href, variant, size, className, children }: ExternalButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant, size, className })}>
      {children}
    </a>
  )
}
