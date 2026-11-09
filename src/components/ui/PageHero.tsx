import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeroProps {
  eyebrow?: string
  title: string
  children?: ReactNode
}

/** Abertura escura das páginas internas. */
export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-graphite-950 text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <Container className="pt-36 pb-16 lg:pt-44 lg:pb-20">
        {eyebrow && <p className="text-sm font-medium text-green-400">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children}
      </Container>
    </div>
  )
}
