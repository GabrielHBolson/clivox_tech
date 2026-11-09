import { servicesContent as content } from '../../data/content'
import { QUOTE_PATH } from '../../data/navigation'
import { services } from '../../data/services'
import type { Service } from '../../types'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceVisual } from './ServiceVisual'

function ServicePanel({ service, index }: { service: Service; index: number }) {
  const isEven = index % 2 === 1
  return (
    <Reveal
      as="article"
      className="group grid overflow-hidden rounded-2xl border border-graphite-200 bg-white transition-colors duration-300 hover:border-graphite-400 lg:grid-cols-12"
    >
      <div className="flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14">
        <span className="font-display text-sm text-green-700">0{index + 1}</span>
        <h3 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">{service.title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-graphite-600">{service.description}</p>
        <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-baseline gap-3 border-t border-graphite-100 py-3 text-[15px]">
              <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-2px] bg-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink to={`${QUOTE_PATH}?servico=${service.id}`} variant="dark" className="max-sm:w-full">
            {service.ctaLabel}
          </ButtonLink>
        </div>
      </div>
      <div
        className={cn(
          'flex min-h-72 items-center justify-center bg-graphite-950 p-6 lg:col-span-5',
          isEven && 'lg:order-first',
        )}
      >
        <div className="w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03]">
          <ServiceVisual serviceId={service.id} />
        </div>
      </div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section id="servicos" className="bg-graphite-50 py-24 lg:py-36">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-14 space-y-6 lg:mt-20">
          {services.map((service, index) => (
            <ServicePanel key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
