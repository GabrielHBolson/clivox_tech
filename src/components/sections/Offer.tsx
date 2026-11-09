import { commercialConfig } from '../../config/commercial'
import { QUOTE_PATH } from '../../data/navigation'
import type { Offer as OfferData, ProposalPanel } from '../../types'
import { discountPercent, formatCurrency } from '../../utils/format'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function ActiveOffer({ offer }: { offer: OfferData }) {
  const terms = offer.terms.filter((term) => term.confirmed)
  const discount = discountPercent(offer.originalPrice, offer.promotionalPrice)

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <SectionHeading eyebrow={offer.eyebrow} title={offer.title} description={offer.description} />
      </div>
      <Reveal delay={100} className="lg:col-span-6">
        <div className="relative overflow-hidden rounded-2xl bg-graphite-950 p-7 text-white sm:p-10">
          <div aria-hidden="true" className="absolute -top-28 -right-28 size-72 rounded-full bg-green-500/20 blur-3xl" />
          <div className="relative">
            <p className="flex items-center gap-3 text-graphite-400">
              <span>
                De <s>{formatCurrency(offer.originalPrice)}</s>
              </span>
              <span className="rounded bg-green-400 px-2 py-0.5 text-sm font-medium text-graphite-950">-{discount}%</span>
            </p>
            <p className="mt-2 font-display text-6xl font-medium tracking-tight sm:text-7xl">
              {formatCurrency(offer.promotionalPrice)}
            </p>
            {terms.length > 0 && (
              <dl className="mt-8">
                {terms.map((term) => (
                  <div key={term.id} className="flex justify-between gap-6 border-t border-white/10 py-3.5">
                    <dt className="text-graphite-300">{term.label}</dt>
                    <dd className="text-right font-medium">{term.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {offer.validityNote && <p className="mt-4 text-sm text-graphite-400">{offer.validityNote}</p>}
            <ButtonLink to={QUOTE_PATH} size="lg" className="mt-8 w-full">
              {offer.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function Proposal({ proposal }: { proposal: ProposalPanel }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <SectionHeading eyebrow={proposal.eyebrow} title={proposal.title} description={proposal.description} />
        <Reveal delay={80} className="mt-9">
          <ButtonLink to={QUOTE_PATH} size="lg" variant="dark" className="max-sm:w-full">
            {proposal.ctaLabel}
          </ButtonLink>
        </Reveal>
      </div>
      <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
        <dl className="rounded-2xl border border-graphite-200 bg-white px-7 py-3 sm:px-9">
          {proposal.items.map((item) => (
            <div key={item.title} className="border-b border-graphite-100 py-6 last:border-b-0">
              <dt className="font-display text-xl font-medium tracking-tight">{item.title}</dt>
              <dd className="mt-1 leading-relaxed text-graphite-600">{item.description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  )
}

export function Offer() {
  const { offer, proposal } = commercialConfig
  return (
    <section id="investimento" className="bg-graphite-50 py-24 lg:py-36">
      <Container>{offer.active ? <ActiveOffer offer={offer} /> : <Proposal proposal={proposal} />}</Container>
    </section>
  )
}
