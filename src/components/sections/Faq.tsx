import { faqContent as content } from '../../data/content'
import { faqItems } from '../../data/faq'
import { QUOTE_PATH } from '../../data/navigation'
import { Accordion } from '../ui/Accordion'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  return (
    <section id="perguntas-frequentes" className="bg-white py-24 lg:py-36">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <Reveal delay={80} className="mt-8">
            <ButtonLink to={QUOTE_PATH} variant="outlineOnLight">
              {content.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  )
}
