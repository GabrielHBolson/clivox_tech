import type { CommercialConfig } from '../types'

/**
 * Único local com valores, descontos e condições comerciais.
 *
 * `offer.active: false` mantém a promoção fora do site e exibe o painel
 * `proposal`. Ao ativar, revise título, valores e condições antes de publicar.
 * O percentual de desconto é calculado a partir dos dois preços.
 */
export const commercialConfig: CommercialConfig = {
  offer: {
    active: false,
    eyebrow: 'Condição comercial',
    title: 'Comece seu projeto com uma condição especial.',
    description: 'Fale com a Clivox para confirmar se o seu projeto se enquadra nesta condição.',
    originalPrice: 699.99,
    promotionalPrice: 349.99,
    terms: [
      { id: 'prazo', label: 'Prazo de entrega', value: 'Até 5 dias úteis', confirmed: true },
      { id: 'pagamento', label: 'Pagamento', value: 'Na entrega', confirmed: true },
      // PENDENTE: confirmar o significado da condição de 7 dias, preencher
      // `value` e só então marcar `confirmed: true`.
      { id: 'sete-dias', label: 'Condição de 7 dias', value: '', confirmed: false },
    ],
    validityNote: null,
    ctaLabel: 'Quero esta condição',
  },
  proposal: {
    eyebrow: 'Investimento',
    title: 'Você sabe o que está contratando antes de começar.',
    description:
      'Cada negócio tem uma necessidade diferente, por isso o investimento é definido depois de entendermos o seu projeto.',
    items: [
      {
        title: 'Escopo',
        description: 'O que será desenvolvido e o que fica fora do projeto.',
      },
      {
        title: 'Valor',
        description: 'O investimento calculado para a solução combinada.',
      },
      {
        title: 'Prazo',
        description: 'A previsão de entrega de acordo com a complexidade.',
      },
      {
        title: 'Condições',
        description: 'Forma de pagamento e regras para ajustes, registradas na proposta.',
      },
    ],
    ctaLabel: 'Solicitar proposta',
  },
}
