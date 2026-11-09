import type { QuoteServiceOption, Service } from '../types'

export const services: Service[] = [
  {
    id: 'sites',
    shortTitle: 'Sites',
    title: 'Desenvolvimento de sites',
    description:
      'Sites que apresentam sua empresa com clareza, funcionam bem em qualquer tela e conduzem o visitante até o contato.',
    features: [
      'Sites institucionais',
      'Landing pages',
      'Sites comerciais',
      'Páginas de produtos e serviços',
      'Layout responsivo',
      'Otimização para buscadores',
    ],
    ctaLabel: 'Solicitar orçamento de site',
  },
  {
    id: 'sistemas',
    shortTitle: 'Sistemas',
    title: 'Desenvolvimento de sistemas',
    description:
      'Sistemas feitos em torno da forma como sua empresa trabalha, para organizar informações e dar mais controle à operação.',
    features: [
      'Sistemas personalizados',
      'Painéis administrativos',
      'Gestão de informações',
      'Sistemas internos',
      'Soluções para necessidades específicas',
      'Integração com serviços externos',
    ],
    ctaLabel: 'Solicitar orçamento de sistema',
  },
  {
    id: 'automacoes',
    shortTitle: 'Automações',
    title: 'Automações',
    description:
      'Fluxos que assumem o trabalho repetitivo e conectam suas ferramentas, liberando sua equipe para o que exige atenção humana.',
    features: [
      'Automatização de tarefas repetitivas',
      'Integração entre ferramentas',
      'Otimização de processos',
      'Redução de trabalho manual',
      'Fluxos automatizados para empresas',
    ],
    ctaLabel: 'Solicitar orçamento de automação',
  },
]

export const quoteServiceOptions: { value: QuoteServiceOption; label: string; hint: string }[] = [
  { value: 'sites', label: 'Site', hint: 'Institucional, comercial ou landing page' },
  { value: 'sistemas', label: 'Sistema', hint: 'Painéis e sistemas sob medida' },
  { value: 'automacoes', label: 'Automação', hint: 'Fluxos e integração entre ferramentas' },
  { value: 'orientacao', label: 'Ainda não sei', hint: 'Quero ajuda para definir a solução' },
]

export function isQuoteServiceOption(value: string | null): value is QuoteServiceOption {
  return quoteServiceOptions.some((option) => option.value === value)
}
