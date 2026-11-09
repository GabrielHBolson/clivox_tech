import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, tone = 'light', className }: SectionHeadingProps) {
  const isDark = tone === 'dark'
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      <p className={cn('text-sm font-medium', isDark ? 'text-green-400' : 'text-green-700')}>{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-[3.5rem]">{title}</h2>
      {description && (
        <p className={cn('mt-6 text-lg leading-relaxed', isDark ? 'text-graphite-300' : 'text-graphite-600')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
