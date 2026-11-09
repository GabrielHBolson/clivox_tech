import { QUOTE_PATH } from '../../data/navigation'
import { heroContent as content } from '../../data/content'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { SignalBars } from '../ui/SignalBars'

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-graphite-950 text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="absolute right-[-15%] bottom-[-35%] -z-20 size-[60vw] rounded-full bg-green-500/15 blur-[120px]"
      />

      <Container className="flex min-h-[100svh] flex-col justify-center pt-32 pb-48 sm:pb-56 lg:pb-52">
        <p className="animate-fade-up text-[15px] font-medium text-green-400">{content.eyebrow}</p>
        <h1 className="mt-6 max-w-[15ch] text-[2.75rem] leading-[1.02] font-medium tracking-[-0.025em] sm:text-[clamp(3.5rem,min(8vw,10.5vh),5.75rem)]">
          {content.titleLead} <span className="text-green-400">{content.titleAccent}</span>
        </h1>
        <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-graphite-300 [animation-delay:120ms] sm:text-xl">
          {content.subtitle}
        </p>
        <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:200ms] sm:flex-row">
          <ButtonLink to="/#solucoes" size="lg">
            {content.primaryCta}
          </ButtonLink>
          <ButtonLink to={QUOTE_PATH} size="lg" variant="outlineOnDark">
            {content.secondaryCta}
          </ButtonLink>
        </div>
      </Container>

      <SignalBars
        className="absolute inset-x-0 bottom-0 -z-10 h-40 px-1 sm:h-56 lg:h-[62%]"
        barClassName="bg-gradient-to-t from-green-500/30 to-green-400"
      />
    </section>
  )
}
