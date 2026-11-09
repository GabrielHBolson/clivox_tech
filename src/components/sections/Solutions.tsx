import { useRef, useState, type KeyboardEvent } from 'react'
import { solutionsContent as content } from '../../data/content'
import { QUOTE_PATH } from '../../data/navigation'
import { services } from '../../data/services'
import { solutions } from '../../data/solutions'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const tabId = (id: string) => `desafio-${id}`
const PANEL_ID = 'desafio-painel'

export function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = solutions[activeIndex]
  const service = services.find((item) => item.id === active.serviceId)

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = solutions.length - 1
    const targets: Record<string, number> = {
      ArrowDown: activeIndex === last ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    }
    const next = targets[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="solucoes" className="bg-white py-24 lg:py-36">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

        <Reveal className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div role="tablist" aria-label="Desafios do negócio" aria-orientation="vertical" className="lg:col-span-5">
            {solutions.map((solution, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={solution.id}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  id={tabId(solution.id)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'relative block w-full border-t border-graphite-200 py-5 pr-4 pl-5 text-left text-lg leading-snug transition-colors duration-200 last:border-b',
                    isActive ? 'font-medium text-graphite-950' : 'text-graphite-500 hover:text-graphite-950',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 bottom-0 left-0 w-0.5 origin-top bg-green-500 transition-transform duration-300 ease-brand',
                      isActive ? 'scale-y-100' : 'scale-y-0',
                    )}
                  />
                  {solution.challenge}
                </button>
              )
            })}
          </div>

          <div
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={tabId(active.id)}
            className="relative overflow-hidden rounded-2xl bg-graphite-950 p-7 text-white sm:p-10 lg:col-span-7 lg:p-12"
          >
            <div aria-hidden="true" className="absolute -top-32 -right-32 size-80 rounded-full bg-green-500/15 blur-3xl" />
            <div key={active.id} className="relative animate-fade-up">
              <p className="text-2xl leading-snug font-medium tracking-tight sm:text-[1.75rem]">{active.diagnosis}</p>
              <h3 className="mt-9 font-sans text-sm font-medium text-green-400">{content.panelLabel}</h3>
              <ul className="mt-4">
                {active.approach.map((item) => (
                  <li key={item} className="border-t border-white/10 py-3.5 text-graphite-200">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-graphite-400">
                  {content.serviceLabel}: <span className="font-medium text-white">{service?.shortTitle}</span>
                </p>
                <ButtonLink to={`${QUOTE_PATH}?servico=${active.serviceId}`} className="max-sm:w-full">
                  {content.ctaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
