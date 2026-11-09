export type ServiceId = 'sites' | 'sistemas' | 'automacoes'
export type QuoteServiceOption = ServiceId | 'orientacao'

export interface NavItem {
  label: string
  href: string
  sectionId: string
}

export interface TitledText {
  title: string
  description: string
}

export interface Service extends TitledText {
  id: ServiceId
  shortTitle: string
  features: string[]
  ctaLabel: string
}

export interface Solution {
  id: string
  challenge: string
  diagnosis: string
  approach: string[]
  serviceId: ServiceId
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PageMeta {
  title: string
  description: string
  noindex?: boolean
}

export interface SiteConfig {
  name: string
  slogan: string
  description: string
  language: string
  ogLocale: string
  /** Domínio final, sem barra no fim. Ex.: https://www.exemplo.com.br */
  url: string | null
  ogImagePath: string
}

export interface ContactConfig {
  /** E-mail comercial. Enquanto for null, nenhum link de e-mail é exibido. */
  email: string | null
  whatsapp: {
    /** Somente dígitos, com DDI e DDD. Enquanto for null, o botão não é exibido. */
    number: string | null
    defaultMessage: string
  }
  instagram: {
    handle: string
    url: string
  }
}

export interface OfferTerm {
  id: string
  label: string
  value: string
  /** Condições não confirmadas nunca são exibidas no site. */
  confirmed: boolean
}

export interface Offer {
  active: boolean
  eyebrow: string
  title: string
  description: string
  originalPrice: number
  promotionalPrice: number
  terms: OfferTerm[]
  validityNote: string | null
  ctaLabel: string
}

export interface ProposalPanel {
  eyebrow: string
  title: string
  description: string
  items: TitledText[]
  ctaLabel: string
}

export interface CommercialConfig {
  offer: Offer
  proposal: ProposalPanel
}

export interface QuoteFormValues {
  name: string
  company: string
  email: string
  whatsapp: string
  service: QuoteServiceOption | ''
  description: string
  /** Campo invisível para humanos, usado como filtro contra robôs. */
  website: string
}

export type QuoteFieldName = Exclude<keyof QuoteFormValues, 'website'>
export type QuoteFormErrors = Partial<Record<QuoteFieldName, string>>

export type SubmitResult =
  | { status: 'success' }
  | { status: 'not_configured' }
  | { status: 'error'; reason: 'timeout' | 'network' | 'server' }

export type FormStatus = 'idle' | 'submitting' | 'success' | 'not_configured' | 'error'

export interface PolicySection {
  title: string
  paragraphs: string[]
  items?: string[]
}
