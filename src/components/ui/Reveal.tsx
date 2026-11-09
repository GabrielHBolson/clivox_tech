import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface RevealProps {
  as?: 'div' | 'li' | 'article'
  delay?: number
  variant?: 'line'
  className?: string
  children?: ReactNode
}

export function Reveal({ as = 'div', delay = 0, variant, className, children }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined
  return createElement(
    as,
    { ref, className, style, 'data-reveal': 'pending', 'data-reveal-variant': variant },
    children,
  )
}
