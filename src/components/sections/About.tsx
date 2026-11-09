import { aboutContent as content } from '../../data/content'
import { QUOTE_PATH } from '../../data/navigation'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { LogoMark } from '../ui/Logo'
import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <section id="sobre" className="relative isolate overflow-hidden bg-graphite-900 py-24 text-white lg:py-40">
      <LogoMark className="absolute -right-[8%] -bottom-[14%] -z-10 w-[52%] min-w-[420px] text-white/[0.04]" />
      <Container>
        <Reveal>
          <p className="text-sm font-medium text-green-400">{content.eyebrow}</p>
          <h2 className="mt-4 max-w-5xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-7xl">
            {content.title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-12 max-w-2xl lg:mt-16 lg:ml-[41.66%]">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-graphite-300 first:mt-0 first:text-white">
              {paragraph}
            </p>
          ))}
          <ButtonLink to={QUOTE_PATH} variant="outlineOnDark" size="lg" className="mt-9 max-sm:w-full">
            {content.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
