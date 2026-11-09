import type { PageMeta } from '../types'
import { contactConfig } from './contact'
import { siteConfig } from './site'

export const pageMetaByPath: Record<string, PageMeta> = {
  '/': {
    title: 'Clivox Tech | Sites, sistemas e automações para empresas',
    description: siteConfig.description,
  },
  '/orcamento': {
    title: 'Solicitar orçamento | Clivox Tech',
    description:
      'Conte o que o seu negócio precisa e solicite um orçamento para o desenvolvimento de site, sistema ou automação.',
  },
  '/politica-de-privacidade': {
    title: 'Política de privacidade | Clivox Tech',
    description: 'Saiba como a Clivox Tech trata os dados pessoais enviados por meio deste site.',
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Página não encontrada | Clivox Tech',
  description: 'A página que você procurou não existe ou mudou de endereço.',
  noindex: true,
}

export function getPageMeta(pathname: string): PageMeta {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pageMetaByPath[normalized] ?? notFoundMeta
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const { name, slogan, description, url } = siteConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    slogan,
    description,
    sameAs: [contactConfig.instagram.url],
    ...(url ? { url, logo: `${url}/apple-touch-icon.png` } : {}),
    ...(contactConfig.email ? { email: contactConfig.email } : {}),
  }
}
