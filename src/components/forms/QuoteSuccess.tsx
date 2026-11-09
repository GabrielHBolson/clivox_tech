import { useEffect, useRef } from 'react'
import { ButtonLink } from '../ui/Button'

export function QuoteSuccess() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.closest('section')?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <div className="animate-fade-up py-8 sm:py-12">
      <span aria-hidden="true" className="block h-1 w-12 bg-green-500" />
      <h2 ref={headingRef} tabIndex={-1} className="mt-7 text-4xl font-medium tracking-tight outline-none">
        Recebemos sua solicitação.
      </h2>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-graphite-600">
        Obrigado por contar sobre o seu projeto. Vamos analisar as informações e entrar em contato pelos dados que você
        informou.
      </p>
      <ButtonLink to="/" variant="dark" size="lg" className="mt-9 max-sm:w-full">
        Voltar para o início
      </ButtonLink>
    </div>
  )
}
