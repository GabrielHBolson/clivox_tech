import type { PolicySection } from '../types'

export const privacyUpdatedAt = '9 de novembro de 2026'

export const privacySections: PolicySection[] = [
  {
    title: 'Sobre esta política',
    paragraphs: [
      'Esta política explica como a Clivox Tech trata os dados pessoais enviados por meio deste site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).',
    ],
  },
  {
    title: 'Dados que coletamos',
    paragraphs: ['Ao preencher o formulário de solicitação de orçamento, você nos informa:'],
    items: [
      'nome;',
      'empresa, quando informada;',
      'endereço de e-mail;',
      'número de WhatsApp;',
      'serviço de interesse;',
      'descrição do projeto.',
    ],
  },
  {
    title: 'Como usamos os dados',
    paragraphs: [
      'Utilizamos essas informações para responder à sua solicitação, entender a sua necessidade, elaborar uma proposta e manter contato sobre o projeto. Não vendemos os seus dados pessoais.',
    ],
  },
  {
    title: 'Compartilhamento',
    paragraphs: [
      'Os dados podem ser processados por fornecedores de tecnologia necessários ao funcionamento do site e ao recebimento das solicitações, como serviços de hospedagem e de formulários, apenas para essas finalidades.',
      'Quando você escolhe falar conosco pelo WhatsApp, Instagram ou e-mail, o uso desses serviços também está sujeito às políticas de cada plataforma.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Este site não utiliza cookies de publicidade ou de análise de navegação. Caso isso mude, esta política será atualizada antes da mudança.',
    ],
  },
  {
    title: 'Armazenamento',
    paragraphs: [
      'Mantemos os dados pelo tempo necessário para atender à finalidade da solicitação ou para cumprir obrigações legais.',
    ],
  },
  {
    title: 'Seus direitos',
    paragraphs: [
      'Você pode solicitar a confirmação do tratamento, o acesso, a correção ou a eliminação dos seus dados, além de exercer os demais direitos previstos na LGPD.',
    ],
  },
]
