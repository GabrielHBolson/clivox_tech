import { processContent as content } from '../../data/content'
import { processSteps } from '../../data/process'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  return (
    <section className="bg-white py-24 lg:py-36" aria-label={content.eyebrow}>
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="relative mt-14 lg:mt-24">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-graphite-200 lg:block" />
          <Reveal variant="line" className="absolute inset-x-0 top-0 hidden h-0.5 bg-green-500 lg:block" />
          <ol className="grid lg:grid-cols-4 lg:gap-10">
            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 160}
                className="relative border-l border-graphite-200 pb-12 pl-7 last:pb-0 lg:border-l-0 lg:pt-10 lg:pb-0 lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[5px] size-[9px] bg-green-500 lg:-top-[4px] lg:left-0"
                />
                <span className="block font-display text-6xl leading-none font-light tracking-tight text-graphite-300 lg:text-7xl">
                  {index + 1}
                </span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite-600">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
