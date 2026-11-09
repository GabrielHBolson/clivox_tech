import { introContent as content } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function Intro() {
  return (
    <section aria-labelledby="apresentacao-titulo" className="bg-white py-24 lg:py-40">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-sm font-medium text-green-700">{content.eyebrow}</p>
            <h2
              id="apresentacao-titulo"
              className="mt-4 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-[4rem]"
            >
              {content.title}
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lg leading-relaxed text-graphite-600">{content.description}</p>
          </Reveal>
        </div>

        <ol className="mt-16 grid border-t border-graphite-200 md:grid-cols-3 lg:mt-24">
          {content.outcomes.map((outcome, index) => (
            <Reveal
              as="li"
              key={outcome.title}
              delay={index * 90}
              className="border-b border-graphite-200 py-8 md:border-b-0 md:py-10 md:pr-10 md:not-first:border-l md:not-first:pl-10"
            >
              <span className="font-display text-sm text-green-700">0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-medium tracking-tight">{outcome.title}</h3>
              <p className="mt-3 leading-relaxed text-graphite-600">{outcome.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
