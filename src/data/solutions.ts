import type { Solution } from '../types'

export const solutions: Solution[] = [
  {
    id: 'presenca',
    challenge: 'Meu negócio é difícil de encontrar na internet',
    diagnosis:
      'Quem procura pelo que você oferece precisa encontrar uma presença própria, clara e confiável, que não dependa apenas das redes sociais.',
    approach: [
      'Um site com a identidade da sua empresa',
      'Estrutura e conteúdo preparados para buscadores',
      'Canais de contato sempre à vista',
    ],
    serviceId: 'sites',
  },
  {
    id: 'conversao',
    challenge: 'Recebo visitas, mas poucos pedidos de contato',
    diagnosis:
      'Quando a mensagem não é direta, o visitante vai embora sem entender por que deveria falar com você. A página precisa responder às dúvidas dele na ordem certa.',
    approach: [
      'Landing page focada em uma única oferta',
      'Argumentos organizados pela decisão do cliente',
      'Formulário simples e chamadas para ação claras',
    ],
    serviceId: 'sites',
  },
  {
    id: 'planilhas',
    challenge: 'As informações da empresa estão espalhadas',
    diagnosis:
      'Planilhas soltas e controles paralelos dificultam saber o que está acontecendo. Um sistema reúne os dados em um só lugar, com o acesso certo para cada pessoa.',
    approach: [
      'Levantamento de como sua operação funciona hoje',
      'Painel centralizado com as informações que importam',
      'Permissões de acordo com cada função',
    ],
    serviceId: 'sistemas',
  },
  {
    id: 'repeticao',
    challenge: 'Minha equipe perde tempo com tarefas repetitivas',
    diagnosis:
      'Copiar dados, enviar os mesmos avisos e gerar os mesmos documentos consome horas e abre espaço para erros. Boa parte desse trabalho pode acontecer sozinha.',
    approach: [
      'Mapeamento das tarefas que mais se repetem',
      'Fluxos automáticos com regras definidas por você',
      'Pontos de revisão onde a decisão precisa ser humana',
    ],
    serviceId: 'automacoes',
  },
  {
    id: 'integracao',
    challenge: 'Minhas ferramentas não conversam entre si',
    diagnosis:
      'Quando cada ferramenta guarda uma parte da informação, alguém precisa fazer a ponte manualmente. Integrá-las elimina essa etapa e mantém os dados alinhados.',
    approach: [
      'Análise das ferramentas que você já utiliza',
      'Integração entre os serviços, quando disponível',
      'Dados atualizados sem retrabalho manual',
    ],
    serviceId: 'automacoes',
  },
]
