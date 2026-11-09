import { differentialsContent as content } from '../../data/content'
import { differentials } from '../../data/differentials'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Differentials() {
  return (
    <section className="bg-graphite-950 py-24 text-white lg:py-36" aria-label={content.eyebrow}>
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} tone="dark" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {differentials.map((item, index) => (
            <li key={item.title} className="group relative bg-graphite-950 transition-colors duration-300 hover:bg-graphite-900">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-green-400 transition-transform duration-500 ease-brand group-hover:scale-x-100"
              />
              <Reveal delay={index * 60} className="h-full p-8 lg:p-10">
                <h3 className="text-2xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite-300">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
