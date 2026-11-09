import { QuoteForm } from '../components/forms/QuoteForm'
import { Container } from '../components/ui/Container'
import { PageHero } from '../components/ui/PageHero'
import { quotePageContent as content } from '../data/content'

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow={content.eyebrow} title={content.title}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphite-300">{content.description}</p>
      </PageHero>
      <section aria-label="Formulário de orçamento" className="scroll-mt-24 bg-graphite-50 py-14 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="relative rounded-2xl border border-graphite-200 bg-white p-6 sm:p-10 lg:col-span-8">
            <QuoteForm />
          </div>
          <aside className="lg:sticky lg:top-28 lg:order-first lg:col-span-4 lg:self-start">
            <h2 className="font-sans text-sm font-medium text-green-700">{content.nextStepsTitle}</h2>
            <ol className="mt-6">
              {content.nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4 border-t border-graphite-200 py-5">
                  <span className="font-display text-sm leading-6 text-green-700">{index + 1}</span>
                  <div>
                    <h3 className="font-sans font-medium">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-graphite-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </Container>
      </section>
    </>
  )
}
