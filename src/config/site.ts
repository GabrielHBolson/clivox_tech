import type { SiteConfig } from '../types'

export const siteConfig: SiteConfig = {
  name: 'Clivox Tech',
  slogan: 'Tecnologia que dá voz ao seu negócio.',
  description:
    'A Clivox Tech cria sites, sistemas e automações sob medida para empresas e profissionais que querem crescer com tecnologia.',
  language: 'pt-BR',
  ogLocale: 'pt_BR',
  // PENDENTE: informar o domínio definitivo. Com ele, o build passa a gerar
  // canonical, og:url e sitemap.xml automaticamente.
  url: null,
  ogImagePath: '/og-image.png',
}
