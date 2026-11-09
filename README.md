# Site Clivox Tech

Site institucional e comercial da Clivox Tech, feito com React 19, TypeScript, Tailwind CSS 4 e Vite. O build gera HTML pré-renderizado para cada rota, com metadados próprios.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run typecheck  # verificação de tipos
npm run build      # build de produção em dist/
npm run preview    # serve o build localmente
```

## Onde alterar cada informação

| O que | Arquivo |
| --- | --- |
| Domínio, slogan e descrição | `src/config/site.ts` |
| E-mail, WhatsApp e Instagram | `src/config/contact.ts` |
| Preços, descontos e condições | `src/config/commercial.ts` |
| Títulos e descrições de cada página | `src/config/seo.ts` |
| Textos das seções | `src/data/content.ts` |
| Serviços, soluções, diferenciais, etapas, FAQ, política | `src/data/*.ts` |
| Cores e fontes | `src/styles/index.css` (`@theme`) |

## Antes de publicar

- [ ] Informar o domínio em `siteConfig.url`. Com ele, o build gera `canonical`, `og:url` e `sitemap.xml`.
- [ ] Informar e confirmar o e-mail comercial em `contactConfig.email`.
- [ ] Informar o WhatsApp comercial em `contactConfig.whatsapp.number`. O botão flutuante aparece automaticamente.
- [ ] Configurar `VITE_QUOTE_ENDPOINT` (veja abaixo).
- [ ] Decidir se a oferta será exibida e confirmar a condição de 7 dias.
- [ ] Solicitar revisão jurídica da política de privacidade em `src/data/privacy.ts`.

Campos de contato vazios não geram links nem botões.

## Oferta comercial

Em `src/config/commercial.ts`:

- `offer.active: false` mantém a promoção fora do site e exibe o painel "Investimento".
- `offer.active: true` exibe preços, desconto calculado e condições.
- Condições com `confirmed: false` nunca são exibidas. A condição de 7 dias está assim até ter significado definido.

## Integração do formulário

O formulário envia um `POST` em JSON para o endereço definido em `VITE_QUOTE_ENDPOINT`. Copie `.env.example` para `.env` ou defina a variável no ambiente de build.

```json
{
  "name": "Maria Silva",
  "company": "Empresa Exemplo",
  "email": "maria@exemplo.com.br",
  "whatsapp": "11912345678",
  "service": "sites",
  "serviceLabel": "Site",
  "description": "Descrição do projeto",
  "source": "site",
  "_gotcha": ""
}
```

- `company` pode ser `null`.
- `service` é `sites`, `sistemas`, `automacoes` ou `orientacao`.
- `_gotcha` é o filtro contra robôs: descarte a solicitação quando vier preenchido.
- O destino deve responder com status 2xx em caso de sucesso e permitir CORS para o domínio do site.
- O endereço pode ser uma API própria, uma função serverless, um webhook ou um serviço de formulários que aceite JSON. Nunca coloque chaves secretas em variáveis `VITE_`, pois elas ficam públicas no navegador.

Sem o endereço configurado, nada é transmitido. O formulário avisa o visitante e oferece os canais de contato disponíveis. A lógica de envio está em `src/services/quoteRequest.ts`.

## Hospedagem

Publique a pasta `dist/` em qualquer hospedagem estática. Cada rota possui seu próprio `index.html`, e `dist/404.html` deve ser configurado como página de erro.
